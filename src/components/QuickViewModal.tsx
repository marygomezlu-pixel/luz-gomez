import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/formatters';
import { JewelryImage } from './JewelryImage';
import { Modal } from './Modal';
import { WhatsAppButton } from './WhatsAppButton';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetail,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Única');
    }
  }, [product]);

  if (!product) return null;

  return (
    <Modal isOpen={!!product} onClose={onClose} title="Vista rápida de joya" maxWidthClass="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF4F7] border border-[#F3D5DF]">
          <JewelryImage src={product.image} alt={product.name} className="w-full h-full" />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6E4B57]">
              {product.category} · {product.material}
            </p>
            <h3 className="text-2xl font-semibold text-[#2A151D] mt-1">{product.name}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6E4B57]">
              <Star className="w-3.5 h-3.5 text-[#C78A47] fill-[#C78A47]" />
              <span className="font-semibold text-[#2A151D] tabular-nums">{product.rating.toFixed(1)}</span>
              <span>·</span>
              <span className="tabular-nums">{product.reviews} reseñas</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#2A151D] tabular-nums">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-[#6E4B57] line-through tabular-nums">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-sm text-[#6E4B57] leading-relaxed">{product.description}</p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
              Talla / Medida
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
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

          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                addToCart(product, 1, selectedSize);
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg hover:bg-[#911C45] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar al carrito</span>
            </button>

            <WhatsAppButton
              payload={{
                productName: product.name,
                size: selectedSize,
                quantity: 1,
                price: product.price,
              }}
              className="w-full"
            />

            <button
              type="button"
              onClick={() => {
                onClose();
                onViewFullDetail(product);
              }}
              className="w-full text-center text-xs font-semibold text-[#B8295B] hover:underline pt-1"
            >
              Ver ficha completa y opciones de grabado
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
