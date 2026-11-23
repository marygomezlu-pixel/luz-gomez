import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { JewelryImage } from '../components/JewelryImage';
import { ProductGrid } from '../components/ProductGrid';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/formatters';

interface ProductDetailPageProps {
  product: Product;
  onBackToShop: () => void;
  onGoToCheckout: () => void;
  onViewProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToShop,
  onGoToCheckout,
  onViewProduct,
}) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Única');
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || 'Única');
    setQuantity(1);
    setEngravingText('');
    setDeliveryDate('');
  }, [product]);

  const favored = isFavorite(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.material === product.material)
  ).slice(0, 3);

  const handleAdd = (goCheckout = false) => {
    const customization =
      product.customizable && (engravingText.trim() || deliveryDate)
        ? {
            engravingText: engravingText.trim() || undefined,
            deliveryDate: deliveryDate || undefined,
          }
        : undefined;

    addToCart(product, quantity, selectedSize, customization, !goCheckout);
    if (goCheckout) {
      onGoToCheckout();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <button
        type="button"
        onClick={onBackToShop}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6E4B57] hover:text-[#B8295B] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la tienda</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Galería de imágenes */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FFF4F7] border border-[#F3D5DF]">
            <JewelryImage src={activeImage} alt={product.name} className="w-full h-full" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                aria-label={`Ver imagen ${idx + 1} de ${product.name}`}
                className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all ${
                  activeImage === imgUrl
                    ? 'border-[#B8295B] ring-2 ring-[#B8295B]/25'
                    : 'border-[#F3D5DF] opacity-80 hover:opacity-100'
                }`}
              >
                <JewelryImage src={imgUrl} alt={`${product.name} vista ${idx + 1}`} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Módulo de compra */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E4B57]">
              {product.category} · {product.material}
            </p>
            <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A151D]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#6E4B57]">
              <span className="inline-flex items-center gap-1 font-semibold text-[#2A151D]">
                <Star className="w-4 h-4 text-[#C78A47] fill-[#C78A47]" aria-hidden="true" />
                <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{product.reviews} reseñas de clientes</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#B8295B] font-medium tabular-nums">
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 pb-5 border-b border-[#F3D5DF]">
            <span className="text-3xl font-bold text-[#2A151D] tabular-nums">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-[#6E4B57] line-through tabular-nums">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-xs font-semibold text-[#B8295B] tabular-nums">
                Ahorra {product.discount}%
              </span>
            )}
          </div>

          <div className="space-y-3 text-sm text-[#6E4B57] leading-relaxed">
            <p>{product.description}</p>
            <p>
              <strong className="text-[#2A151D]">Cuidados recomendados:</strong> {product.care}
            </p>
          </div>

          {/* Tallas / Opciones */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2.5">
              Talla de anillo o longitud de cadena
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    selectedSize === size
                      ? 'bg-[#B8295B] text-white border-[#B8295B]'
                      : 'bg-white text-[#2A151D] border-[#F3D5DF] hover:border-[#B8295B]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Personalización / Grabado */}
          {product.customizable && (
            <div className="bg-[#FFF4F7] border border-[#F3D5DF] rounded-xl p-5 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[#2A151D]">Personaliza tu joya</h2>
                <p className="text-xs text-[#6E4B57] mt-0.5">
                  Servicio de grabado láser incluido sin costo adicional.
                </p>
              </div>

              <div>
                <label
                  htmlFor="engraving-input"
                  className="block text-xs font-medium text-[#2A151D] mb-1.5"
                >
                  Escribe el nombre, fecha o iniciales a grabar (Máx 15 caracteres)
                </label>
                <input
                  id="engraving-input"
                  type="text"
                  maxLength={15}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="Ej. 14/02/2027 o M & C"
                  className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
                />
                <p className="text-xs text-[#6E4B57] mt-1 text-right tabular-nums">
                  {engravingText.length}/15 caracteres
                </p>
              </div>

              <div>
                <label
                  htmlFor="delivery-date-input"
                  className="block text-xs font-medium text-[#2A151D] mb-1.5"
                >
                  Fecha de entrega deseada
                </label>
                <input
                  id="delivery-date-input"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-white border border-[#F3D5DF] rounded-lg px-3.5 py-2.5 text-sm text-[#2A151D]"
                />
              </div>
            </div>
          )}

          {/* Cantidad y Botones */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-[#F3D5DF] rounded-lg bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="p-3 text-[#2A151D] hover:text-[#B8295B]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Aumentar cantidad"
                  className="p-3 text-[#2A151D] hover:text-[#B8295B]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={() => handleAdd(false)}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al carrito</span>
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(product.id, product.name)}
                aria-label={favored ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                className={`p-3.5 rounded-lg border transition-colors ${
                  favored
                    ? 'bg-[#FCE6EE] border-[#B8295B] text-[#B8295B]'
                    : 'bg-white border-[#F3D5DF] text-[#2A151D] hover:border-[#B8295B]'
                }`}
              >
                <Heart className="w-5 h-5" fill={favored ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={() => handleAdd(true)}
                className="px-5 py-3 bg-[#2A151D] text-white text-sm font-semibold rounded-lg hover:bg-[#462532] transition-colors"
              >
                Comprar ahora
              </button>

              <WhatsAppButton
                payload={{
                  productName: product.name,
                  size: selectedSize,
                  quantity,
                  price: product.price * quantity,
                  engraving: engravingText,
                  deliveryDate,
                }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#F3D5DF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#6E4B57]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B8295B] shrink-0" />
              <span>Certificado incluido</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#B8295B] shrink-0" />
              <span>Envíos a todo el Perú</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B8295B] shrink-0" />
              <span>Estuche de lujo gratis</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#F3D5DF]">
          <h2 className="font-serif-display text-3xl font-semibold text-[#2A151D] mb-8">
            También te puede enamorar
          </h2>
          <ProductGrid products={relatedProducts} onViewProduct={onViewProduct} />
        </section>
      )}
    </div>
  );
};
