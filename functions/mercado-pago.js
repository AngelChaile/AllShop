// functions/mercado-pago.js - VERSIÓN DE EMERGENCIA
const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  try {
    // Configurar aquí mismo
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    });

    const body = JSON.parse(event.body);
    
    const response = await mercadopago.preferences.create({
      items: body.items.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precioOferta),
        quantity: Number(item.quantity),
        currency_id: 'ARS'
      })),
      back_urls: {
        success: `${process.env.URL}/pago-exitoso.html`,
        failure: `${process.env.URL}/pago-fallido.html`,
        pending: `${process.env.URL}/pago-pendiente.html`
      },
      auto_return: 'approved'
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ init_point: response.body.init_point })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};