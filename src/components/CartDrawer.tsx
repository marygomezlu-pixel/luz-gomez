import React, { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types/store';
import { buildWhatsAppCartMessage, formatCurrency } from '../utils/formatters';
import { JewelryImage } from './JewelryImage';
import { WhatsAppButton } from './WhatsAppButton';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const goTo = (route: PageRoute) => {
    setIsCartOpen(false);
    onNavigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Bolsa de compras">
      <div
        className="fixed inset-0 bg-[#2A151D]/45"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <aside className="relative w-full max-w-md bg-[#FFFDFB] h-full shadow-2xl border-l border-[#F3D5DF] flex flex-col z-10">
        <div className="px-6 py-5 border-b border-[#F3D5DF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B8295B]" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-[#2A151D]">Tu bolsa de joyas</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar bolsa"
            className="p-2 text-[#6E4B57] hover:text-[#2A151D] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A151D]">Tu carrito está vacío</h3>
              <p className="mt-2 text-sm text-[#6E4B57]">
                Descubre nuestras piezas en oro 18k, plata 925 y joyas personalizadas.
              </p>
              <button
                type="button"
                onClick={() => goTo('tienda')}
                className="mt-6 px-6 py-3 bg-[#B8295B] text-white text-sm font-medium rounded-lg hover:bg-[#911C45] transition-colors"
              >
                Explorar colección
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white border border-[#F3D5DF] rounded-xl p-4 flex gap-4"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FFF4F7] shrink-0">
                  <JewelryImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#2A151D] leading-snug line-clamp-2">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="text-[#6E4B57] hover:text-red-700 p-1 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6E4B57] mt-0.5">
                    Medida: {item.selectedSize} · {item.product.material}
                  </p>
                  {item.customization?.engravingText && (
                    <p className="text-xs text-[#B8295B] mt-1 font-medium">
                      Grabado: “{item.customization.engravingText}”
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[#F3D5DF] rounded-lg bg-[#FFFDFB]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label="Disminuir cantidad"
                        className="p-1.5 text-[#2A151D] hover:text-[#B8295B]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="p-1.5 text-[#2A151D] hover:text-[#B8295B]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[#2A151D] tabular-nums">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#F3D5DF] space-y-4">
            {subtotal < STORE_CONFIG.shipping.freeShippingThreshold && (
              <p className="text-xs text-[#6E4B57] bg-[#FFF4F7] px-3 py-2 rounded-lg">
                Te faltan{' '}
                <strong className="text-[#B8295B] tabular-nums">
                  {formatCurrency(STORE_CONFIG.shipping.freeShippingThreshold - subtotal)}
                </strong>{' '}
                para obtener envío asegurado gratis.
              </p>
            )}

            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag
                  className="w-3.5 h-3.5 text-[#6E4B57] absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Cupón (ej. LUZ10)"
                  aria-label="Código de cupón"
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg pl-8 pr-3 py-2 text-xs text-[#2A151D]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#FFF4F7] border border-[#F3D5DF] text-xs font-semibold text-[#2A151D] rounded-lg hover:bg-[#FCE6EE]"
              >
                Aplicar
              </button>
            </form>
            {couponError && <p className="text-xs text-red-700">{couponError}</p>}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6E4B57]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#2A151D]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6E4B57]">
                <span>Envío estimado</span>
                <span className="tabular-nums font-medium text-[#2A151D]">
                  {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#B8295B]">
                  <span className="flex items-center gap-1.5">
                    Descuento ({appliedCoupon.code})
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs underline text-[#6E4B57]"
                    >
                      Quitar
                    </button>
                  </span>
                  <span className="tabular-nums font-medium">
                    -{formatCurrency(appliedCoupon.discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#2A151D] pt-2 border-t border-[#F3D5DF]">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => goTo('carrito')}
                className="px-4 py-3 border border-[#EAB8C9] text-[#2A151D] text-xs font-semibold rounded-lg hover:bg-[#FFF4F7] transition-colors"
              >
                Ver carrito
              </button>
              <button
                type="button"
                onClick={() => goTo('checkout')}
                className="px-4 py-3 bg-[#B8295B] text-white text-xs font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
              >
                Ir al checkout
              </button>
            </div>

            <WhatsAppButton
              customMessage={buildWhatsAppCartMessage({
                cart,
                subtotal,
                shippingCost,
                discountCode: appliedCoupon?.code,
                discountAmount: appliedCoupon?.discountAmount,
                total,
              })}
              label="Enviar bolsa por WhatsApp"
              variant="subtle"
              className="w-full py-2.5 text-xs"
            />
          </div>
        )}
      </aside>
    </div>
  );
};
