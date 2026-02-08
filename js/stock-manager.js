// js/stock-manager.js
class StockManager {
  constructor() {
    this.reservedStock = JSON.parse(localStorage.getItem('reservedStock')) || {};
    this.initializeReservations();
  }

  initializeReservations() {
    if (!localStorage.getItem('reservedStock')) {
      localStorage.setItem('reservedStock', JSON.stringify({}));
    }
  }

  reserveStock(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === productId);
    
    if (!productInCart) return false;

    const currentReserved = this.reservedStock[productId] || 0;
    this.reservedStock[productId] = currentReserved + quantity;
    
    localStorage.setItem('reservedStock', JSON.stringify({
      ...this.reservedStock,
      [`${productId}_timestamp`]: Date.now()
    }));
    
    return true;
  }

  getAvailableStock(productId, originalStock) {
    const reserved = this.reservedStock[productId] || 0;
    return Math.max(0, originalStock - reserved);
  }

  releaseStock(productId, quantity) {
    if (this.reservedStock[productId]) {
      this.reservedStock[productId] = Math.max(0, this.reservedStock[productId] - quantity);
      localStorage.setItem('reservedStock', JSON.stringify(this.reservedStock));
    }
  }

  // Para usar cuando se complete el pago
  clearReservation(productId) {
    if (this.reservedStock[productId]) {
      delete this.reservedStock[productId];
      delete this.reservedStock[`${productId}_timestamp`];
      localStorage.setItem('reservedStock', JSON.stringify(this.reservedStock));
    }
  }

  cleanupExpiredReservations() {
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000; // 1 hora para reservas

    for (const key in this.reservedStock) {
      if (key.endsWith('_timestamp')) {
        const productId = key.replace('_timestamp', '');
        const timestamp = this.reservedStock[key];
        
        if (now - timestamp > ONE_HOUR) {
          delete this.reservedStock[productId];
          delete this.reservedStock[key];
        }
      }
    }
    
    localStorage.setItem('reservedStock', JSON.stringify(this.reservedStock));
  }
}

export const stockManager = new StockManager();