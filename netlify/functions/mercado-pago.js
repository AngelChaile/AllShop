// netlify/functions/mercado-pago.js - VERSIÓN CORREGIDA Y MEJORADA
const mercadopago = require('mercadopago');

// Configurar MercadoPago al inicio
mercadopago.configurations = {
  access_token: process.env.MP_ACCESS_TOKEN
};

exports.handler = async (event, context) => {
  // Log para debugging
  console.log('Función mercado-pago iniciada');
  console.log('Access token configurado:', !!process.env.MP_ACCESS_TOKEN);
  
  // Headers para CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Verificar que mercadopago está correctamente importado
    if (!mercadopago || !mercadopago.preferences) {
      console.error('mercadopago no está correctamente inicializado:', mercadopago);
      throw new Error('Error de inicialización de MercadoPago');
    }

    const body = JSON.parse(event.body);
    const { items, customer, returnUrls } = body;
    
    console.log('Items recibidos:', items.length);
    console.log('Customer:', customer?.email);

    // Validar items
    if (!items || items.length === 0) {
      throw new Error('No hay items en el carrito');
    }

    // Crear preferencia
    const preference = {
      items: items.map(item => ({
        title: item.nombre ? item.nombre.substring(0, 255) : 'Producto',
        unit_price: Number(item.precioOferta) || 0,
        quantity: Number(item.quantity) || 1,
        currency_id: 'ARS',
        picture_url: item.img && item.img[0] ? item.img[0] : undefined
      })),
      payer: {
        email: customer?.email || 'test@test.com',
        name: customer?.name || 'Comprador',
        phone: {
          number: customer?.phone || ''
        },
        address: {
          street_name: customer?.address || ''
        }
      },
      back_urls: {
        success: returnUrls?.success || `${process.env.URL || 'https://allshop1.netlify.app'}/pago-exitoso.html`,
        failure: returnUrls?.failure || `${process.env.URL || 'https://allshop1.netlify.app'}/pago-fallido.html`,
        pending: returnUrls?.pending || `${process.env.URL || 'https://allshop1.netlify.app'}/pago-pendiente.html`
      },
      auto_return: 'approved',
      external_reference: `ALLSHOP_${Date.now()}`,
      statement_descriptor: 'ALLSHOP'
    };

    console.log('Preferencia creada, enviando a MercadoPago...');
    
    // Crear preferencia en MercadoPago
    const response = await mercadopago.preferences.create(preference);
    
    console.log('Respuesta de MercadoPago recibida');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        id: response.body.id,
        init_point: response.body.init_point,
        sandbox_init_point: response.body.sandbox_init_point
      })
    };
    
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error procesando el pago',
        details: error.message,
        type: error.name
      })
    };
  }
};