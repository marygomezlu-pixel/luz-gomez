import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/formatters';
import { JewelryImage } from './JewelryImage';
import { Modal } from './Modal';

interface FavoritesModalProps {
  onViewProduct: (product: Product) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({ onViewProduct }) => {
  const { favorites, isFavoritesOpen, setIsFavoritesOpen, toggleFavorite, addToCart } = useCart();
  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <Modal
      isOpen={isFavoritesOpen}
      onClose={() => setIsFavoritesOpen(false)}
      title={`Tus joyas favoritas (${favoriteProducts.length})`}
    >
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-base font-medium text-[#2A151D]">Aún no tienes joyas guardadas</p>
          <p className="mt-1 text-sm text-[#6E4B57]">
            Presiona el corazón en cualquier joya para guardarla aquí y compararla después.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#F3D5DF] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FFF4F7] shrink-0">
                <JewelryImage src={product.image} alt={product.name} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#6E4B57] uppercase tracking-wider">
                  {product.category} · {product.material}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsFavoritesOpen(false);
                    onViewProduct(product);
                  }}
                  className="text-base font-semibold text-[#2A151D] hover:text-[#B8295B] text-left mt-0.5"
                >
                  {product.name}
                </button>
                <p className="text-sm font-bold text-[#2A151D] tabular-nums mt-1">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, 1, product.sizes[0], undefined, false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#B8295B] text-white text-xs font-semibold rounded-lg hover:bg-[#911C45]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Agregar al carrito</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id, product.name)}
                  aria-label={`Quitar ${product.name} de favoritos`}
                  className="p-2 text-[#6E4B57] hover:text-red-700 border border-[#F3D5DF] rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};
