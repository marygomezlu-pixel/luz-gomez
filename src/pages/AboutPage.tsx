import React from 'react';
import { Award, Gem, HeartHandshake, ShieldCheck } from 'lucide-react';
import { JewelryImage } from '../components/JewelryImage';
import { STORE_CONFIG } from '../config/storeConfig';
import { IMAGES } from '../data/products';
import { PageRoute } from '../types/store';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
            Nuestra Historia · Luz Gomez Joyería
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#2A151D] leading-tight">
            Más que joyería, creamos tesoros que acompañan toda una vida
          </h1>
          <p className="text-base text-[#6E4B57] leading-relaxed">
            {STORE_CONFIG.brandFullName} nació con el propósito de acercar la alta joyería contemporánea a quienes buscan celebrar el amor, la gratitud y los logros familiares con piezas auténticas y atemporales.
          </p>
          <p className="text-base text-[#6E4B57] leading-relaxed">
            Trabajamos exclusivamente con oro de 18 quilates certificado, plata peruana ley 925 y gemas seleccionadas a mano, ofreciendo además un servicio boutique de grabado láser personalizado para que cada pieza cuente una historia propia.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="px-6 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45]"
            >
              Explorar colección
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contacto')}
              className="px-6 py-3 bg-white border border-[#EAB8C9] text-[#2A151D] text-sm font-semibold rounded-lg hover:bg-[#FFF4F7]"
            >
              Contáctanos ahora
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#F3D5DF] bg-[#FFF4F7]">
            <JewelryImage
              src={IMAGES.giftSet}
              alt="Estuche de terciopelo y joyas seleccionadas de Luz Gomez Joyería"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#F3D5DF]">
        <div className="bg-white border border-[#F3D5DF] rounded-xl p-7">
          <Gem className="w-6 h-6 text-[#B8295B] mb-3" />
          <h2 className="text-xl font-semibold text-[#2A151D]">Pureza garantizada</h2>
          <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
            Cada joya en oro 18k y plata 925 pasa por verificación de quilataje y lleva nuestro certificado oficial de autenticidad.
          </p>
        </div>

        <div className="bg-white border border-[#F3D5DF] rounded-xl p-7">
          <HeartHandshake className="w-6 h-6 text-[#B8295B] mb-3" />
          <h2 className="text-xl font-semibold text-[#2A151D]">Asesoría cercana</h2>
          <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
            Te acompañamos paso a paso para elegir la talla exacta de tu anillo de compromiso o el mensaje ideal para grabar.
          </p>
        </div>

        <div className="bg-white border border-[#F3D5DF] rounded-xl p-7">
          <ShieldCheck className="w-6 h-6 text-[#B8295B] mb-3" />
          <h2 className="text-xl font-semibold text-[#2A151D]">Respaldo postventa</h2>
          <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
            Ofrecemos limpieza profesional, ajuste inicial de tallas y envíos protegidos a todo el Perú.
          </p>
        </div>
      </div>

      <div className="bg-[#FFF4F7] border border-[#F3D5DF] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Award className="w-8 h-8 text-[#C78A47] shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-[#2A151D]">
              ¿Buscas una joya a medida para una fecha especial?
            </h3>
            <p className="text-sm text-[#6E4B57]">
              Nuestro taller de personalizados prepara grabados listos en 24 a 48 horas.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('personalizados')}
          className="px-6 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] whitespace-nowrap"
        >
          Ir a personalizados
        </button>
      </div>
    </div>
  );
};
