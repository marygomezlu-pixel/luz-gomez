import React from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { FilterState, MaterialType, ProductCategory, SortOption } from '../types/store';
import { formatCurrency } from '../utils/formatters';

interface FiltersProps {
  filters: FilterState;
  availableSizes: string[];
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const MATERIALS: Array<MaterialType | 'Todos'> = [
  'Todos',
  'Oro Amarillo 18k',
  'Oro Blanco 18k',
  'Oro Rosa 18k',
  'Plata 925',
  'Acero Quirúrgico',
  'Diamantes y Zirconias',
];

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'best-sellers', label: 'Más vendidos' },
  { value: 'top-rated', label: 'Mejor valorados' },
  { value: 'price-asc', label: 'Precio menor a mayor' },
  { value: 'price-desc', label: 'Precio mayor a menor' },
];

export const Filters: React.FC<FiltersProps> = ({
  filters,
  availableSizes,
  onChange,
  onReset,
  totalResults,
}) => {
  return (
    <aside
      aria-label="Filtros de catálogo"
      className="bg-white border border-[#F3D5DF] rounded-xl p-5 space-y-6"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#F3D5DF]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#B8295B]" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-[#2A151D]">Filtrar joyas</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#B8295B] hover:text-[#911C45]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Limpiar</span>
        </button>
      </div>

      <div>
        <label htmlFor="sort-select" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          Ordenar por
        </label>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as SortOption })}
          className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3 py-2.5 text-sm text-[#2A151D]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          Categoría
        </label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value as ProductCategory | 'Todas' })}
          className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3 py-2.5 text-sm text-[#2A151D]"
        >
          <option value="Todas">Todas las categorías</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="material-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          Material
        </label>
        <select
          id="material-filter"
          value={filters.material}
          onChange={(e) => onChange({ material: e.target.value as MaterialType | 'Todos' })}
          className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3 py-2.5 text-sm text-[#2A151D]"
        >
          {MATERIALS.map((mat) => (
            <option key={mat} value={mat}>
              {mat === 'Todos' ? 'Todos los materiales' : mat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          Talla / Medida
        </label>
        <select
          id="size-filter"
          value={filters.size}
          onChange={(e) => onChange({ size: e.target.value })}
          className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3 py-2.5 text-sm text-[#2A151D]"
        >
          <option value="Todas">Todas las tallas</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          <label htmlFor="price-range">Precio máximo</label>
          <span className="text-[#2A151D] tabular-nums">{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          id="price-range"
          type="range"
          min={150}
          max={1500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#B8295B]"
        />
        <div className="flex justify-between text-xs text-[#6E4B57] mt-1 tabular-nums">
          <span>S/ 150</span>
          <span>S/ 1,500</span>
        </div>
      </div>

      <div>
        <label htmlFor="rating-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#6E4B57] mb-2">
          Valoración mínima
        </label>
        <select
          id="rating-filter"
          value={filters.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
          className="w-full bg-[#FFFDFB] border border-[#F3D5DF] rounded-lg px-3 py-2.5 text-sm text-[#2A151D]"
        >
          <option value={0}>Todas las valoraciones</option>
          <option value={4.5}>4.5 estrellas o más</option>
          <option value={4.8}>4.8 estrellas o más</option>
          <option value={4.9}>4.9 estrellas o más</option>
        </select>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-[#F3D5DF]">
        <label className="flex items-center gap-2.5 text-sm text-[#2A151D] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded accent-[#B8295B]"
          />
          <span>Solo disponibles en stock</span>
        </label>

        <label className="flex items-center gap-2.5 text-sm text-[#2A151D] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.offersOnly}
            onChange={(e) => onChange({ offersOnly: e.target.checked })}
            className="w-4 h-4 rounded accent-[#B8295B]"
          />
          <span>Solo ofertas especiales</span>
        </label>
      </div>

      <p className="text-xs text-[#6E4B57] pt-2 border-t border-[#F3D5DF] tabular-nums">
        Mostrando <strong className="text-[#2A151D]">{totalResults}</strong> joyas
      </p>
    </aside>
  );
};
