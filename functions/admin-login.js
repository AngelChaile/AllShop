// functions/admin-login.js
const crypto = require('crypto');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Configura estas variables en Netlify
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_PASS) {
      console.error('ADMIN_PASS no configurado');
      throw new Error('Error de configuración');
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return { 
        statusCode: 401, 
        headers, 
        body: JSON.stringify({ error: 'Credenciales inválidas' }) 
      };
    }

    // Generar token simple (en producción usar JWT)
    const token = crypto
      .createHash('sha256')
      .update(username + Date.now() + ADMIN_PASS)
      .digest('hex');

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
      body: JSON.stringify({ error: 'Error interno' })
    };
  }
};