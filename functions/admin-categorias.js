// functions/admin-categorias.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const token = event.headers.authorization?.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;
  
  if (!token || token !== adminToken) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'No autorizado' }) };
  }

  try {
    // GET - Listar categorías
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre');

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // POST - Crear categoría
    if (event.httpMethod === 'POST') {
      const categoria = JSON.parse(event.body);
      
      const { data, error } = await supabase
        .from('categorias')
        .insert([{
          nombre: categoria.nombre,
          slug: categoria.slug || categoria.nombre.toLowerCase().replace(/\s+/g, '-'),
          icono: categoria.icono
        }])
        .select()
        .single();

      if (error) throw error;
      return { statusCode: 201, headers, body: JSON.stringify(data) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método no permitido' }) };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};