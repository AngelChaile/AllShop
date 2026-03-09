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

  // Manejar OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Verificar autenticación
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

    // PUT - Actualizar categoría
    if (event.httpMethod === 'PUT') {
      const categoria = JSON.parse(event.body);
      
      if (!categoria.id) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'ID requerido' }) };
      }

      const { data, error } = await supabase
        .from('categorias')
        .update({
          nombre: categoria.nombre,
          slug: categoria.slug || categoria.nombre.toLowerCase().replace(/\s+/g, '-'),
          icono: categoria.icono
        })
        .eq('id', categoria.id)
        .select()
        .single();

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // DELETE - Eliminar categoría
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'ID requerido' }) };
      }

      // Verificar si hay productos usando esta categoría
      const { count, error: countError } = await supabase
        .from('productos')
        .select('*', { count: 'exact', head: true })
        .eq('categoria_id', id);

      if (countError) throw countError;

      if (count > 0) {
        return { 
          statusCode: 400, 
          headers, 
          body: JSON.stringify({ 
            error: `No se puede eliminar: ${count} productos usan esta categoría` 
          }) 
        };
      }

      const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ message: 'Categoría eliminada' }) };
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