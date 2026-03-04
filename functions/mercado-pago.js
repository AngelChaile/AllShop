// functions/mercado-pago.js - VERSIÓN FINAL BASADA EN DOCUMENTACIÓN OFICIAL
const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  console.log('🔵 Función iniciada');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // --- 1. CONFIGURACIÓN: La forma más estándar para el SDK v2 [citation:1][citation:8] ---
    // En lugar de 'configurations' o 'configure', algunos ejemplos usan
    // 'setAccessToken' o asignación directa a 'config'. Probaremos la asignación directa
    // al objeto 'config' que es lo que la función 'create' espera internamente.
    mercadopago.config = {
      access_token: process.env.MP_ACCESS_TOKEN
    };
    
    console.log('Token configurado:', process.env.MP_ACCESS_TOKEN ? '✅ SÍ' : '❌ NO');

    // --- 2. VERIFICACIÓN CRÍTICA: Inspeccionar el objeto 'mercadopago' ---
    console.log('🔍 Inspeccionando objeto mercadopago:');
    console.log('- keys:', Object.keys(mercadopago));
    console.log('- ¿Tiene preferences?', !!mercadopago.preferences);
    console.log('- ¿Tiene config?', !!mercadopago.config);

    // Si 'preferences' sigue siendo undefined, lanzamos un error claro.
    if (!mercadopago.preferences) {
      throw new Error('FALLO CRÍTICO: mercadopago.preferences es undefined. La importación del SDK falló.');
    }

    // --- 3. PROCESAR LA SOLICITUD ---
    const { items, customer } = JSON.parse(event.body);
    console.log('Items recibidos:', items.length);

    const preference = {
      items: items.map(item => ({
        title: item.nombre.substring(0, 255),
        unit_price: Number(item.precioOferta),
        quantity: Number(item.quantity),
        currency_id: 'ARS'
      })),
      payer: {
        email: customer.email || 'test@test.com',
        name: customer.name || 'Comprador'
      },
      back_urls: {
        success: 'https://allshop1.netlify.app/pago-exitoso.html',
        failure: 'https://allshop1.netlify.app/pago-fallido.html',
        pending: 'https://allshop1.netlify.app/pago-pendiente.html'
      },
      auto_return: 'approved'
    };

    console.log('Enviando preferencia a MercadoPago...');
    const response = await mercadopago.preferences.create(preference);
    console.log('✅ Respuesta OK de MercadoPago');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        init_point: response.body.init_point
      })
    };

  } catch (error) {
    console.error('🔴 ERROR DETALLADO:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack
      })
    };
  }
};