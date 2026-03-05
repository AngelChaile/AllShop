// functions/mercado-pago.js
const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  console.log('🔵 Función iniciada');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const client = new mercadopago.MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN
    });
    
    console.log('Token configurado:', !!process.env.MP_ACCESS_TOKEN);

    const preferenceClient = new mercadopago.Preference(client);

    const { items, customer } = JSON.parse(event.body);
    console.log('Items recibidos:', items.length);

    const preferenceRequest = {
      body: {
        items: items.map(item => ({
          title: item.nombre.substring(0, 255),
          quantity: Number(item.quantity),
          unit_price: Number(item.precioOferta),
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
      }
    };

    console.log('Enviando preferencia...');
    const response = await preferenceClient.create(preferenceRequest);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        init_point: response.init_point
      })
    };

  } catch (error) {
    console.error('🔴 ERROR:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};