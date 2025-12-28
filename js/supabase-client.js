// supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Tus credenciales (las obtuviste en paso 3)
const SUPABASE_URL = 'https://vfwpmpsjqsjtcreedtdv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_I_5RshbhJk96n8H_UCtzIw_2P4Sv58T';

// Crear cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener productos (con respaldo local)
export async function getProducts() {
  try {
    const { data: productos, error } = await supabase
      .from('productos')
      .select('*')
      .gt('stock', 0)
      .order('destacado', { ascending: false });
    
    if (error) throw error;
    
    console.log('Productos cargados desde Supabase:', productos.length);
    return productos;
  } catch (error) {
    console.warn('Error cargando de Supabase, usando local:', error.message);
    // Import dinámico de productos locales como respaldo
    const module = await import('./products.js');
    return module.products || [];
  }
}

// Función para obtener un producto por ID
export async function getProductById(id) {
  try {
    const { data: producto, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return producto;
  } catch (error) {
    console.warn('Error cargando producto desde Supabase:', error.message);
    // Buscar en productos locales como respaldo
    const module = await import('./products.js');
    return module.products.find(p => p.id === id) || null;
  }
}