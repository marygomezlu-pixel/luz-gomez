import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Settings2,
} from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { showToast, socialConfig, setIsAccountOpen } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  /**
   * PENDIENTE DE CONEXIÓN AL BACKEND:
   * Conectar este formulario a un endpoint POST /api/contact o servicio de correo transaccional.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Por favor completa tu nombre, correo electrónico y mensaje.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }
    setError(null);
    setSent(true);
    showToast('Mensaje enviado correctamente', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
          Atención Boutique
        </p>
        <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Contáctanos
        </h1>
        <p className="mt-3 text-base text-[#6E4B57]">
          ¿Necesitas asesoría para elegir un anillo de compromiso, cotizar un grabado especial o coordinar tu pedido? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 space-y-5">
            <h2 className="text-xl font-semibold text-[#2A151D]">Atención al Cliente</h2>
            <div className="space-y-4 text-sm text-[#6E4B57]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8295B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2A151D]">Dirección</p>
                  <p>{STORE_CONFIG.location.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#B8295B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2A151D]">Teléfono y WhatsApp</p>
                  <p>{socialConfig.whatsappDisplay}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#B8295B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2A151D]">Correo electrónico</p>
                  <p>{STORE_CONFIG.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#B8295B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2A151D]">Horario de atención</p>
                  <p>{STORE_CONFIG.location.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F3D5DF] space-y-3">
              <WhatsAppButton
                label="Escribir ahora por WhatsApp"
                variant="primary"
                className="w-full"
              />

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={socialConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg text-xs font-medium text-[#2A151D] hover:border-[#B8295B]"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#B8295B]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={socialConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg text-xs font-medium text-[#2A151D] hover:border-[#B8295B]"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#B8295B]" />
                  <span>Facebook</span>
                </a>
                <a
                  href={socialConfig.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg text-xs font-medium text-[#2A151D] hover:border-[#B8295B]"
                >
                  <span>TikTok</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#B8295B] hover:underline pt-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Cambiar mi número de WhatsApp o redes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-semibold text-[#2A151D]">¡Gracias por escribirnos!</h2>
              <p className="text-sm text-[#6E4B57] max-w-md mx-auto">
                Hemos recibido tu consulta. Una asesora de {STORE_CONFIG.brandFullName} se pondrá en contacto contigo muy pronto.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', phone: '', message: '' });
                }}
                className="px-5 py-2.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <h2 className="text-xl font-semibold text-[#2A151D] pb-3 border-b border-[#F3D5DF]">
                Envíanos un mensaje
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cnt-name" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Nombre completo *
                  </label>
                  <input
                    id="cnt-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cnt-phone" className="block text-xs font-medium text-[#2A151D] mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="cnt-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cnt-email" className="block text-xs font-medium text-[#2A151D] mb-1">
                  Correo electrónico *
                </label>
                <input
                  id="cnt-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label htmlFor="cnt-msg" className="block text-xs font-medium text-[#2A151D] mb-1">
                  ¿En qué podemos ayudarte? *
                </label>
                <textarea
                  id="cnt-msg"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Cuéntanos sobre la joya que buscas, talla o fecha especial..."
                  className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>
              {error && <p className="text-xs text-red-700">{error}</p>}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Enviar mensaje</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
