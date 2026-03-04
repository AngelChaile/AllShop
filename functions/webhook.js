// functions/webhook.js
import { log, error } from './config.js';

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Inicializa Supabase (asegúrate de tener estas variables en Netlify)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  log('🔵 Webhook recibido');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // 1. Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    // 2. Obtener headers importantes
    const xSignature = event.headers['x-signature'];
    const xRequestId = event.headers['x-request-id'];
    
    // 3. Obtener query params (Mercado Pago los envía así)
    const queryParams = event.queryStringParameters || {};
    const dataId = queryParams['data.id'];
    const type = queryParams['type'];

    log('xSignature:', xSignature);
    log('xRequestId:', xRequestId);
    log('data.id:', dataId);
    log('type:', type);

    // 4. Validar que sea una notificación de pago
    if (type !== 'payment') {
      log('Notificación ignorada (no es payment)');
      return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
    }

    // 5. Validar autenticidad de la firma (¡MUY IMPORTANTE!)
    const secret = process.env.MP_WEBHOOK_SECRET; // La clave que copiaste del panel
    if (!secret) {
      console.error('MP_WEBHOOD_SECRET no está configurada');
      throw new Error('Webhook secret missing');
    }

    // Extraer ts y hash del header x-signature
    const parts = xSignature.split(',');
    let ts = null;
    let hash = null;
    
    parts.forEach(part => {
      const [key, value] = part.split('=');
      if (key.trim() === 'ts') ts = value.trim();
      if (key.trim() === 'v1') hash = value.trim();
    });

    if (!ts || !hash) {
      console.error('Firma inválida: falta ts o v1');
      return { statusCode: 401, headers, body: 'Unauthorized' };
    }

    // Crear el string para validar
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    
    // Calcular HMAC-SHA256
    const computedHash = crypto
      .createHmac('sha256', secret)
      .update(manifest)
      .digest('hex');

    // Comparar
    if (computedHash !== hash) {
      console.error('Firma inválida: los hashes no coinciden');
      return { statusCode: 401, headers, body: 'Unauthorized' };
    }

    log('✅ Firma validada correctamente');

    // 6. Procesar el body de la notificación
    const body = JSON.parse(event.body);
    log('Body recibido:', JSON.stringify(body, null, 2));

    const paymentId = body.data?.id;
    const action = body.action;

    if (!paymentId) {
      console.error('No se recibió paymentId');
      return { statusCode: 400, headers, body: 'Bad Request' };
    }

    // 7. Obtener detalles del pago desde la API de Mercado Pago
    // Necesitas hacer una llamada a la API de MP para obtener los items pagados
    const mercadopago = require('mercadopago');
    mercadopago.config = {
      access_token: process.env.MP_ACCESS_TOKEN
    };

    // Si el pago fue aprobado
    if (action === 'payment.updated' || action === 'payment.created') {
      // Obtener el pago completo
      const paymentResponse = await mercadopago.payment.get(paymentId);
      const payment = paymentResponse.body;
      
      log('Estado del pago:', payment.status);

      // Si está aprobado, actualizar stock
      if (payment.status === 'approved') {
        // La referencia externa la guardaste al crear la preferencia
        const externalReference = payment.external_reference;
        log('Procesando pago aprobado:', externalReference);

        // Aquí necesitas saber qué productos se compraron.
        // Una opción es guardar el carrito en una tabla "pedidos" cuando se crea la preferencia,
        // y luego aquí marcar el pedido como pagado.
        // Por simplicidad, este ejemplo asume que puedes obtener los items del pago.
        
        const items = payment.additional_info?.items || [];
        
        for (const item of items) {
          // Buscar el producto por título (o mejor, guardar el ID en un campo personalizado)
          const { data: productos, error: selectError } = await supabase
            .from('productos')
            .select('id, stock')
            .eq('nombre', item.title)
            .single();

          if (selectError || !productos) {
            console.error('Producto no encontrado:', item.title);
            continue;
          }

          // Actualizar stock
          const nuevoStock = Math.max(0, productos.stock - item.quantity);
          const { error: updateError } = await supabase
            .from('productos')
            .update({ stock: nuevoStock })
            .eq('id', productos.id);

          if (updateError) {
            console.error('Error actualizando stock:', updateError);
          } else {
            log(`Stock actualizado para ${item.title}: ${nuevoStock}`);
          }
        }

        // También se podría liberar las reservas de stockManager aquí
        // Pero es más avanzado.
      }
    }

    // 8. Responder a Mercado Pago (siempre 200 OK)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true,
        message: 'Webhook procesado correctamente'
      })
    };

  } catch (error) {
    console.error('🔴 Error procesando webhook:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};