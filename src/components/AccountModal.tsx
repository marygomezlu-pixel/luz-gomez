import React, { useEffect, useState } from 'react';
import { ExternalLink, MessageCircle, Package, RotateCcw, Save, Settings2, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppGenericUrl, formatCurrency } from '../utils/formatters';
import { Modal } from './Modal';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    orders,
    socialConfig,
    updateSocialConfig,
    resetSocialConfig,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'pedidos' | 'redes'>('redes');
  const [whatsappInput, setWhatsappInput] = useState(socialConfig.whatsappDisplay);
  const [instagramInput, setInstagramInput] = useState(socialConfig.instagram);
  const [facebookInput, setFacebookInput] = useState(socialConfig.facebook);
  const [tiktokInput, setTiktokInput] = useState(socialConfig.tiktok);

  useEffect(() => {
    setWhatsappInput(socialConfig.whatsappDisplay);
    setInstagramInput(socialConfig.instagram);
    setFacebookInput(socialConfig.facebook);
    setTiktokInput(socialConfig.tiktok);
  }, [socialConfig, isAccountOpen]);

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialConfig({
      whatsappDisplay: whatsappInput.trim() || '+51 XXX XXX XXX',
      whatsappNumberRaw: whatsappInput.trim(),
      instagram: instagramInput.trim(),
      facebook: facebookInput.trim(),
      tiktok: tiktokInput.trim(),
    });
  };

  return (
    <Modal
      isOpen={isAccountOpen}
      onClose={() => setIsAccountOpen(false)}
      title="Mi cuenta, WhatsApp y Redes"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 p-1 bg-[#FFF4F7] border border-[#F3D5DF] rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('redes')}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
              activeTab === 'redes'
                ? 'bg-white text-[#B8295B] shadow-sm'
                : 'text-[#6E4B57] hover:text-[#2A151D]'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>Conectar WhatsApp y Redes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
              activeTab === 'pedidos'
                ? 'bg-white text-[#B8295B] shadow-sm'
                : 'text-[#6E4B57] hover:text-[#2A151D]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Mis pedidos ({orders.length})</span>
          </button>
        </div>

        {activeTab === 'redes' ? (
          <form onSubmit={handleSaveSocial} className="space-y-4">
            <div className="bg-white border border-[#F3D5DF] rounded-xl p-4 text-sm text-[#6E4B57]">
              Conecta aquí tu número real de <strong className="text-[#2A151D]">WhatsApp</strong> y tus enlaces de redes sociales. Todos los botones de compra y contacto de la tienda usarán estos datos al instante.
            </div>

            <div>
              <label htmlFor="cfg-wa" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-1.5">
                Tu número de WhatsApp (Perú +51)
              </label>
              <input
                id="cfg-wa"
                type="text"
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                placeholder="Ej. +51 987 654 321"
                className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
              />
              <p className="text-xs text-[#6E4B57] mt-1">
                Puedes escribir 9 dígitos (ej. 987654321) o con código de país (+51 987 654 321).
              </p>
            </div>

            <div>
              <label htmlFor="cfg-ig" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-1.5">
                Enlace de Instagram
              </label>
              <input
                id="cfg-ig"
                type="url"
                value={instagramInput}
                onChange={(e) => setInstagramInput(e.target.value)}
                placeholder="https://instagram.com/tu_usuario"
                className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cfg-fb" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-1.5">
                  Enlace de Facebook
                </label>
                <input
                  id="cfg-fb"
                  type="url"
                  value={facebookInput}
                  onChange={(e) => setFacebookInput(e.target.value)}
                  placeholder="https://facebook.com/tu_pagina"
                  className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
                />
              </div>

              <div>
                <label htmlFor="cfg-tt" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-1.5">
                  Enlace de TikTok
                </label>
                <input
                  id="cfg-tt"
                  type="url"
                  value={tiktokInput}
                  onChange={(e) => setTiktokInput(e.target.value)}
                  placeholder="https://tiktok.com/@tu_usuario"
                  className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar conexiones</span>
              </button>

              <a
                href={buildWhatsAppGenericUrl(
                  'Hola, estoy probando la conexión de WhatsApp desde mi tienda Luz Gomez.',
                  whatsappInput
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EAB8C9] text-sm font-medium text-[#2A151D] rounded-lg hover:bg-[#FFF4F7]"
              >
                <MessageCircle className="w-4 h-4 text-[#B8295B]" />
                <span>Probar WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6E4B57]" />
              </a>

              <button
                type="button"
                onClick={resetSocialConfig}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#6E4B57] hover:text-[#2A151D] ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-white border border-[#F3D5DF] rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#2A151D]">
                  Historial guardado en este dispositivo
                </h3>
                <p className="text-sm text-[#6E4B57] mt-0.5">
                  Tus pedidos realizados se conservan localmente en tu navegador.
                </p>
              </div>
            </div>

            {/* PENDIENTE DE CONEXIÓN AL BACKEND: Autenticación de clientes e historial desde servidor */}
            {orders.length === 0 ? (
              <div className="bg-white border border-[#F3D5DF] rounded-xl p-8 text-center">
                <Package className="w-8 h-8 text-[#C78A47] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#2A151D]">
                  Aún no has realizado pedidos en esta sesión.
                </p>
                <p className="text-xs text-[#6E4B57] mt-1">
                  Cuando completes tu compra en el Checkout, aparecerá aquí tu comprobante.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#F3D5DF] rounded-xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2A151D] tabular-nums">
                        Pedido #{order.id}
                      </span>
                      <span className="text-xs font-semibold text-[#B8295B]">{order.status}</span>
                    </div>
                    <p className="text-xs text-[#6E4B57]">
                      {order.date} · {order.paymentMethod} · {order.items.length} artículo(s)
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F3D5DF] text-sm">
                      <span className="text-[#6E4B57]">{order.addressSummary}</span>
                      <span className="font-bold text-[#2A151D] tabular-nums">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
