// functions/mercado-pago.js - VERSIÓN CORRECTA PARA SDK v2+
const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  console.log('🔵 Función iniciada');
  console.log('Token configurado:', process.env.MP_ACCESS_TOKEN ? '✅ SÍ' : '❌ NO');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // ✅ FORMA CORRECTA para SDK v2+
    mercadopago.configurations = {
      access_token: process.env.MP_ACCESS_TOKEN
    };

    const { items, customer } = JSON.parse(event.body);
    
    console.log('Items recibidos:', items.length);

    const preference = {
      items: items.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precioOferta),
        quantity: Number(item.quantity),
        currency_id: 'ARS'
      })),
      payer: {
        email: customer.email,
        name: customer.name
      },
      back_urls: {
        success: 'https://allshop1.netlify.app/pago-exitoso.html',
        failure: 'https://allshop1.netlify.app/pago-fallido.html',
        pending: 'https://allshop1.netlify.app/pago-pendiente.html'
      },
      auto_return: 'approved'
    };

    console.log('Enviando a MercadoPago...');
    const response = await mercadopago.preferences.create(preference);
    console.log('✅ Respuesta OK');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ init_point: response.body.init_point })
    };

  } catch (error) {
    console.error('🔴 ERROR:', error.message);
    console.error('Stack:', error.stack);
    
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