import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryInfo, ProductCategory } from '../types/store';
import { JewelryImage } from './JewelryImage';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelect: (category: ProductCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className="group text-left bg-white border border-[#F3D5DF] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col h-full"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#FFF4F7]">
        <JewelryImage
          src={category.image}
          alt={`Categoría ${category.name} en Luz Gomez Joyería`}
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#2A151D] group-hover:text-[#B8295B] transition-colors">
            {category.name}
          </h3>
          <p className="mt-1.5 text-sm text-[#6E4B57] leading-relaxed">
            {category.description}
          </p>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B8295B]">
          <span>Explorar colección</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  );
};
