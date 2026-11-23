import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types/store';

interface HeaderProps {
  currentRoute: PageRoute;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: Array<{ route: PageRoute; label: string }> = [
  { route: 'inicio', label: 'Inicio' },
  { route: 'tienda', label: 'Tienda' },
  { route: 'categorias', label: 'Categorías' },
  { route: 'personalizados', label: 'Personalizados' },
  { route: 'ofertas', label: 'Ofertas' },
  { route: 'nosotros', label: 'Nosotros' },
  { route: 'contacto', label: 'Contacto' },
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
}) => {
  const {
    totalItems,
    favorites,
    socialConfig,
    setIsCartOpen,
    setIsFavoritesOpen,
    setIsAccountOpen,
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setMobileSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#F3D5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-18 flex items-center justify-between gap-4 lg:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú de navegación"
                className="lg:hidden p-2 -ml-2 text-[#2A151D] hover:text-[#B8295B] rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('inicio')}
                className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="16" cy="16" r="14.5" stroke="#B8295B" strokeWidth="1.25" />
                  <path
                    d="M16 7L21.5 14L16 25L10.5 14L16 7Z"
                    stroke="#C78A47"
                    strokeWidth="1.4"
                    fill="#FCE6EE"
                  />
                  <path d="M10.5 14H21.5" stroke="#B8295B" strokeWidth="1.2" />
                </svg>
                <span className="font-serif-display text-2xl font-semibold tracking-tight text-[#2A151D] group-hover:text-[#B8295B] transition-colors">
                  {STORE_CONFIG.brandName}
                </span>
              </button>
            </div>

            <form
              onSubmit={handleSearchFormSubmit}
              className="hidden md:flex flex-1 max-w-md relative"
              role="search"
            >
              <Search
                className="w-4 h-4 text-[#6E4B57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="¿Qué estás buscando?"
                aria-label="¿Qué estás buscando?"
                className="w-full bg-white border border-[#F3D5DF] rounded-lg pl-10 pr-4 py-2 text-sm text-[#2A151D] placeholder:text-[#6E4B57]/75 focus:border-[#B8295B] transition-colors"
              />
            </form>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Buscar joyas"
                className="md:hidden p-2.5 text-[#2A151D] hover:text-[#B8295B] rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                aria-label="Mi cuenta, WhatsApp y redes"
                className="p-2.5 text-[#2A151D] hover:text-[#B8295B] rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsFavoritesOpen(true)}
                aria-label={`Favoritos (${favorites.length})`}
                className="relative p-2.5 text-[#2A151D] hover:text-[#B8295B] rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C78A47] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito de compras (${totalItems} productos)`}
                className="relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#2A151D] hover:text-[#B8295B] bg-white border border-[#F3D5DF] rounded-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#B8295B]" aria-hidden="true" />
                <span className="hidden sm:inline whitespace-nowrap">Bolsa</span>
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#B8295B] text-white text-xs font-semibold flex items-center justify-center tabular-nums">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          <nav
            aria-label="Menú principal"
            className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-[#F3D5DF]/60"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-[#B8295B] border-[#B8295B]'
                      : 'text-[#6E4B57] border-transparent hover:text-[#2A151D] hover:border-[#EAB8C9]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {mobileSearchOpen && (
            <form onSubmit={handleSearchFormSubmit} className="md:hidden pb-3 pt-1" role="search">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#6E4B57] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  autoFocus
                  className="w-full bg-white border border-[#F3D5DF] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#2A151D]"
                />
              </div>
            </form>
          )}
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#2A151D]/45"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            aria-label="Menú móvil"
            className="relative w-72 max-w-[85vw] bg-[#FFFDFB] h-full shadow-xl border-r border-[#F3D5DF] flex flex-col justify-between p-6 z-10 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F3D5DF]">
                <span className="font-serif-display text-2xl font-semibold text-[#2A151D]">
                  {STORE_CONFIG.brandName}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 text-[#6E4B57] hover:text-[#2A151D] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="mt-5 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <li key={item.route}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.route)}
                        className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-[#FCE6EE] text-[#B8295B]'
                            : 'text-[#2A151D] hover:bg-[#FFF4F7]'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-6 border-t border-[#F3D5DF] space-y-2 text-xs text-[#6E4B57]">
              <p>{STORE_CONFIG.location.fullAddress}</p>
              <p>{socialConfig.whatsappDisplay}</p>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="text-[#B8295B] font-semibold hover:underline"
              >
                Conectar mi WhatsApp y Redes
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
