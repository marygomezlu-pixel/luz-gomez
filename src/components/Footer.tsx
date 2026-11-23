import React from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, MessageCircle, Settings2 } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types/store';
import { buildWhatsAppGenericUrl } from '../utils/formatters';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { socialConfig, setIsAccountOpen } = useCart();

  const linkClass =
    'text-sm text-[#6E4B57] hover:text-[#B8295B] transition-colors text-left block py-1';

  return (
    <footer className="bg-[#FFF4F7] border-t border-[#F3D5DF] text-[#2A151D] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#2A151D] mb-4">
              Tienda
            </h3>
            <ul className="space-y-1">
              <li>
                <button type="button" onClick={() => onNavigate('inicio')} className={linkClass}>
                  Inicio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('tienda')} className={linkClass}>
                  Tienda
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('categorias')} className={linkClass}>
                  Categorías
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('ofertas')} className={linkClass}>
                  Ofertas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('personalizados')} className={linkClass}>
                  Personalizados
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#2A151D] mb-4">
              Ayuda
            </h3>
            <ul className="space-y-1">
              <li>
                <button type="button" onClick={() => onNavigate('faq')} className={linkClass}>
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('guia-tallas')} className={linkClass}>
                  Guía de tallas (anillos/collares)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('cuidados')} className={linkClass}>
                  Cuidados de tus joyas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('envios')} className={linkClass}>
                  Envíos y garantías
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('envios')} className={linkClass}>
                  Cambios y devoluciones
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#2A151D] mb-4">
              Empresa
            </h3>
            <ul className="space-y-1">
              <li>
                <button type="button" onClick={() => onNavigate('nosotros')} className={linkClass}>
                  Nosotros
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contacto')} className={linkClass}>
                  Contacto
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('blog')} className={linkClass}>
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#2A151D] mb-4">
              Legal
            </h3>
            <ul className="space-y-1">
              <li>
                <button type="button" onClick={() => onNavigate('privacidad')} className={linkClass}>
                  Política de privacidad
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('terminos')} className={linkClass}>
                  Términos y condiciones
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#2A151D] mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-[#6E4B57]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8295B] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Perú · Atención online y envíos nacionales</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8295B] shrink-0" aria-hidden="true" />
                <span>{socialConfig.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8295B] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${STORE_CONFIG.contact.email}`}
                  className="hover:text-[#B8295B] transition-colors"
                >
                  {STORE_CONFIG.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2.5 flex-wrap">
              <a
                href={socialConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Luz Gomez"
                className="w-9 h-9 rounded-full bg-white border border-[#F3D5DF] flex items-center justify-center text-[#2A151D] hover:border-[#B8295B] hover:text-[#B8295B] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socialConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Luz Gomez"
                className="w-9 h-9 rounded-full bg-white border border-[#F3D5DF] flex items-center justify-center text-[#2A151D] hover:border-[#B8295B] hover:text-[#B8295B] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={socialConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Luz Gomez"
                className="px-3 h-9 rounded-full bg-white border border-[#F3D5DF] flex items-center justify-center text-xs font-semibold text-[#2A151D] hover:border-[#B8295B] hover:text-[#B8295B] transition-colors"
              >
                TikTok
              </a>
              <a
                href={buildWhatsAppGenericUrl(
                  'Hola Luz Gomez Joyería, quisiera hacer una consulta.',
                  socialConfig.whatsappNumberRaw
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Luz Gomez"
                className="w-9 h-9 rounded-full bg-white border border-[#F3D5DF] flex items-center justify-center text-[#2A151D] hover:border-[#B8295B] hover:text-[#B8295B] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8295B] hover:underline"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Configurar mi WhatsApp y Redes</span>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F3D5DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E4B57]">
          <p>© 2026 Luz Gomez Joyería. Todos los derechos reservados.</p>
          <p>Joyería certificada en oro 18k y plata 925 · Atención personalizada</p>
        </div>
      </div>
    </footer>
  );
};
