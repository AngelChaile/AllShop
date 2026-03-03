// netlify/functions/mercado-pago.js - VERSIÓN CORREGIDA (v2+)
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
    // ✅ NUEVA FORMA DE CONFIGURAR (v2+)
    mercadopago.configurations = {
      access_token: process.env.MP_ACCESS_TOKEN
    };

    const { items, customer, returnUrls } = JSON.parse(event.body);
    
    // Crear preferencia
    const preference = {
      items: items.map(item => ({
        title: item.nombre.substring(0, 255),
        unit_price: Number(item.precioOferta),
        quantity: Number(item.quantity),
        currency_id: 'ARS',
        picture_url: item.img && item.img[0] ? item.img[0] : undefined
      })),
      payer: {
        email: customer?.email || 'test@test.com',
        name: customer?.name || 'Comprador',
        surname: '',
        phone: {
          number: customer?.phone || ''
        },
        address: {
          street_name: customer?.address || ''
        }
      },
      back_urls: {
        success: returnUrls?.success || `${process.env.URL}/pago-exitoso.html`,
        failure: returnUrls?.failure || `${process.env.URL}/pago-fallido.html`,
        pending: returnUrls?.pending || `${process.env.URL}/pago-pendiente.html`
      },
      auto_return: 'approved',
      external_reference: `ALLSHOP_${Date.now()}`,
      statement_descriptor: 'ALLSHOP'
    };

    // ✅ NUEVA FORMA DE CREAR PREFERENCIA (v2+)
    const response = await mercadopago.preferences.create(preference);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        id: response.body.id,
        init_point: response.body.init_point,
        sandbox_init_point: response.body.sandbox_init_point
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
        details: error.message,
        stack: error.stack
      })
    };
  }
};