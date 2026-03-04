// js/config.js
export const isDevelopment = window.location.hostname === 'localhost' || 
                             window.location.hostname.includes('netlify.app');

export function log(...args) {
  if (isDevelopment) {
    console.log(...args);
  }
}

export function error(...args) {
  if (isDevelopment) {
    console.error(...args);
  }
}