import React from 'react';
import { Gem } from 'lucide-react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onResetFilters?: () => void;
  columnsClass?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onViewProduct,
  onQuickView,
  onResetFilters,
  columnsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-[#F3D5DF] rounded-xl p-10 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#FCE6EE] text-[#B8295B] flex items-center justify-center mb-4">
          <Gem className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-[#2A151D]">
          No encontramos joyas con esos filtros
        </h3>
        <p className="mt-2 text-sm text-[#6E4B57] max-w-md">
          Intenta ampliar el rango de precio o restablecer las categorías seleccionadas para ver toda nuestra colección.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 px-5 py-2.5 bg-[#B8295B] text-white text-sm font-medium rounded-lg hover:bg-[#911C45] transition-colors"
          >
            Mostrar todas las joyas
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`grid ${columnsClass} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewProduct={onViewProduct}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
