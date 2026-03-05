// functions/admin-dashboard.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Verificar token simple
  const token = event.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'No autorizado' }) };
  }

  try {
    const [
      { count: totalProductos },
      { count: totalCategorias },
      { count: pedidosPendientes },
      { data: stockBajo }
    ] = await Promise.all([
      supabase.from('productos').select('*', { count: 'exact', head: true }),
      supabase.from('categorias').select('*', { count: 'exact', head: true }),
      supabase.from('pedidos').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
      supabase.from('productos').select('*').lt('stock', 5)
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        totalProductos,
        totalCategorias,
        pedidosPendientes,
        stockBajo: stockBajo?.length || 0
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};