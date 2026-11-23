import React, { useState } from 'react';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';
import { JewelryImage } from '../components/JewelryImage';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/formatters';

interface CustomJewelryPageProps {
  onViewProduct: (product: Product) => void;
}

const FONT_STYLES = [
  { id: 'Clásica Serif' as const, label: 'Clásica Serif', previewClass: 'font-serif-display' },
  { id: 'Caligrafía Cursiva' as const, label: 'Caligrafía Cursiva', previewClass: 'font-serif-display italic' },
  { id: 'Moderna Sans' as const, label: 'Moderna Sans', previewClass: 'font-sans tracking-widest uppercase' },
];

const MATERIAL_TONES = ['Oro Rosa 18k', 'Oro Amarillo 18k', 'Plata 925'];

export const CustomJewelryPage: React.FC<CustomJewelryPageProps> = ({ onViewProduct }) => {
  const { addToCart, showToast } = useCart();
  const customizableProducts = PRODUCTS.filter((p) => p.customizable);

  const [selectedProduct, setSelectedProduct] = useState<Product>(
    customizableProducts.find((p) => p.id === 6) || customizableProducts[0]
  );
  const [engravingText, setEngravingText] = useState('Luz & Mateo');
  const [fontStyle, setFontStyle] = useState<'Clásica Serif' | 'Caligrafía Cursiva' | 'Moderna Sans'>('Clásica Serif');
  const [materialTone, setMaterialTone] = useState(MATERIAL_TONES[1]);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Única');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || 'Única');
  };

  const handleRequestCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!engravingText.trim()) {
      setError('Escribe el nombre, iniciales o fecha que deseas grabar.');
      return;
    }
    setError(null);
    addToCart(selectedProduct, 1, selectedSize, {
      engravingText: engravingText.trim(),
      fontStyle,
      materialTone,
      deliveryDate: deliveryDate || undefined,
    });
    showToast('Personalización agregada a tu bolsa', 'success');
  };

  const activeFontPreview =
    FONT_STYLES.find((f) => f.id === fontStyle)?.previewClass || 'font-serif-display';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
          Taller de Grabado Láser · Luz Gomez
        </p>
        <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Joyas Personalizadas
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#6E4B57]">
          Haz que tu joya sea única con un grabado especial. Elige tu pieza favorita entre dijes, esclavas y anillos, selecciona la tipografía y visualiza el resultado al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Vista previa interactiva */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white border border-[#F3D5DF] rounded-2xl p-6 space-y-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF4F7] relative">
              <JewelryImage
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full"
              />
            </div>

            <div className="bg-[#FFF4F7] border border-[#F3D5DF] rounded-xl p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-[#6E4B57] mb-2">
                Vista previa de grabado ({materialTone})
              </p>
              <div className="py-4 px-6 bg-white border border-[#EAB8C9] rounded-lg inline-block min-w-[220px]">
                <span className={`text-2xl text-[#B8295B] ${activeFontPreview}`}>
                  {engravingText.trim() || 'Tu grabado aquí'}
                </span>
              </div>
              <p className="text-xs text-[#6E4B57] mt-2">
                Tipografía: {fontStyle} · Medida: {selectedSize}
              </p>
            </div>
          </div>
        </div>

        {/* Configurador */}
        <form
          onSubmit={handleRequestCustomization}
          className="lg:col-span-6 bg-white border border-[#F3D5DF] rounded-2xl p-6 sm:p-8 space-y-6"
        >
          <div>
            <label htmlFor="custom-piece" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
              1. Elige la joya base
            </label>
            <select
              id="custom-piece"
              value={selectedProduct.id}
              onChange={(e) => {
                const found = customizableProducts.find((p) => p.id === Number(e.target.value));
                if (found) handleSelectProduct(found);
              }}
              className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-4 py-3 text-sm font-medium text-[#2A151D]"
            >
              {customizableProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {formatCurrency(item.price)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="custom-text" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
              2. Nombre / Iniciales o fecha a grabar (Máx. 15 caracteres)
            </label>
            <input
              id="custom-text"
              type="text"
              maxLength={15}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="Ej. Valeria o 14.02.2027"
              className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-4 py-3 text-sm text-[#2A151D]"
            />
            {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
              3. Tipo de letra
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {FONT_STYLES.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => setFontStyle(font.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    fontStyle === font.id
                      ? 'border-[#B8295B] bg-[#FCE6EE]/50 text-[#B8295B]'
                      : 'border-[#F3D5DF] bg-[#FFFDFB] text-[#2A151D]'
                  }`}
                >
                  <p className={`text-base ${font.previewClass}`}>Abc</p>
                  <p className="text-xs font-medium mt-0.5">{font.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
                4. Color de material
              </span>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_TONES.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setMaterialTone(tone)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      materialTone === tone
                        ? 'bg-[#B8295B] text-white border-[#B8295B]'
                        : 'bg-[#FFFDFB] text-[#2A151D] border-[#F3D5DF]'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="custom-size" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
                Talla / Longitud
              </label>
              <select
                id="custom-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm"
              >
                {selectedProduct.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="custom-date" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
              5. Fecha de entrega deseada
            </label>
            <input
              id="custom-date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          <div className="pt-2 space-y-3 border-t border-[#F3D5DF]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E4B57]">Precio total (incluye grabado)</span>
              <span className="text-2xl font-bold text-[#2A151D] tabular-nums">
                {formatCurrency(selectedProduct.price)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Solicitar personalización</span>
            </button>

            <WhatsAppButton
              payload={{
                productName: `${selectedProduct.name} (${materialTone}, ${fontStyle})`,
                size: selectedSize,
                quantity: 1,
                price: selectedProduct.price,
                engraving: engravingText,
                deliveryDate,
              }}
              label="Consultar diseño por WhatsApp"
              className="w-full"
            />
          </div>
        </form>
      </div>

      {/* Catálogo rápido de piezas grabables */}
      <section className="pt-10 border-t border-[#F3D5DF]">
        <h2 className="font-serif-display text-3xl font-semibold text-[#2A151D] mb-6">
          Piezas disponibles para grabado
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {customizableProducts.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#F3D5DF] rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#FFF4F7] mb-3 group">
                  <JewelryImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="text-xs text-[#6E4B57]">{item.material}</p>
                <h3 className="text-base font-semibold text-[#2A151D] mt-0.5">{item.name}</h3>
                <p className="text-sm font-bold text-[#2A151D] tabular-nums mt-1">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => addToCart(item, 1, item.sizes[0])}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#B8295B] text-white text-xs font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Agregar al carrito</span>
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectProduct(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-2 bg-[#FFF4F7] text-[#B8295B] text-xs font-semibold rounded-lg hover:bg-[#FCE6EE]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Personalizar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onViewProduct(item)}
                    className="px-3 py-2 border border-[#F3D5DF] text-xs font-medium rounded-lg hover:border-[#B8295B]"
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
