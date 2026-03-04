// functions/mercado-pago.js - VERSIÓN SIMPLIFICADA
const mercadopago = require('mercadopago');

// Configurar al inicio
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    const { items, customer, returnUrls } = JSON.parse(event.body);

    const preference = {
      items: items.map(item => ({
        title: item.nombre.substring(0, 255),
        unit_price: Number(item.precioOferta),
        quantity: Number(item.quantity),
        currency_id: 'ARS'
      })),
      payer: {
        email: customer.email,
        name: customer.name
      },
      back_urls: {
        success: returnUrls.success,
        failure: returnUrls.failure,
        pending: returnUrls.pending
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: response.body.id,
        init_point: response.body.init_point
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};