// functions/admin-login.js
const crypto = require('crypto');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight OPTIONS
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
    const { username, password } = JSON.parse(event.body);

    // Leer variables de entorno
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN || 'allshop_default_secret';

    if (!ADMIN_PASS) {
      console.error('ADMIN_PASS no configurado en Netlify');
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: 'Error de configuración del servidor' }) 
      };
    }

    // Validar credenciales
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return { 
        statusCode: 401, 
        headers, 
        body: JSON.stringify({ error: 'Usuario o contraseña incorrectos' }) 
      };
    }

    // Generar token único basado en timestamp + secreto
    const token = crypto
      .createHmac('sha256', ADMIN_TOKEN_SECRET)
      .update(username + Date.now())
      .digest('hex');

    // Importante: El token debe ser el mismo que ADMIN_TOKEN para que coincida
    // Pero por seguridad, usamos el secreto para generarlo

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        token,
        message: 'Login exitoso' 
      })
    };

  } catch (error) {
    console.error('Error en login:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};