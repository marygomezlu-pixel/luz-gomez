/**
 * Configuración central de la tienda Luz Gomez Joyería.
 * Modifica este archivo para actualizar el nombre de la marca, número de WhatsApp,
 * redes sociales, costos de envío, cupones y datos de contacto sin tocar los componentes.
 *
 * PENDIENTE DE CONEXIÓN AL BACKEND:
 * En producción, los cupones y tarifas de envío deben validarse en el servidor.
 */

export const STORE_CONFIG = {
  brandName: 'Luz Gomez',
  brandFullName: 'Luz Gomez Joyería',
  tagline: 'Joyas que convierten momentos en recuerdos',
  currencySymbol: 'S/',
  location: {
    city: 'Perú',
    region: '',
    country: 'Perú',
    fullAddress: 'Boutique Luz Gomez, Perú',
    hours: 'Lunes a Sábado: 9:30 a. m. – 8:00 p. m.',
  },
  contact: {
    // Número oficial de WhatsApp y atención al cliente
    whatsappDisplay: '+51 953 323 578',
    whatsappNumberRaw: '51953323578',
    email: 'contacto@luzgomez.com',
  },
  social: {
    instagram: 'https://instagram.com/luzgomezjoyeria',
    facebook: 'https://facebook.com/luzgomezjoyeria',
    tiktok: 'https://tiktok.com/@luzgomezjoyeria',
  },
  shipping: {
    standardCost: 15.0,
    freeShippingThreshold: 400.0,
    pickupCost: 0.0,
  },
  // Cupones simulados para el frontend (PENDIENTE DE CONEXIÓN AL BACKEND)
  coupons: [
    { code: 'LUZ10', type: 'percentage' as const, value: 10, description: '10% de descuento en tu compra' },
    { code: 'BIENVENIDA50', type: 'fixed' as const, value: 50, description: 'S/ 50.00 de descuento directo' },
    { code: 'PLATA20', type: 'percentage' as const, value: 20, description: '20% de descuento especial' },
  ],
  paymentMethods: [
    { id: 'yape', name: 'Yape', description: 'Pago inmediato mediante código QR o número afiliado' },
    { id: 'plin', name: 'Plin', description: 'Transferencia rápida sin comisiones desde tu app bancaria' },
    { id: 'transferencia', name: 'Transferencia bancaria', description: 'BCP, Interbank o BBVA (verificación inmediata)' },
    { id: 'contraentrega', name: 'Pago contra entrega', description: 'Disponible al recibir tu joya en zonas habilitadas' },
    { id: 'tarjeta', name: 'Tarjeta de crédito o débito', description: 'Visa, Mastercard y American Express' },
  ],
} as const;
