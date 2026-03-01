// netlify/functions/mercado-pago.js
const mercadopago = require('mercadopago');

exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Configurar con variable de entorno
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    });

    const { items, customer } = JSON.parse(event.body);
    
    const preference = {
      items: items.map(item => ({
        title: item.nombre.substring(0, 255),
        unit_price: parseFloat(item.precioOferta),
        quantity: parseInt(item.quantity),
        currency_id: 'ARS'
      })),
      payer: customer ? {
        email: customer.email,
        name: customer.name
      } : undefined,
      back_urls: {
        success: `${process.env.URL || 'https://allshop.netlify.app'}/pago-exitoso.html`,
        failure: `${process.env.URL || 'https://allshop.netlify.app'}/pago-fallido.html`,
        pending: `${process.env.URL || 'https://allshop.netlify.app'}/pago-pendiente.html`
      },
      auto_return: 'approved',
      external_reference: `ALLSHOP_${Date.now()}`,
      statement_descriptor: 'ALLSHOP'
    };

    const response = await mercadopago.preferences.create(preference);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        id: response.body.id,
        init_point: response.body.init_point
      })
    };
    
  } catch (error) {
    console.error('Error MercadoPago:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Error procesando el pago',
        details: error.message 
      })
    };
  }
};