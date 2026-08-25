import { catalogApi, cmsApi } from '../lib/api';
import type {
  ArtisanProcess,
  Benefit,
  Collection,
  Content,
  ContentSummary,
  FaqCategory,
  GalleryImage,
  HeroSlide,
  Product,
  Testimonial,
  TextileMaterial,
} from '../lib/types';

import { useResource } from './useResource';

const SIN_SLIDES: HeroSlide[] = [];
const SIN_BENEFICIOS: Benefit[] = [];
const SIN_TESTIMONIOS: Testimonial[] = [];
const SIN_IMAGENES: GalleryImage[] = [];
const SIN_PROCESOS: ArtisanProcess[] = [];
const SIN_CATEGORIAS: FaqCategory[] = [];
const SIN_CONTENIDOS: ContentSummary[] = [];
const SIN_PRODUCTOS: Product[] = [];
const SIN_COLECCIONES: Collection[] = [];
const SIN_MATERIALES: TextileMaterial[] = [];

export const useHero = () => useResource((signal) => cmsApi.hero(signal), SIN_SLIDES);

export const useBenefits = () => useResource((signal) => cmsApi.benefits(signal), SIN_BENEFICIOS);

export const useTestimonials = () =>
  useResource((signal) => cmsApi.testimonials(signal), SIN_TESTIMONIOS);

export const useGallery = (category?: string) =>
  useResource((signal) => cmsApi.gallery(category, signal), SIN_IMAGENES, category ?? '');

export const useProcesses = () => useResource((signal) => cmsApi.processes(signal), SIN_PROCESOS);

export const useFaq = () => useResource((signal) => cmsApi.faq(signal), SIN_CATEGORIAS);

export const usePosts = () =>
  useResource((signal) => cmsApi.contents('post', signal), SIN_CONTENIDOS);

/** El detalle no tiene valor inicial razonable: hasta que llega, es null. */
export const useContent = (slug: string) =>
  useResource<Content | null>((signal) => cmsApi.content(slug, signal), null, slug);

export const useCollections = () =>
  useResource((signal) => catalogApi.collections(signal), SIN_COLECCIONES);

export const useMaterials = () =>
  useResource((signal) => catalogApi.materials(signal), SIN_MATERIALES);

/** Vitrina: unas pocas piezas para mirar, no un catálogo navegable. */
export function useShowcase(limit = 8, collectionId?: string) {
  return useResource(
    (signal) =>
      catalogApi
        .products({ limit, collection_id: collectionId, sort: 'recent' }, signal)
        .then((page) => page.data),
    SIN_PRODUCTOS,
    `${limit}:${collectionId ?? ''}`,
  );
}
