// functions/webhook.js
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function log(...args) {
  console.log(...args);
}

function errorLog(...args) {
  console.error(...args);
}

exports.handler = async (event) => {
  log('🔵 Webhook recibido');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const xSignature = event.headers['x-signature'];
    const xRequestId = event.headers['x-request-id'];
    
    const queryParams = event.queryStringParameters || {};
    const dataId = queryParams['data.id'];
    const type = queryParams['type'];

    if (type !== 'payment') {
      log('Notificación ignorada (no es payment)');
      return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
    }

    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!secret) {
      errorLog('MP_WEBHOOK_SECRET no está configurada');
      throw new Error('Webhook secret missing');
    }

    const parts = xSignature.split(',');
    let ts = null;
    let hash = null;
    
    parts.forEach(part => {
      const [key, value] = part.split('=');
      if (key.trim() === 'ts') ts = value.trim();
      if (key.trim() === 'v1') hash = value.trim();
    });

    if (!ts || !hash) {
      errorLog('Firma inválida: falta ts o v1');
      return { statusCode: 401, headers, body: 'Unauthorized' };
    }

    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    
    const computedHash = crypto
      .createHmac('sha256', secret)
      .update(manifest)
      .digest('hex');

    if (computedHash !== hash) {
      errorLog('Firma inválida: los hashes no coinciden');
      return { statusCode: 401, headers, body: 'Unauthorized' };
    }

    log('✅ Firma validada correctamente');

    const body = JSON.parse(event.body);
    const paymentId = body.data?.id;
    const action = body.action;

    if (!paymentId) {
      errorLog('No se recibió paymentId');
      return { statusCode: 400, headers, body: 'Bad Request' };
    }

    const mercadopago = require('mercadopago');
    mercadopago.configurations = {
      access_token: process.env.MP_ACCESS_TOKEN
    };

    if (action === 'payment.updated' || action === 'payment.created') {
      const paymentResponse = await mercadopago.payment.get(paymentId);
      const payment = paymentResponse.body;
      
      log('Estado del pago:', payment.status);

      if (payment.status === 'approved') {
        // 1. Guardar pedido en la base de datos
        const { error: pedidoError } = await supabase
          .from('pedidos')
          .insert([{
            cliente_email: payment.payer.email,
            total: payment.transaction_amount,
            estado: 'pagado',
            mp_payment_id: payment.id.toString(),
            datos_entrega: {
              items: payment.additional_info?.items,
              payer: payment.payer,
              external_reference: payment.external_reference,
              fecha_pago: new Date().toISOString()
            }
          }]);

        if (pedidoError) {
          errorLog('Error guardando pedido:', pedidoError);
        } else {
          log('✅ Pedido guardado correctamente');
        }

        // 2. Actualizar stock de productos
        const items = payment.additional_info?.items || [];
        
        for (const item of items) {
          // Buscar producto por título
          const { data: productos, error: selectError } = await supabase
            .from('productos')
            .select('id, stock')
            .eq('nombre', item.title)
            .single();

          if (selectError || !productos) {
            errorLog('Producto no encontrado:', item.title);
            continue;
          }

          const nuevoStock = Math.max(0, productos.stock - item.quantity);
          const { error: updateError } = await supabase
            .from('productos')
            .update({ stock: nuevoStock })
            .eq('id', productos.id);

          if (updateError) {
            errorLog('Error actualizando stock:', updateError);
          } else {
            log(`Stock actualizado para ${item.title}: ${nuevoStock}`);
          }
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true,
        message: 'Webhook procesado correctamente'
      })
    };

  } catch (error) {
    errorLog('🔴 Error procesando webhook:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};