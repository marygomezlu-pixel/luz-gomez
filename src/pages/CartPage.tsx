import React, { useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import { JewelryImage } from '../components/JewelryImage';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types/store';
import { buildWhatsAppCartMessage, formatCurrency } from '../utils/formatters';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    subtotal,
    shippingCost,
    appliedCoupon,
    couponError,
    total,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D] mb-8">
        Carrito de compras
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-semibold text-[#2A151D]">Tu carrito está vacío</h2>
          <p className="mt-2 text-sm text-[#6E4B57] max-w-md mx-auto">
            Explora nuestra colección de anillos, collares, pulseras y joyas grabadas para encontrar un regalo inolvidable.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('tienda')}
            className="mt-6 px-7 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45]"
          >
            Continuar comprando
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white border border-[#F3D5DF] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-5"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#FFF4F7] shrink-0">
                  <JewelryImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#6E4B57]">
                    {item.product.category} · {item.product.material}
                  </p>
                  <h2 className="text-lg font-semibold text-[#2A151D] mt-0.5">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-[#6E4B57] mt-1">Medida: {item.selectedSize}</p>
                  {item.customization?.engravingText && (
                    <p className="text-xs text-[#B8295B] font-medium mt-1">
                      Grabado: “{item.customization.engravingText}”
                      {item.customization.fontStyle ? ` (${item.customization.fontStyle})` : ''}
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <span className="text-lg font-bold text-[#2A151D] tabular-nums">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-[#F3D5DF] rounded-lg bg-[#FFFDFB]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label="Disminuir cantidad"
                        className="p-2 text-[#2A151D] hover:text-[#B8295B]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="p-2 text-[#2A151D] hover:text-[#B8295B]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="p-2 text-[#6E4B57] hover:text-red-700 border border-[#F3D5DF] rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="inline-flex items-center text-sm font-semibold text-[#B8295B] hover:underline pt-2"
            >
              ← Continuar comprando
            </button>
          </div>

          <aside className="lg:col-span-4 bg-white border border-[#F3D5DF] rounded-xl p-6 space-y-5">
            <h2 className="text-xl font-semibold text-[#2A151D] pb-3 border-b border-[#F3D5DF]">
              Resumen del pedido
            </h2>

            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label htmlFor="cart-coupon" className="text-xs font-medium text-[#6E4B57] block">
                ¿Tienes un cupón de descuento?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#6E4B57] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-coupon"
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="LUZ10 o BIENVENIDA50"
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg pl-9 pr-3 py-2.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#FFF4F7] border border-[#F3D5DF] text-sm font-semibold rounded-lg hover:bg-[#FCE6EE]"
                >
                  Aplicar
                </button>
              </div>
              {couponError && <p className="text-xs text-red-700">{couponError}</p>}
              <p className="text-xs text-[#6E4B57]">
                Prueba: {STORE_CONFIG.coupons.map((c) => c.code).join(' · ')}
              </p>
            </form>

            <div className="space-y-2.5 text-sm pt-2 border-t border-[#F3D5DF]">
              <div className="flex justify-between text-[#6E4B57]">
                <span>Subtotal</span>
                <span className="font-medium text-[#2A151D] tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6E4B57]">
                <span>Envío asegurado</span>
                <span className="font-medium text-[#2A151D] tabular-nums">
                  {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#B8295B]">
                  <span>
                    Descuento ({appliedCoupon.code}){' '}
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs underline text-[#6E4B57] ml-1"
                    >
                      Quitar
                    </button>
                  </span>
                  <span className="font-medium tabular-nums">
                    -{formatCurrency(appliedCoupon.discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-[#2A151D] pt-3 border-t border-[#F3D5DF]">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('checkout')}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
            >
              <span>Ir al checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <WhatsAppButton
              customMessage={buildWhatsAppCartMessage({
                cart,
                subtotal,
                shippingCost,
                discountCode: appliedCoupon?.code,
                discountAmount: appliedCoupon?.discountAmount,
                total,
              })}
              label="Enviar carrito por WhatsApp"
              variant="outline"
              className="w-full"
            />
          </aside>
        </div>
      )}
    </div>
  );
};
