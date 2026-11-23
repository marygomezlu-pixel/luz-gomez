export type PageRoute =
  | 'inicio'
  | 'tienda'
  | 'categorias'
  | 'producto'
  | 'carrito'
  | 'checkout'
  | 'nosotros'
  | 'personalizados'
  | 'ofertas'
  | 'blog'
  | 'contacto'
  | 'faq'
  | 'privacidad'
  | 'terminos'
  | 'guia-tallas'
  | 'cuidados'
  | 'envios';

export type ProductCategory =
  | 'Anillos'
  | 'Collares'
  | 'Aretes'
  | 'Relojes'
  | 'Pulseras'
  | 'Sets de Regalo'
  | 'Oro 18k'
  | 'Compromiso y Matrimonio'
  | 'Joyas Personalizadas';

export type MaterialType =
  | 'Oro Blanco 18k'
  | 'Oro Amarillo 18k'
  | 'Oro Rosa 18k'
  | 'Plata 925'
  | 'Acero Quirúrgico'
  | 'Diamantes y Zirconias';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  secondaryCategories?: ProductCategory[];
  material: MaterialType;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  care: string;
  sizes: string[];
  stock: number;
  customizable: boolean;
  isFeatured?: boolean;
  salesCount: number;
  createdAt: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export interface CartCustomization {
  engravingText?: string;
  fontStyle?: 'Clásica Serif' | 'Caligrafía Cursiva' | 'Moderna Sans';
  materialTone?: string;
  deliveryDate?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  customization?: CartCustomization;
}

export type SortOption =
  | 'recent'
  | 'price-asc'
  | 'price-desc'
  | 'best-sellers'
  | 'top-rated';

export interface FilterState {
  search: string;
  category: ProductCategory | 'Todas';
  material: MaterialType | 'Todos';
  size: string;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  offersOnly: boolean;
  sortBy: SortOption;
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  customerLastName: string;
  phone: string;
  email: string;
  deliveryType: 'domicilio' | 'recojo';
  addressSummary: string;
  deliveryDate: string;
  preferredTime: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Confirmado' | 'En preparación' | 'Listo para entrega';
}

export interface Testimonial {
  id: number;
  author: string;
  city: string;
  purchasedItem: string;
  rating: number;
  quote: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
