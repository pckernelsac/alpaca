/** Tipos del dominio, alineados con los schemas del backend.
 *
 *  Este sitio es sólo de lectura: no hay carrito, sesión ni pedidos, así que
 *  el archivo se queda en lo que la web institucional realmente muestra.
 */

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface Paginated<T> {
  success: boolean;
  data: T[];
  meta: PageMeta;
}

export interface ApiError {
  message: string;
  status: number;
  details?: { field: string; message: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  piece_count: number | null;
  active: boolean;
}

/** Recorte de producto: la ficha completa vive en la tienda, acá sólo se
 *  exhiben las piezas para mandar a comprarlas. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  material: string | null;
  category: Category | null;
  collection: Collection | null;
  price: number;
  image: string | null;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  image: string | null;
  order: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  order: number;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  text: string;
  rating: number | null;
  featured: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  altText: string | null;
  caption: string | null;
  category: string | null;
  order: number;
}

export interface ArtisanProcess {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  stepOrder: number;
}

export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  items: { id: number; question: string; answer: string; order: number }[];
}

/** Ficha del listado `/contents`; el cuerpo sólo llega en el detalle. */
export interface ContentSummary {
  id: string;
  title: string;
  slug: string;
  type: string;
  image: string | null;
  publishedAt: string | null;
}

export interface Content extends ContentSummary {
  body: string | null;
}

export interface TextileMaterial {
  id: number;
  name: string;
  category: string | null;
  micronRating: string | null;
  certification: string | null;
  origin: string | null;
}
