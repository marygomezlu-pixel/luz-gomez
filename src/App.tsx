import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AccountModal } from './components/AccountModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastNotification } from './components/ToastNotification';
import { CartProvider } from './context/CartContext';
import { buildWhatsAppGenericUrl } from './utils/formatters';
import { PRODUCTS } from './data/products';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { CustomJewelryPage } from './pages/CustomJewelryPage';
import { HomePage } from './pages/HomePage';
import { InfoPages } from './pages/InfoPages';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';
import { FilterState, PageRoute, Product, ProductCategory } from './types/store';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'Todas',
  material: 'Todos',
  size: 'Todas',
  maxPrice: 1500,
  minRating: 0,
  inStockOnly: false,
  offersOnly: false,
  sortBy: 'recent',
};

function StorefrontShell() {
  const [route, setRoute] = useState<PageRoute>('inicio');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Sincronización amigable con hash URL para navegación del navegador
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;
      if (hash.startsWith('producto/')) {
        const slug = hash.replace('producto/', '');
        const found = PRODUCTS.find((p) => p.slug === slug);
        if (found) {
          setSelectedProduct(found);
          setRoute('producto');
          return;
        }
      }
      const validRoutes: PageRoute[] = [
        'inicio',
        'tienda',
        'categorias',
        'carrito',
        'checkout',
        'nosotros',
        'personalizados',
        'ofertas',
        'blog',
        'contacto',
        'faq',
        'privacidad',
        'terminos',
        'guia-tallas',
        'cuidados',
        'envios',
      ];
      if (validRoutes.includes(hash as PageRoute)) {
        setRoute(hash as PageRoute);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigate = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    window.location.hash = nextRoute === 'inicio' ? '' : nextRoute;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setRoute('producto');
    window.location.hash = `producto/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: ProductCategory) => {
    setFilters({ ...DEFAULT_FILTERS, category });
    navigate('tienda');
  };

  const handleHeaderSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleHeaderSearchSubmit = () => {
    navigate('tienda');
  };

  const handleUpdateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#2A151D]">
      <Header
        currentRoute={route}
        searchQuery={filters.search}
        onSearchChange={handleHeaderSearchChange}
        onSearchSubmit={handleHeaderSearchSubmit}
        onNavigate={navigate}
      />

      <main className="flex-1">
        {route === 'inicio' && (
          <HomePage
            onNavigate={navigate}
            onSelectCategory={handleSelectCategory}
            onViewProduct={handleViewProduct}
            onQuickView={setQuickViewProduct}
          />
        )}

        {(route === 'tienda' || route === 'categorias' || route === 'ofertas') && (
          <ShopPage
            mode={route}
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
            onViewProduct={handleViewProduct}
            onQuickView={setQuickViewProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {route === 'producto' && (
          <ProductDetailPage
            product={selectedProduct}
            onBackToShop={() => navigate('tienda')}
            onGoToCheckout={() => navigate('checkout')}
            onViewProduct={handleViewProduct}
          />
        )}

        {route === 'carrito' && <CartPage onNavigate={navigate} />}
        {route === 'checkout' && <CheckoutPage onNavigate={navigate} />}
        {route === 'personalizados' && (
          <CustomJewelryPage onViewProduct={handleViewProduct} />
        )}
        {route === 'nosotros' && <AboutPage onNavigate={navigate} />}
        {route === 'blog' && <BlogPage />}
        {route === 'contacto' && <ContactPage />}

        {(route === 'faq' ||
          route === 'privacidad' ||
          route === 'terminos' ||
          route === 'guia-tallas' ||
          route === 'cuidados' ||
          route === 'envios') && <InfoPages route={route} />}
      </main>

      <Footer onNavigate={navigate} />

      <CartDrawer onNavigate={navigate} />
      <FavoritesModal onViewProduct={handleViewProduct} />
      <AccountModal />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetail={handleViewProduct}
      />
      <a
        href={buildWhatsAppGenericUrl('Hola Luz Gomez Joyería, quisiera asesoría para elegir una joya.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Luz Gomez"
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 bg-[#2A151D] text-white text-xs font-semibold rounded-full shadow-lg hover:bg-[#B8295B] transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-[#FCE6EE]" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StorefrontShell />
    </CartProvider>
  );
}
