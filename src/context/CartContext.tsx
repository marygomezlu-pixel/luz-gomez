import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { CartCustomization, CartItem, OrderRecord, Product } from '../types/store';
import { normalizeWhatsAppDigits } from '../utils/formatters';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface SocialChannelsConfig {
  whatsappDisplay: string;
  whatsappNumberRaw: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}

const DEFAULT_SOCIAL_CONFIG: SocialChannelsConfig = {
  whatsappDisplay: STORE_CONFIG.contact.whatsappDisplay,
  whatsappNumberRaw: STORE_CONFIG.contact.whatsappNumberRaw,
  instagram: STORE_CONFIG.social.instagram,
  facebook: STORE_CONFIG.social.facebook,
  tiktok: STORE_CONFIG.social.tiktok,
};

interface CartContextValue {
  cart: CartItem[];
  favorites: number[];
  orders: OrderRecord[];
  couponCode: string;
  appliedCoupon: { code: string; description: string; discountAmount: number } | null;
  couponError: string | null;
  isCartOpen: boolean;
  isFavoritesOpen: boolean;
  isAccountOpen: boolean;
  toast: ToastState | null;
  newsletterSubscribedEmail: string | null;
  socialConfig: SocialChannelsConfig;
  subtotal: number;
  shippingCost: number;
  totalItems: number;
  total: number;
  setIsCartOpen: (open: boolean) => void;
  setIsFavoritesOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  updateSocialConfig: (next: Partial<SocialChannelsConfig>) => void;
  resetSocialConfig: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    customization?: CartCustomization,
    openDrawer?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number, productName?: string) => void;
  isFavorite: (productId: number) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  calculateShipping: (deliveryType: 'domicilio' | 'recojo') => number;
  createOrder: (order: Omit<OrderRecord, 'id' | 'date' | 'status'>) => OrderRecord;
  subscribeNewsletter: (email: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'luz_gomez_cart_v1',
  favorites: 'luz_gomez_favorites_v1',
  orders: 'luz_gomez_orders_v1',
  coupon: 'luz_gomez_coupon_v1',
  newsletter: 'luz_gomez_newsletter_v1',
  social: 'luz_gomez_social_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage<CartItem[]>(STORAGE_KEYS.cart, []));
  const [favorites, setFavorites] = useState<number[]>(() =>
    readStorage<number[]>(STORAGE_KEYS.favorites, [])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage<OrderRecord[]>(STORAGE_KEYS.orders, [])
  );
  const [couponCode, setCouponCode] = useState<string>(() =>
    readStorage<string>(STORAGE_KEYS.coupon, '')
  );
  const [newsletterSubscribedEmail, setNewsletterSubscribedEmail] = useState<string | null>(() =>
    readStorage<string | null>(STORAGE_KEYS.newsletter, null)
  );
  const [socialConfig, setSocialConfig] = useState<SocialChannelsConfig>(() =>
    readStorage<SocialChannelsConfig>(STORAGE_KEYS.social, DEFAULT_SOCIAL_CONFIG)
  );
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Silenciar errores de cuota de almacenamiento
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    } catch {
      // Silenciar errores de cuota
    }
  }, [favorites]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // Silenciar errores de cuota
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.coupon, JSON.stringify(couponCode));
    } catch {
      // Silenciar errores de cuota
    }
  }, [couponCode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.social, JSON.stringify(socialConfig));
    } catch {
      // Silenciar errores de cuota
    }
  }, [socialConfig]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const dismissToast = () => setToast(null);

  const updateSocialConfig = (next: Partial<SocialChannelsConfig>) => {
    setSocialConfig((prev) => {
      const merged = { ...prev, ...next };
      if (next.whatsappDisplay !== undefined && next.whatsappNumberRaw === undefined) {
        merged.whatsappNumberRaw = normalizeWhatsAppDigits(next.whatsappDisplay);
      } else if (next.whatsappNumberRaw !== undefined) {
        merged.whatsappNumberRaw = normalizeWhatsAppDigits(next.whatsappNumberRaw);
      }
      return merged;
    });
    showToast('WhatsApp y redes sociales actualizados', 'success');
  };

  const resetSocialConfig = () => {
    setSocialConfig(DEFAULT_SOCIAL_CONFIG);
    showToast('Configuración de contacto restablecida', 'info');
  };

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const appliedCoupon = useMemo(() => {
    if (!couponCode || subtotal <= 0) return null;
    const found = STORE_CONFIG.coupons.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase()
    );
    if (!found) return null;
    const discountAmount =
      found.type === 'percentage'
        ? Number(((subtotal * found.value) / 100).toFixed(2))
        : Math.min(found.value, subtotal);
    return {
      code: found.code,
      description: found.description,
      discountAmount,
    };
  }, [couponCode, subtotal]);

  const calculateShipping = (deliveryType: 'domicilio' | 'recojo'): number => {
    if (cart.length === 0) return 0;
    if (deliveryType === 'recojo') return STORE_CONFIG.shipping.pickupCost;
    if (subtotal >= STORE_CONFIG.shipping.freeShippingThreshold) return 0;
    return STORE_CONFIG.shipping.standardCost;
  };

  const shippingCost = useMemo(() => calculateShipping('domicilio'), [subtotal, cart.length]);

  const total = useMemo(() => {
    const discount = appliedCoupon?.discountAmount ?? 0;
    return Math.max(0, Number((subtotal + shippingCost - discount).toFixed(2)));
  }, [subtotal, shippingCost, appliedCoupon]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    customization?: CartCustomization,
    openDrawer = true
  ) => {
    const resolvedSize = selectedSize || product.sizes[0] || 'Única';
    const customKey = customization
      ? `${customization.engravingText || ''}-${customization.fontStyle || ''}-${customization.materialTone || ''}-${customization.deliveryDate || ''}`
      : 'standard';
    const cartItemId = `${product.id}-${resolvedSize}-${customKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        const nextQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: nextQty } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity: Math.min(product.stock, Math.max(1, quantity)),
          selectedSize: resolvedSize,
          customization,
        },
      ];
    });

    showToast('Joya agregada al carrito', 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) return item;
        const clamped = Math.min(item.product.stock, Math.max(1, quantity));
        return { ...item, quantity: clamped };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponError(null);
  };

  const toggleFavorite = (productId: number, productName?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(
          productName ? `${productName} se quitó de favoritos` : 'Eliminado de favoritos',
          'info'
        );
        return prev.filter((id) => id !== productId);
      }
      showToast(
        productName ? `${productName} agregado a favoritos` : 'Agregado a favoritos',
        'success'
      );
      return [...prev, productId];
    });
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setCouponError('Ingresa un código de cupón válido.');
      return false;
    }
    const found = STORE_CONFIG.coupons.find((c) => c.code === normalized);
    if (!found) {
      setCouponError('El cupón ingresado no es válido o expiró.');
      return false;
    }
    setCouponCode(found.code);
    setCouponError(null);
    showToast(`Cupón ${found.code} aplicado`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(null);
    showToast('Cupón retirado', 'info');
  };

  /**
   * PENDIENTE DE CONEXIÓN AL BACKEND:
   * Este método debe enviar el pedido al endpoint POST /api/orders y procesar
   * la pasarela de pagos en el servidor antes de registrar la confirmación.
   */
  const createOrder = (orderInput: Omit<OrderRecord, 'id' | 'date' | 'status'>): OrderRecord => {
    const newOrder: OrderRecord = {
      ...orderInput,
      id: `LG-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: 'Confirmado',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const subscribeNewsletter = (email: string) => {
    setNewsletterSubscribedEmail(email);
    try {
      window.localStorage.setItem(STORAGE_KEYS.newsletter, JSON.stringify(email));
    } catch {
      // Silenciar error
    }
    showToast('Suscripción confirmada. ¡Bienvenida a Luz Gomez!', 'success');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        orders,
        couponCode,
        appliedCoupon,
        couponError,
        isCartOpen,
        isFavoritesOpen,
        isAccountOpen,
        toast,
        newsletterSubscribedEmail,
        socialConfig,
        subtotal,
        shippingCost,
        totalItems,
        total,
        setIsCartOpen,
        setIsFavoritesOpen,
        setIsAccountOpen,
        updateSocialConfig,
        resetSocialConfig,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        applyCoupon,
        removeCoupon,
        calculateShipping,
        createOrder,
        subscribeNewsletter,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe utilizarse dentro de CartProvider');
  }
  return ctx;
}
