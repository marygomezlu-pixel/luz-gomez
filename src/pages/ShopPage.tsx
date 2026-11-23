import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { Filters } from '../components/Filters';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState, Product, ProductCategory } from '../types/store';

interface ShopPageProps {
  mode: 'tienda' | 'categorias' | 'ofertas';
  filters: FilterState;
  onUpdateFilters: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onViewProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  mode,
  filters,
  onUpdateFilters,
  onResetFilters,
  onViewProduct,
  onQuickView,
  onSelectCategory,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (mode === 'ofertas' && !(product.discount && product.discount > 0)) {
        return false;
      }
      if (filters.offersOnly && !(product.discount && product.discount > 0)) {
        return false;
      }
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }
      if (filters.category !== 'Todas') {
        const matchesPrimary = product.category === filters.category;
        const matchesSecondary = product.secondaryCategories?.includes(filters.category);
        if (!matchesPrimary && !matchesSecondary) return false;
      }
      if (filters.material !== 'Todos' && product.material !== filters.material) {
        return false;
      }
      if (filters.size !== 'Todas' && !product.sizes.includes(filters.size)) {
        return false;
      }
      if (product.price > filters.maxPrice) {
        return false;
      }
      if (product.rating < filters.minRating) {
        return false;
      }
      if (query) {
        const haystack = `${product.name} ${product.category} ${product.material} ${product.description}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'best-sellers':
          return b.salesCount - a.salesCount;
        case 'top-rated':
          return b.rating - a.rating || b.reviews - a.reviews;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [filters, mode]);

  const pageTitle =
    mode === 'ofertas'
      ? 'Ofertas especiales'
      : mode === 'categorias'
      ? 'Nuestras categorías'
      : 'Catálogo de joyas';

  const pageSubtitle =
    mode === 'ofertas'
      ? 'Piezas seleccionadas con descuentos exclusivos por tiempo limitado.'
      : mode === 'categorias'
      ? 'Explora por estilo, metal precioso u ocasión especial.'
      : 'Filtra por categoría, material, talla, precio o valoración para encontrar tu pieza ideal.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-8 border-b border-[#F3D5DF] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
            Luz Gomez Joyería
          </p>
          <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#6E4B57] max-w-2xl">{pageSubtitle}</p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <SearchBar
            value={filters.search}
            onChange={(search) => onUpdateFilters({ search })}
            placeholder="Buscar joyas..."
            className="flex-1 lg:w-80"
          />
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F3D5DF] rounded-lg text-sm font-medium text-[#2A151D]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B8295B]" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {mode === 'categorias' && (
        <section className="py-10 border-b border-[#F3D5DF]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} onSelect={onSelectCategory} />
            ))}
          </div>
        </section>
      )}

      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-3 sticky top-28">
          <Filters
            filters={filters}
            availableSizes={availableSizes}
            onChange={onUpdateFilters}
            onReset={onResetFilters}
            totalResults={filteredProducts.length}
          />
        </div>

        <div className="lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#6E4B57] tabular-nums">
              <strong className="text-[#2A151D]">{filteredProducts.length}</strong> joyas encontradas
              {filters.category !== 'Todas' && (
                <span>
                  {' '}
                  en <strong className="text-[#B8295B]">{filters.category}</strong>
                </span>
              )}
            </p>

            {(filters.category !== 'Todas' ||
              filters.material !== 'Todos' ||
              filters.size !== 'Todas' ||
              filters.search ||
              filters.offersOnly ||
              filters.minRating > 0 ||
              filters.maxPrice < 1500) && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs font-semibold text-[#B8295B] hover:underline"
              >
                Restablecer todos los filtros
              </button>
            )}
          </div>

          <ProductGrid
            products={filteredProducts}
            onViewProduct={onViewProduct}
            onQuickView={onQuickView}
            onResetFilters={onResetFilters}
          />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-[#2A151D]/45"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-80 max-w-[90vw] bg-[#FFFDFB] h-full overflow-y-auto p-5 z-10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2A151D]">Filtros</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Cerrar filtros"
                className="p-2 text-[#6E4B57]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Filters
              filters={filters}
              availableSizes={availableSizes}
              onChange={onUpdateFilters}
              onReset={onResetFilters}
              totalResults={filteredProducts.length}
            />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-4 w-full py-3 bg-[#B8295B] text-white text-sm font-semibold rounded-lg"
            >
              Ver {filteredProducts.length} resultados
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
