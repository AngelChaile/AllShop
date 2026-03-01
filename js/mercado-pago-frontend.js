// js/mercado-pago-frontend.js
const MP_PUBLIC_KEY = 'APP_USR-b4f00727-d0e9-4a0f-8f25-833148ec0b7b'; // Tu Public Key aquí

export class MercadoPagoService {
  constructor() {
    this.mp = null;
  }

  async initialize() {
    if (this.mp) return this.mp;
    
    await this.loadSDK();
    
    this.mp = new window.MercadoPago(MP_PUBLIC_KEY, {
      locale: 'es-AR'
    });
    
    return this.mp;
  }

  loadSDK() {
    return new Promise((resolve, reject) => {
      if (window.MercadoPago) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Error cargando SDK MercadoPago'));
      document.head.appendChild(script);
    });
  }

  async createPayment(cart, customerData) {
    try {
      const response = await fetch('/.netlify/functions/mercado-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customer: customerData
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Error creando pago');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async redirectToCheckout(cart, customerData) {
    try {
      const paymentData = await this.createPayment(cart, customerData);
      // Redirigir a MercadoPago
      window.location.href = paymentData.init_point;
    } catch (error) {
      throw error;
    }
  }
}

export const mercadoPagoService = new MercadoPagoService();