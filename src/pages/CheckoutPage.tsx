import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Lock, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { OrderRecord, PageRoute } from '../types/store';
import { formatCurrency } from '../utils/formatters';

interface CheckoutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, subtotal, appliedCoupon, calculateShipping, createOrder, showToast } = useCart();

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    referencia: '',
    deliveryType: 'domicilio' as 'domicilio' | 'recojo',
    deliveryDate: '',
    preferredTime: 'Tarde (2:00 p. m. – 6:00 p. m.)',
    paymentMethod: 'Yape',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const shippingCost = calculateShipping(form.deliveryType);
  const discountAmount = appliedCoupon?.discountAmount ?? 0;
  const finalTotal = Math.max(0, Number((subtotal + shippingCost - discountAmount).toFixed(2)));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.nombre.trim()) next.nombre = 'Ingresa tu nombre.';
    if (!form.apellidos.trim()) next.apellidos = 'Ingresa tus apellidos.';
    if (!form.telefono.trim() || form.telefono.trim().length < 7) {
      next.telefono = 'Ingresa un teléfono válido.';
    }
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      next.correo = 'Ingresa un correo electrónico válido.';
    }
    if (form.deliveryType === 'domicilio' && !form.direccion.trim()) {
      next.direccion = 'Ingresa la dirección exacta para el envío.';
    }
    if (!form.deliveryDate) {
      next.deliveryDate = 'Selecciona una fecha estimada de entrega.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * PENDIENTE DE CONEXIÓN AL BACKEND:
   * Conectar este envío con la API segura de órdenes y la pasarela de pagos real (Culqi / Niubiz / Mercado Pago).
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Tu carrito está vacío.', 'error');
      return;
    }
    if (!validate()) {
      showToast('Revisa los campos resaltados antes de confirmar.', 'error');
      return;
    }

    const addressSummary =
      form.deliveryType === 'recojo'
        ? `Recojo en tienda (${STORE_CONFIG.location.fullAddress})`
        : `${form.direccion}, ${form.distrito}, ${form.provincia}, ${form.departamento}`;

    const order = createOrder({
      customerName: form.nombre.trim(),
      customerLastName: form.apellidos.trim(),
      phone: form.telefono.trim(),
      email: form.correo.trim(),
      deliveryType: form.deliveryType,
      addressSummary,
      deliveryDate: form.deliveryDate,
      preferredTime: form.preferredTime,
      paymentMethod: form.paymentMethod,
      items: cart,
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total: finalTotal,
    });

    setConfirmedOrder(order);
    showToast(`Pedido #${order.id} confirmado`, 'success');
  };

  if (confirmedOrder) {
    const whatsappSummary = [
      `✨ *¡Hola ${STORE_CONFIG.brandFullName}!* ✨`,
      `Acabo de confirmar mi pedido en la tienda online 🎉:`,
      ``,
      `🧾 *Código de pedido:* #${confirmedOrder.id}`,
      `👤 *Cliente:* ${confirmedOrder.customerName} ${confirmedOrder.customerLastName}`,
      `💳 *Método de pago:* ${confirmedOrder.paymentMethod}`,
      `🚚 *Entrega:* ${confirmedOrder.addressSummary} (${confirmedOrder.deliveryDate})`,
      `💰 *Total:* *${formatCurrency(confirmedOrder.total)}*`,
      ``,
      `💖 ¡Quedo atento(a) para coordinar los detalles!`,
    ].join('\n');

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C78A47]">
              Pedido confirmado
            </p>
            <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
              ¡Gracias por tu compra, {confirmedOrder.customerName}!
            </h1>
            <p className="mt-2 text-sm text-[#6E4B57]">
              Comprobante registrado con el código{' '}
              <strong className="text-[#2A151D] tabular-nums">#{confirmedOrder.id}</strong>.
            </p>
          </div>

          <div className="bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl p-5 text-left space-y-2 text-sm">
            <p>
              <strong>Entrega:</strong> {confirmedOrder.addressSummary}
            </p>
            <p>
              <strong>Fecha y horario:</strong> {confirmedOrder.deliveryDate} ·{' '}
              {confirmedOrder.preferredTime}
            </p>
            <p>
              <strong>Método de pago:</strong> {confirmedOrder.paymentMethod}
            </p>
            <p>
              <strong>Total pagado:</strong>{' '}
              <span className="tabular-nums font-bold text-[#B8295B]">
                {formatCurrency(confirmedOrder.total)}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <WhatsAppButton
              customMessage={whatsappSummary}
              label="Confirmar pago por WhatsApp"
              variant="primary"
            />
            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="px-6 py-3 border border-[#EAB8C9] text-sm font-semibold rounded-lg text-[#2A151D] hover:bg-[#FFF4F7]"
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h1 className="font-serif-display text-3xl font-semibold text-[#2A151D]">
          No hay productos para finalizar compra
        </h1>
        <p className="mt-2 text-sm text-[#6E4B57]">
          Agrega primero una o más joyas a tu bolsa para continuar al checkout.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('tienda')}
          className="mt-6 px-6 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg"
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D] mb-8">
        Finalizar compra
      </h1>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Información del cliente */}
          <section className="bg-white border border-[#F3D5DF] rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#2A151D] pb-3 border-b border-[#F3D5DF]">
              1. Información del cliente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="chk-nombre" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Nombre *
                </label>
                <input
                  id="chk-nombre"
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
                {errors.nombre && <p className="text-xs text-red-700 mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="chk-apellidos" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Apellidos *
                </label>
                <input
                  id="chk-apellidos"
                  type="text"
                  value={form.apellidos}
                  onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
                {errors.apellidos && <p className="text-xs text-red-700 mt-1">{errors.apellidos}</p>}
              </div>
              <div>
                <label htmlFor="chk-telefono" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="chk-telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="9XX XXX XXX"
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
                {errors.telefono && <p className="text-xs text-red-700 mt-1">{errors.telefono}</p>}
              </div>
              <div>
                <label htmlFor="chk-correo" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Correo electrónico *
                </label>
                <input
                  id="chk-correo"
                  type="email"
                  value={form.correo}
                  onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
                {errors.correo && <p className="text-xs text-red-700 mt-1">{errors.correo}</p>}
              </div>
            </div>
          </section>

          {/* Entrega y Dirección */}
          <section className="bg-white border border-[#F3D5DF] rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#2A151D] pb-3 border-b border-[#F3D5DF]">
              2. Entrega y dirección
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, deliveryType: 'domicilio' })}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  form.deliveryType === 'domicilio'
                    ? 'border-[#B8295B] bg-[#FCE6EE]/40'
                    : 'border-[#F3D5DF] bg-[#FFFDFB]'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-[#2A151D]">
                  <Truck className="w-4 h-4 text-[#B8295B]" />
                  <span>Envío a domicilio (Asegurado)</span>
                </div>
                <p className="text-xs text-[#6E4B57] mt-1">
                  Entrega protegida a domicilio en todo el Perú.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, deliveryType: 'recojo' })}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  form.deliveryType === 'recojo'
                    ? 'border-[#B8295B] bg-[#FCE6EE]/40'
                    : 'border-[#F3D5DF] bg-[#FFFDFB]'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-[#2A151D]">
                  <MapPin className="w-4 h-4 text-[#B8295B]" />
                  <span>Recojo en tienda</span>
                </div>
                <p className="text-xs text-[#6E4B57] mt-1">
                  Sin costo en {STORE_CONFIG.location.fullAddress}.
                </p>
              </button>
            </div>

            {form.deliveryType === 'domicilio' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label htmlFor="chk-dep" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Departamento
                  </label>
                  <input
                    id="chk-dep"
                    type="text"
                    value={form.departamento}
                    onChange={(e) => setForm({ ...form, departamento: e.target.value })}
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="chk-prov" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Provincia
                  </label>
                  <input
                    id="chk-prov"
                    type="text"
                    value={form.provincia}
                    onChange={(e) => setForm({ ...form, provincia: e.target.value })}
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="chk-dist" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Distrito
                  </label>
                  <input
                    id="chk-dist"
                    type="text"
                    value={form.distrito}
                    onChange={(e) => setForm({ ...form, distrito: e.target.value })}
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="chk-dir" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Dirección exacta *
                  </label>
                  <input
                    id="chk-dir"
                    type="text"
                    value={form.direccion}
                    onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                    placeholder="Av. / Jr. / Calle y número"
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                  {errors.direccion && <p className="text-xs text-red-700 mt-1">{errors.direccion}</p>}
                </div>
                <div>
                  <label htmlFor="chk-ref" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Referencia
                  </label>
                  <input
                    id="chk-ref"
                    type="text"
                    value={form.referencia}
                    onChange={(e) => setForm({ ...form, referencia: e.target.value })}
                    placeholder="Frente a plaza o parque"
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="chk-fecha" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Fecha de entrega *
                </label>
                <input
                  id="chk-fecha"
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
                {errors.deliveryDate && (
                  <p className="text-xs text-red-700 mt-1">{errors.deliveryDate}</p>
                )}
              </div>
              <div>
                <label htmlFor="chk-horario" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Horario preferido
                </label>
                <select
                  id="chk-horario"
                  value={form.preferredTime}
                  onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                >
                  <option>Mañana (9:30 a. m. – 1:00 p. m.)</option>
                  <option>Tarde (2:00 p. m. – 6:00 p. m.)</option>
                  <option>Noche (6:00 p. m. – 8:00 p. m.)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Método de pago */}
          <section className="bg-white border border-[#F3D5DF] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3D5DF]">
              <h2 className="text-xl font-semibold text-[#2A151D]">3. Método de pago</h2>
              <Lock className="w-4 h-4 text-[#B8295B]" aria-hidden="true" />
            </div>

            <div className="space-y-2.5">
              {STORE_CONFIG.paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    form.paymentMethod === method.name
                      ? 'border-[#B8295B] bg-[#FCE6EE]/40'
                      : 'border-[#F3D5DF] bg-[#FFFDFB]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.name}
                    checked={form.paymentMethod === method.name}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="mt-1 accent-[#B8295B]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#2A151D]">{method.name}</p>
                    <p className="text-xs text-[#6E4B57]">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Resumen lateral */}
        <aside className="lg:col-span-5 bg-white border border-[#F3D5DF] rounded-xl p-6 space-y-5 lg:sticky lg:top-28">
          <h2 className="text-xl font-semibold text-[#2A151D] pb-3 border-b border-[#F3D5DF]">
            Tu pedido ({cart.length} artículos)
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <p className="font-medium text-[#2A151D]">
                    {item.product.name} × {item.quantity}
                  </p>
                  <p className="text-xs text-[#6E4B57]">
                    Medida: {item.selectedSize}
                    {item.customization?.engravingText
                      ? ` · Grabado: "${item.customization.engravingText}"`
                      : ''}
                  </p>
                </div>
                <span className="font-semibold text-[#2A151D] tabular-nums shrink-0">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm pt-4 border-t border-[#F3D5DF]">
            <div className="flex justify-between text-[#6E4B57]">
              <span>Subtotal</span>
              <span className="tabular-nums text-[#2A151D]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6E4B57]">
              <span>Envío</span>
              <span className="tabular-nums text-[#2A151D]">
                {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#B8295B]">
                <span>Descuento ({appliedCoupon?.code})</span>
                <span className="tabular-nums">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-[#2A151D] pt-3 border-t border-[#F3D5DF]">
              <span>Total a pagar</span>
              <span className="tabular-nums">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Confirmar pedido</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-[#6E4B57]">
            <ShieldCheck className="w-4 h-4 text-[#B8295B]" />
            <span>Compra segura · Garantía de autenticidad Luz Gomez</span>
          </div>
        </aside>
      </form>
    </div>
  );
};
