import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gem,
  HeartHandshake,
  Instagram,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { JewelryImage } from '../components/JewelryImage';
import { ProductGrid } from '../components/ProductGrid';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { CATEGORIES, DEMO_TESTIMONIALS, IMAGES, PRODUCTS } from '../data/products';
import { PageRoute, Product, ProductCategory } from '../types/store';
import { buildWhatsAppGenericUrl } from '../utils/formatters';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onViewProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  onViewProduct,
  onQuickView,
}) => {
  const { newsletterSubscribedEmail, subscribeNewsletter } = useCart();
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      src: IMAGES.hero,
      alt: 'Colección de anillos de compromiso en oro 18k, collar rose gold y aretes de perla Luz Gomez',
      caption: 'Colección Oro 18k & Perlas',
    },
    {
      src: IMAGES.ringDiamond,
      alt: 'Anillo Diamante Eternidad en oro blanco 18k',
      caption: 'Anillos de Compromiso',
    },
    {
      src: IMAGES.necklaceRoseGold,
      alt: 'Collar Corazón en Oro Rosa 18k',
      caption: 'Oro Rosa & Cadenas Finas',
    },
    {
      src: IMAGES.giftSet,
      alt: 'Estuche de regalo de terciopelo Luz Gomez',
      caption: 'Sets de Regalo Exclusivos',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);
  const discountedProducts = PRODUCTS.filter((p) => (p.discount ?? 0) >= 15).slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setEmailError(null);
    subscribeNewsletter(trimmed);
    setEmailInput('');
  };

  return (
    <div>
      {/* Hero Principal */}
      <section className="bg-gradient-to-br from-[#FCE6EE] via-[#FFF7FA] to-[#FFFDFB] border-b border-[#F3D5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8295B]">
                Alta Joyería · Oro 18k y Plata 925
              </p>
              <h1 className="mt-4 font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#2A151D] leading-[1.08] text-balance">
                Joyas que convierten momentos en recuerdos
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#6E4B57] leading-relaxed max-w-xl">
                Encuentra la joya perfecta para sorprender a quienes más quieres. Piezas certificadas en oro 18k, plata 925 y grabados personalizados hechos a medida.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('tienda')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors whitespace-nowrap"
                >
                  <span>Ver colección</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('personalizados')}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#2A151D] border border-[#EAB8C9] text-sm font-semibold rounded-lg hover:bg-[#FCE6EE]/60 transition-colors whitespace-nowrap"
                >
                  Personalizar mi joya
                </button>
              </div>

              <div className="mt-10 pt-6 border-t border-[#F3D5DF] grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-lg font-semibold text-[#2A151D] tabular-nums">Oro 18k</p>
                  <p className="text-xs text-[#6E4B57] mt-0.5">Certificado ley 750</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#2A151D] tabular-nums">Plata 925</p>
                  <p className="text-xs text-[#6E4B57] mt-0.5">Acabado anti-deslustre</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#2A151D] tabular-nums">24–48 h</p>
                  <p className="text-xs text-[#6E4B57] mt-0.5">Grabado artesanal</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#F3D5DF] bg-[#FCE6EE] shadow-sm min-h-[320px] lg:min-h-[460px] group">
                {heroSlides.map((slide, index) => {
                  const active = index === heroSlide;
                  return (
                    <div
                      key={slide.src}
                      className={`absolute inset-0 transition-all duration-1000 ease-out ${
                        active
                          ? 'opacity-100 scale-105 z-10'
                          : 'opacity-0 scale-100 z-0 pointer-events-none'
                      }`}
                    >
                      <JewelryImage
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full"
                      />
                    </div>
                  );
                })}

                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#2A151D]/70 via-[#2A151D]/25 to-transparent p-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#FFFDFB]/90">
                      {heroSlides[heroSlide].caption}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                      }
                      aria-label="Imagen anterior"
                      className="w-8 h-8 rounded-full bg-white/90 text-[#2A151D] hover:bg-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      {heroSlides.map((slide, idx) => (
                        <button
                          key={slide.caption}
                          type="button"
                          onClick={() => setHeroSlide(idx)}
                          aria-label={`Ver ${slide.caption}`}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === heroSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/55'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                      aria-label="Imagen siguiente"
                      className="w-8 h-8 rounded-full bg-white/90 text-[#2A151D] hover:bg-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
              Colecciones Curadas
            </p>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
              Encuentra la joya perfecta
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('categorias')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8295B] hover:text-[#911C45]"
          >
            <span>Ver todas las categorías</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} onSelect={onSelectCategory} />
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="bg-[#FFF4F7]/70 border-y border-[#F3D5DF] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
                Selección Boutique
              </p>
              <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
                Nuestros favoritos
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8295B] hover:text-[#911C45]"
            >
              <span>Ir a la tienda completa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <ProductGrid
            products={featuredProducts}
            onViewProduct={onViewProduct}
            onQuickView={onQuickView}
          />
        </div>
      </section>

      {/* Promociones / Ofertas Especiales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-gradient-to-r from-[#FCE6EE] via-[#FFF4F7] to-[#FDF5EB] border border-[#EAB8C9] rounded-2xl p-6 sm:p-10 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8295B]">
              Solo por tiempo limitado
            </p>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
              Ofertas especiales · 20% OFF en joyería de Plata
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6E4B57] max-w-2xl">
              Aprovecha descuentos exclusivos en piezas seleccionadas de Plata 925 y sets de regalo. También puedes usar el cupón <strong className="text-[#2A151D]">LUZ10</strong> en tu bolsa.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ofertas')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Ver todas las ofertas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <ProductGrid
          products={discountedProducts}
          onViewProduct={onViewProduct}
          onQuickView={onQuickView}
        />
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-white border-y border-[#F3D5DF] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
              Nuestra Promesa
            </p>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
              Por qué elegirnos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl p-6">
              <div className="w-11 h-11 rounded-lg bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
                <Gem className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A151D]">Joyas exclusivas</h3>
              <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
                Piezas de alta calidad cuidadosamente seleccionadas en oro 18k, plata 925 y gemas brillantes.
              </p>
            </div>

            <div className="bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl p-6">
              <div className="w-11 h-11 rounded-lg bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A151D]">Entrega segura</h3>
              <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
                Enviamos tus joyas de forma discreta y protegida a todo el Perú.
              </p>
            </div>

            <div className="bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl p-6">
              <div className="w-11 h-11 rounded-lg bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A151D]">Atención personalizada</h3>
              <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
                Te asesoramos por WhatsApp o en tienda para elegir la talla, metal y grabado perfecto.
              </p>
            </div>

            <div className="bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl p-6">
              <div className="w-11 h-11 rounded-lg bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A151D]">Garantía y confianza</h3>
              <p className="mt-2 text-sm text-[#6E4B57] leading-relaxed">
                Certificado de autenticidad incluido en cada joya y métodos de pago protegidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios (Datos de demostración) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
            Experiencias Reales
          </p>
          <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_TESTIMONIALS.map((item) => (
            <blockquote
              key={item.id}
              className="bg-white border border-[#F3D5DF] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3" aria-label={`Valoración de ${item.rating} estrellas`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 text-[#C78A47] fill-[#C78A47]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#2A151D] leading-relaxed">“{item.quote}”</p>
              </div>
              <footer className="mt-5 pt-4 border-t border-[#F3D5DF]">
                <p className="text-sm font-semibold text-[#2A151D]">{item.author}</p>
                <p className="text-xs text-[#6E4B57]">
                  {item.city} · {item.purchasedItem}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Instagram / Redes Sociales */}
      <section className="bg-[#FFF4F7] border-t border-[#F3D5DF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8295B]">
                Comunidad Luz Gomez
              </p>
              <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
                Síguenos en Instagram
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={STORE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8295B] text-white text-xs font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Visitar Instagram</span>
              </a>
              <a
                href={STORE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white border border-[#F3D5DF] text-[#2A151D] text-xs font-semibold rounded-lg hover:border-[#B8295B]"
              >
                Facebook
              </a>
              <a
                href={STORE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white border border-[#F3D5DF] text-[#2A151D] text-xs font-semibold rounded-lg hover:border-[#B8295B]"
              >
                TikTok
              </a>
              <a
                href={buildWhatsAppGenericUrl('Hola Luz Gomez Joyería, los encontré desde su tienda online.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white border border-[#F3D5DF] text-[#2A151D] text-xs font-semibold rounded-lg hover:border-[#B8295B]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { src: IMAGES.ringDiamond, alt: 'Anillo diamante eternidad en Instagram' },
              { src: IMAGES.necklaceRoseGold, alt: 'Collar corazón oro rosa en Instagram' },
              { src: IMAGES.earringsPearl, alt: 'Aretes de perla natural en Instagram' },
              { src: IMAGES.braceletTennis, alt: 'Pulsera tenis plata 925 en Instagram' },
              { src: IMAGES.giftSet, alt: 'Estuche de regalo Luz Gomez en Instagram' },
              { src: IMAGES.engravedCustom, alt: 'Grabado personalizado de iniciales' },
            ].map((img, i) => (
              <a
                key={i}
                href={STORE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-square rounded-xl overflow-hidden border border-[#F3D5DF] bg-white"
              >
                <JewelryImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white border border-[#F3D5DF] rounded-2xl p-8 sm:p-12 text-center shadow-sm">
          <Award className="w-7 h-7 text-[#C78A47] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
            Recibe exclusivas y promociones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E4B57] max-w-lg mx-auto">
            Suscríbete y recibe novedades de nuestras nuevas colecciones y promociones VIP.
          </p>

          {newsletterSubscribedEmail ? (
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#FCE6EE] text-[#B8295B] rounded-lg text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                ¡Gracias! Confirmamos tu suscripción con el correo{' '}
                <strong>{newsletterSubscribedEmail}</strong>.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
              noValidate
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Tu correo electrónico"
                aria-label="Tu correo electrónico"
                required
                className="flex-1 bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-4 py-3 text-sm text-[#2A151D]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
          )}
          {emailError && <p className="mt-2 text-xs text-red-700">{emailError}</p>}
        </div>
      </section>
    </div>
  );
};
