import React from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/formatters';
import { JewelryImage } from './JewelryImage';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onQuickView,
}) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favored = isFavorite(product.id);
  const outOfStock = product.stock <= 0;

  const secondaryImage = product.gallery && product.gallery.length > 1 ? product.gallery[1] : null;

  return (
    <article className="group bg-white border border-[#F3D5DF] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF4F7]">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="w-full h-full block text-left relative"
          aria-label={`Ver detalles de ${product.name}`}
        >
          <JewelryImage
            src={product.image}
            alt={product.name}
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {secondaryImage && (
            <JewelryImage
              src={secondaryImage}
              alt={`${product.name} detalle adicional`}
              className="w-full h-full absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </button>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(product.id, product.name)}
            aria-label={favored ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
            aria-pressed={favored}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
              favored
                ? 'bg-[#B8295B] text-white border-[#B8295B]'
                : 'bg-white/95 text-[#2A151D] border-[#F3D5DF] hover:border-[#B8295B] hover:text-[#B8295B]'
            }`}
          >
            <Heart className="w-4 h-4" fill={favored ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label={`Vista rápida de ${product.name}`}
              className="w-9 h-9 rounded-full bg-white/95 text-[#2A151D] border border-[#F3D5DF] hover:border-[#B8295B] hover:text-[#B8295B] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#FFFDFB]/95 border border-[#F3D5DF] px-2.5 py-1 rounded text-xs font-semibold text-[#B8295B] tabular-nums">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E4B57] uppercase tracking-wider">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.material}</span>
          </div>

          <h3 className="mt-1.5 text-lg font-semibold text-[#2A151D] leading-snug">
            <button
              type="button"
              onClick={() => onViewProduct(product)}
              className="text-left hover:text-[#B8295B] transition-colors line-clamp-2"
            >
              {product.name}
            </button>
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6E4B57]">
            <Star className="w-3.5 h-3.5 text-[#C78A47] fill-[#C78A47]" aria-hidden="true" />
            <span className="font-semibold text-[#2A151D] tabular-nums">{product.rating.toFixed(1)}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{product.reviews} reseñas</span>
            {product.customizable && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B8295B] font-medium">Grabable</span>
              </>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-[#F3D5DF]/70 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#2A151D] tabular-nums">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#6E4B57] line-through tabular-nums">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addToCart(product, 1, product.sizes[0])}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              outOfStock
                ? 'bg-[#F3D5DF] text-[#6E4B57] cursor-not-allowed'
                : 'bg-[#B8295B] text-white hover:bg-[#911C45]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{outOfStock ? 'Agotado' : 'Agregar al carrito'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
