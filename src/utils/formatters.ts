import { STORE_CONFIG } from '../config/storeConfig';
import { CartItem } from '../types/store';

export function formatCurrency(amount: number): string {
  return `${STORE_CONFIG.currencySymbol} ${amount.toFixed(2)}`;
}

export function normalizeWhatsAppDigits(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (!digits) return STORE_CONFIG.contact.whatsappNumberRaw;
  if (digits.length === 9 && digits.startsWith('9')) {
    return `51${digits}`;
  }
  return digits;
}

export interface WhatsAppOrderPayload {
  productName: string;
  size?: string;
  quantity: number;
  price: number;
  engraving?: string;
  deliveryDate?: string;
}

export function buildWhatsAppProductUrl(
  payload: WhatsAppOrderPayload,
  whatsappNumberRaw: string = STORE_CONFIG.contact.whatsappNumberRaw
): string {
  const lines = [
    `✨ *¡Hola ${STORE_CONFIG.brandFullName}!* ✨`,
    `Me encantaría realizar este pedido 💎:`,
    ``,
    `💍 *Producto:* ${payload.productName}`,
  ];

  if (payload.size) {
    lines.push(`📏 *Talla / Medida:* ${payload.size}`);
  }
  lines.push(`🛍️ *Cantidad:* ${payload.quantity}`);
  lines.push(`💰 *Precio total:* *${formatCurrency(payload.price)}*`);

  if (payload.engraving && payload.engraving.trim().length > 0) {
    lines.push(`✍️ *Grabado personalizado:* "${payload.engraving.trim()}"`);
  }
  if (payload.deliveryDate) {
    lines.push(`📅 *Fecha deseada:* ${payload.deliveryDate}`);
  }

  lines.push(``);
  lines.push(`💖 ¿Me ayudan a coordinar el pago y la entrega, por favor?`);

  const message = encodeURIComponent(lines.join('\n'));
  const cleanNumber = normalizeWhatsAppDigits(whatsappNumberRaw);
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

export function buildWhatsAppCartMessage(params: {
  cart: CartItem[];
  subtotal: number;
  shippingCost: number;
  discountCode?: string;
  discountAmount?: number;
  total: number;
}): string {
  const { cart, subtotal, shippingCost, discountCode, discountAmount, total } = params;

  const lines: string[] = [
    `✨ *¡Hola ${STORE_CONFIG.brandFullName}!* ✨`,
    `Quiero realizar este pedido desde mi bolsa 🛍️:`,
    ``,
  ];

  cart.forEach((item, index) => {
    const itemTotal = formatCurrency(item.product.price * item.quantity);
    lines.push(`💎 *${index + 1}. ${item.product.name}*`);
    lines.push(`   • Medida: ${item.selectedSize} | Cantidad: ${item.quantity}`);
    if (item.customization?.engravingText) {
      lines.push(`   • ✍️ Grabado: "${item.customization.engravingText}"`);
    }
    lines.push(`   • Subtotal pieza: *${itemTotal}*`);
  });

  lines.push(``);
  lines.push(`────────────────────`);
  lines.push(`📦 Subtotal: ${formatCurrency(subtotal)}`);
  lines.push(
    `🚚 Envío: ${shippingCost === 0 ? '*¡GRATIS!*' : formatCurrency(shippingCost)}`
  );
  if (discountCode && discountAmount && discountAmount > 0) {
    lines.push(`🏷️ Cupón (${discountCode}): -${formatCurrency(discountAmount)}`);
  }
  lines.push(`💰 *TOTAL A PAGAR: ${formatCurrency(total)}*`);
  lines.push(`────────────────────`);
  lines.push(``);
  lines.push(`💖 ¿Me confirman disponibilidad y métodos de pago (Yape/Plin/Tarjeta)?`);

  return lines.join('\n');
}

export function buildWhatsAppGenericUrl(
  customMessage: string,
  whatsappNumberRaw: string = STORE_CONFIG.contact.whatsappNumberRaw
): string {
  const message = encodeURIComponent(customMessage);
  const cleanNumber = normalizeWhatsAppDigits(whatsappNumberRaw);
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
