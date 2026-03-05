// functions/webhook.js - VERSIÓN CORREGIDA (CommonJS)
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Inicializa Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función de log condicional (sin import)
function log(...args) {
  // En producción, los logs de Netlify siempre se ven, así que podemos dejarlos
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

    log('xSignature:', xSignature);
    log('xRequestId:', xRequestId);
    log('data.id:', dataId);
    log('type:', type);

    if (type !== 'payment') {
      log('Notificación ignorada (no es payment)');
      return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
    }

    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!secret) {
      errorLog('MP_WEBHOOD_SECRET no está configurada');
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
    log('Body recibido:', JSON.stringify(body, null, 2));

    const paymentId = body.data?.id;
    const action = body.action;

    if (!paymentId) {
      errorLog('No se recibió paymentId');
      return { statusCode: 400, headers, body: 'Bad Request' };
    }

    // Obtener detalles del pago
    const mercadopago = require('mercadopago');
    mercadopago.configurations = {
      access_token: process.env.MP_ACCESS_TOKEN
    };

    if (action === 'payment.updated' || action === 'payment.created') {
      const paymentResponse = await mercadopago.payment.get(paymentId);
      const payment = paymentResponse.body;
      
      log('Estado del pago:', payment.status);

      if (payment.status === 'approved') {
        const externalReference = payment.external_reference;
        log('Procesando pago aprobado:', externalReference);
        
        const items = payment.additional_info?.items || [];
        
        for (const item of items) {
          // Buscar producto (idealmente deberías guardar el ID en un campo personalizado)
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