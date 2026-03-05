// functions/admin-productos.js
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
    // GET - Listar productos
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('productos')
        .select('*, categorias(nombre, slug)')
        .order('id', { ascending: false });

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // POST - Crear producto
    if (event.httpMethod === 'POST') {
      const producto = JSON.parse(event.body);
      
      const { data, error } = await supabase
        .from('productos')
        .insert([{
          nombre: producto.nombre,
          detalle: producto.detalle,
          descripcion: producto.descripcion,
          precio: producto.precio,
          precio_oferta: producto.precio_oferta,
          stock: producto.stock,
          categoria_id: producto.categoria_id,
          destacado: producto.destacado,
          imagenes: producto.imagenes || []
        }])
        .select()
        .single();

      if (error) throw error;
      return { statusCode: 201, headers, body: JSON.stringify(data) };
    }

    // PUT - Actualizar producto
    if (event.httpMethod === 'PUT') {
      const producto = JSON.parse(event.body);
      const { id, ...data } = producto;

      const { data: updated, error } = await supabase
        .from('productos')
        .update({
          nombre: data.nombre,
          detalle: data.detalle,
          descripcion: data.descripcion,
          precio: data.precio,
          precio_oferta: data.precio_oferta,
          stock: data.stock,
          categoria_id: data.categoria_id,
          destacado: data.destacado,
          imagenes: data.imagenes || []
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(updated) };
    }

    // DELETE - Eliminar producto
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'ID requerido' }) };
      }

      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ message: 'Producto eliminado' }) };
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