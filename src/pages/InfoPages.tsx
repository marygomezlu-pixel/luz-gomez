import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { FAQ_ITEMS } from '../data/products';
import { PageRoute } from '../types/store';

interface InfoPagesProps {
  route: Extract<
    PageRoute,
    'faq' | 'privacidad' | 'terminos' | 'guia-tallas' | 'cuidados' | 'envios'
  >;
}

export const InfoPages: React.FC<InfoPagesProps> = ({ route }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (route === 'faq') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
          Centro de Ayuda
        </p>
        <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D] mb-8">
          Preguntas frecuentes
        </h1>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#F3D5DF] rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-xs text-[#C78A47] font-medium block">
                      {item.category}
                    </span>
                    <span className="text-base font-semibold text-[#2A151D]">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B8295B] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#6E4B57] leading-relaxed border-t border-[#F3D5DF]/60 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (route === 'guia-tallas') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
            Ayuda al Comprador
          </p>
          <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
            Guía de tallas para anillos y collares
          </h1>
        </div>

        <section className="bg-white border border-[#F3D5DF] rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#2A151D]">Tabla de tallas de anillos</h2>
          <p className="text-sm text-[#6E4B57]">
            Mide el diámetro interior de un anillo que ya uses cómodamente o la circunferencia de tu dedo con una cinta suave.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F3D5DF] text-[#6E4B57]">
                  <th className="py-3 pr-4 font-semibold">Talla US / Perú</th>
                  <th className="py-3 pr-4 font-semibold">Diámetro interno</th>
                  <th className="py-3 font-semibold">Circunferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3D5DF] tabular-nums">
                <tr><td className="py-3 pr-4 font-medium">5</td><td className="py-3 pr-4">15.7 mm</td><td className="py-3">49.3 mm</td></tr>
                <tr><td className="py-3 pr-4 font-medium">6</td><td className="py-3 pr-4">16.5 mm</td><td className="py-3">51.9 mm</td></tr>
                <tr><td className="py-3 pr-4 font-medium">7</td><td className="py-3 pr-4">17.3 mm</td><td className="py-3">54.4 mm</td></tr>
                <tr><td className="py-3 pr-4 font-medium">8</td><td className="py-3 pr-4">18.1 mm</td><td className="py-3">57.0 mm</td></tr>
                <tr><td className="py-3 pr-4 font-medium">9</td><td className="py-3 pr-4">18.9 mm</td><td className="py-3">59.5 mm</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-[#F3D5DF] rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-[#2A151D]">Longitudes de cadenas y collares</h2>
          <ul className="space-y-2 text-sm text-[#6E4B57]">
            <li><strong className="text-[#2A151D]">40 cm:</strong> Estilo gargantilla corta, descansa justo sobre la base del cuello.</li>
            <li><strong className="text-[#2A151D]">45 cm:</strong> Largo estándar clásico, ideal para dijes y uso diario a la altura de la clavícula.</li>
            <li><strong className="text-[#2A151D]">50 cm – 55 cm:</strong> Caída elegante debajo de la clavícula, perfecta para medallones y capas.</li>
          </ul>
        </section>
      </div>
    );
  }

  if (route === 'cuidados') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Cuidados de tus joyas
        </h1>
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#6E4B57] leading-relaxed">
          <p>
            <strong className="text-[#2A151D]">1. Evita químicos y perfumes:</strong> Colócate tus joyas después de aplicar cremas, perfumes o fijadores para preservar el baño y las gemas.
          </p>
          <p>
            <strong className="text-[#2A151D]">2. Almacenamiento individual:</strong> Guarda cada pieza en su bolsa suave o estuche acolchado de {STORE_CONFIG.brandFullName} para evitar roces.
          </p>
          <p>
            <strong className="text-[#2A151D]">3. Limpieza periódica:</strong> Utiliza agua tibia, jabón neutro y un paño de microfibra limpio para devolver el brillo a tus joyas de oro 18k y plata 925.
          </p>
        </div>
      </div>
    );
  }

  if (route === 'envios') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Envíos, garantías y devoluciones
        </h1>
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#6E4B57] leading-relaxed">
          <p>
            <strong className="text-[#2A151D]">Envíos a todo el Perú:</strong> Entrega protegida de 24 a 72 horas hábiles. Envío gratuito en compras superiores a S/ {STORE_CONFIG.shipping.freeShippingThreshold.toFixed(2)}.
          </p>
          <p>
            <strong className="text-[#2A151D]">Envíos nacionales:</strong> Despachamos a todo el Perú mediante courier certificado con número de seguimiento y seguro contra pérdidas.
          </p>
          <p>
            <strong className="text-[#2A151D]">Cambios y devoluciones:</strong> Aceptamos cambios por talla o modelo dentro de los 15 días calendario posteriores a la entrega, siempre que la joya esté sin uso y con su empaque original. Las piezas personalizadas con grabado no aplican para devolución salvo defecto de fabricación.
          </p>
        </div>
      </div>
    );
  }

  if (route === 'privacidad') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Política de privacidad
        </h1>
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#6E4B57] leading-relaxed">
          <p>
            En {STORE_CONFIG.brandFullName} protegemos tus datos personales conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú.
          </p>
          <p>
            La información proporcionada durante tu compra o suscripción (nombre, teléfono, dirección de entrega y correo electrónico) se utiliza únicamente para gestionar tus pedidos, coordinar entregas a nivel nacional y enviarte novedades si diste tu consentimiento.
          </p>
          <p>
            Nunca vendemos ni compartimos tu información con terceros ajenos al proceso logístico o de pago, y no almacenamos datos sensibles de tarjetas en el navegador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
      <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
        Términos y condiciones
      </h1>
      <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#6E4B57] leading-relaxed">
        <p>
          Al realizar un pedido en {STORE_CONFIG.brandFullName}, aceptas las condiciones de venta, tiempos de grabado personalizado y políticas de envío aquí descritas.
        </p>
        <p>
          Todos los precios se expresan en Soles Peruanos (S/) e incluyen el IGV correspondiente. Las imágenes referenciales muestran acabados reales de nuestras piezas; ligeras variaciones artesanales pueden presentarse en perlas naturales o grabados manuales.
        </p>
        <p>
          Para consultas sobre tu comprobante o garantías, escríbenos a{' '}
          <strong className="text-[#2A151D]">{STORE_CONFIG.contact.email}</strong>.
        </p>
      </div>
    </div>
  );
};
