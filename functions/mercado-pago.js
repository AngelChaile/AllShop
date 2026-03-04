// functions/mercado-pago.js - VERSIÓN CORRECTA PARA SDK v2.x
const mercadopago = require('mercadopago');
import { log, error } from './config.js';

exports.handler = async (event) => {
  log('🔵 Función iniciada');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // 1. Configurar el SDK (NUNCA USAR configure() en v2+)
    const client = new mercadopago.MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN
    });
    
    log('Token configurado:', process.env.MP_ACCESS_TOKEN ? '✅ SÍ' : '❌ NO');

    // 2. Crear el cliente de Preference usando el client configurado
    const preferenceClient = new mercadopago.Preference(client);

    const { items, customer } = JSON.parse(event.body);
    log('Items recibidos:', items.length);

    // 3. Crear la preferencia usando el cliente
    const preferenceRequest = {
      body: {
        items: items.map(item => ({
          title: item.nombre.substring(0, 255),
          quantity: Number(item.quantity),
          unit_price: Number(item.precioOferta),
          currency_id: 'ARS',
          picture_url: item.img && item.img[0] ? item.img[0] : undefined
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

    log('Enviando preferencia a MercadoPago...');
    const response = await preferenceClient.create(preferenceRequest);
    
    log('✅ Respuesta OK de MercadoPago');
    log('Init point:', response.init_point);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        init_point: response.init_point,
        id: response.id
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