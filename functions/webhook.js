// functions/webhook.js
exports.handler = async (event) => {
  console.log('🔵 Webhook recibido');

  // Solo aceptar POST de Mercado Pago
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    console.log('Notificación completa:', JSON.stringify(body, null, 2));

    // Aquí puedes procesar la notificación.
    // Si el pago fue aprobado (body.type === 'payment' y body.action === 'payment.created' o 'payment.updated')
    // puedes, por ejemplo, llamar a una función para actualizar el stock en Supabase.
    // if (body.type === 'payment' && body.data?.id) {
    //   const paymentId = body.data.id;
    //   // ... lógica para obtener detalles del pago con el Access Token
    //   // ... lógica para actualizar stock de los productos vendidos
    // }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('🔴 Error procesando webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};