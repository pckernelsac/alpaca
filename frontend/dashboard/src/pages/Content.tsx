import { useState } from 'react';

import { CmsResource } from '../components/cms/CmsResource';
import type { CampoDef } from '../components/cms/CmsResource';
import cms from '../components/cms/CmsResource.module.css';
import { PageHeader } from '../components/layout/Shell';
import type { Column } from '../components/ui/DataTable';
import { Badge, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { cmsApi } from '../lib/api';
import { formatNumber } from '../lib/format';
import type {
  ArtisanProcess,
  Benefit,
  GalleryImage,
  HeroSlide,
  Testimonial,
} from '../lib/types';
import styles from './Page.module.css';

type Seccion = 'hero' | 'beneficios' | 'testimonios' | 'galeria' | 'procesos';

/** Marca de publicado. La web solo muestra lo activo, así que en el panel
 *  tiene que verse de un vistazo qué está en el aire y qué no. */
function EstadoPublicado({ publicado }: { publicado: boolean }) {
  return publicado ? (
    <Badge tone="success">publicado</Badge>
  ) : (
    <Badge tone="neutral">oculto</Badge>
  );
}

const ORDEN: CampoDef = { name: 'order', label: 'Orden', type: 'number', hint: 'Menor va primero' };

export function Content() {
  usePageTitle('Contenido');
  const [seccion, setSeccion] = useState<Seccion>('hero');

  const columnasHero: Column<HeroSlide>[] = [
    {
      key: 'title',
      header: 'Slide',
      sortValue: (r) => r.order,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.title}</strong>
          <small>{r.subtitle ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'cta',
      header: 'Botón',
      secondary: true,
      render: (r) => (
        <span className={styles.muted}>{r.ctaText ? `${r.ctaText} → ${r.ctaLink}` : '—'}</span>
      ),
    },
    {
      key: 'image',
      header: 'Imagen',
      secondary: true,
      render: (r) =>
        r.image ? <img src={r.image} alt="" className={cms.miniatura} loading="lazy" /> : '—',
    },
    { key: 'order', header: 'Orden', align: 'right', sortValue: (r) => r.order },
    { key: 'active', header: 'Estado', render: (r) => <EstadoPublicado publicado={r.active} /> },
  ];

  const columnasBeneficios: Column<Benefit>[] = [
    {
      key: 'title',
      header: 'Beneficio',
      sortValue: (r) => r.order,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.title}</strong>
          <small>{r.description ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'icon',
      header: 'Ícono',
      secondary: true,
      render: (r) => <span className={styles.muted}>{r.icon ?? '—'}</span>,
    },
    { key: 'order', header: 'Orden', align: 'right', sortValue: (r) => r.order },
    { key: 'active', header: 'Estado', render: (r) => <EstadoPublicado publicado={r.active} /> },
  ];

  const columnasTestimonios: Column<Testimonial>[] = [
    {
      key: 'author',
      header: 'Quién',
      sortValue: (r) => r.author,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.author}</strong>
          <small>{[r.role, r.company].filter(Boolean).join(' · ') || '—'}</small>
        </span>
      ),
    },
    {
      key: 'text',
      header: 'Testimonio',
      render: (r) => <span className={styles.muted}>{r.text.slice(0, 80)}…</span>,
    },
    {
      key: 'rating',
      header: 'Puntaje',
      align: 'right',
      sortValue: (r) => r.rating ?? 0,
      render: (r) => (r.rating ? `${formatNumber(r.rating)}/5` : '—'),
    },
    {
      key: 'featured',
      header: 'Destacado',
      secondary: true,
      render: (r) => (r.featured ? <Badge tone="gold">destacado</Badge> : '—'),
    },
    { key: 'active', header: 'Estado', render: (r) => <EstadoPublicado publicado={r.active} /> },
  ];

  const columnasGaleria: Column<GalleryImage>[] = [
    {
      key: 'url',
      header: 'Imagen',
      render: (r) => <img src={r.url} alt={r.altText ?? ''} className={cms.miniatura} loading="lazy" />,
    },
    {
      key: 'caption',
      header: 'Epígrafe',
      sortValue: (r) => r.caption ?? '',
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.caption ?? 'Sin epígrafe'}</strong>
          <small>{r.altText ?? 'sin texto alternativo'}</small>
        </span>
      ),
    },
    {
      key: 'category',
      header: 'Categoría',
      secondary: true,
      sortValue: (r) => r.category ?? '',
      render: (r) => <span className={styles.muted}>{r.category ?? '—'}</span>,
    },
    { key: 'order', header: 'Orden', align: 'right', sortValue: (r) => r.order },
    { key: 'visible', header: 'Estado', render: (r) => <EstadoPublicado publicado={r.visible} /> },
  ];

  const columnasProcesos: Column<ArtisanProcess>[] = [
    {
      key: 'title',
      header: 'Paso',
      sortValue: (r) => r.stepOrder,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.title}</strong>
          <small>{r.description ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'icon',
      header: 'Ícono',
      secondary: true,
      render: (r) => <span className={styles.muted}>{r.icon ?? '—'}</span>,
    },
    { key: 'stepOrder', header: 'Orden', align: 'right', sortValue: (r) => r.stepOrder },
    { key: 'active', header: 'Estado', render: (r) => <EstadoPublicado publicado={r.active} /> },
  ];

  return (
    <>
      <PageHeader
        title="Contenido"
        description="Lo que se ve en la web: el hero, los beneficios, los testimonios, la galería y los procesos."
      />

      <div className={styles.toolbar}>
        <Tabs
          value={seccion}
          options={[
            { value: 'hero', label: 'Hero' },
            { value: 'beneficios', label: 'Beneficios' },
            { value: 'testimonios', label: 'Testimonios' },
            { value: 'galeria', label: 'Galería' },
            { value: 'procesos', label: 'Procesos' },
          ]}
          onChange={setSeccion}
        />
      </div>

      {seccion === 'hero' && (
        <CmsResource<HeroSlide>
          singular="Slide"
          descripcion="Las diapositivas del inicio, en el orden en que rotan."
          api={cmsApi.hero}
          columns={columnasHero}
          nombreFila={(r) => r.title}
          vacio={{
            title: '',
            subtitle: '',
            cta_text: '',
            cta_link: '',
            image: '',
            order: 0,
            active: true,
          }}
          desdeFila={(r) => ({
            title: r.title,
            subtitle: r.subtitle ?? '',
            cta_text: r.ctaText ?? '',
            cta_link: r.ctaLink ?? '',
            image: r.image ?? '',
            order: r.order,
            active: r.active,
          })}
          campos={[
            { name: 'title', label: 'Título', full: true },
            { name: 'subtitle', label: 'Bajada', type: 'textarea', full: true },
            { name: 'cta_text', label: 'Texto del botón' },
            { name: 'cta_link', label: 'Destino del botón', hint: '/tienda, /colecciones…' },
            { name: 'image', label: 'Imagen', type: 'url', full: true },
            ORDEN,
            { name: 'active', label: 'Publicado', type: 'check' },
          ]}
        />
      )}

      {seccion === 'beneficios' && (
        <CmsResource<Benefit>
          singular="Beneficio"
          descripcion="La franja de promesas: envío, cambios, hecho a mano."
          api={cmsApi.benefits}
          columns={columnasBeneficios}
          nombreFila={(r) => r.title}
          vacio={{ title: '', description: '', icon: '', image: '', order: 0, active: true }}
          desdeFila={(r) => ({
            title: r.title,
            description: r.description ?? '',
            icon: r.icon ?? '',
            image: r.image ?? '',
            order: r.order,
            active: r.active,
          })}
          campos={[
            { name: 'title', label: 'Título', full: true },
            { name: 'description', label: 'Descripción', type: 'textarea', full: true },
            { name: 'icon', label: 'Ícono', hint: 'Nombre del ícono, p. ej. local_shipping' },
            { name: 'image', label: 'Imagen', type: 'url' },
            ORDEN,
            { name: 'active', label: 'Publicado', type: 'check' },
          ]}
        />
      )}

      {seccion === 'testimonios' && (
        <CmsResource<Testimonial>
          singular="Testimonio"
          descripcion="Lo que dicen los clientes. Los destacados salen primero en la home."
          api={cmsApi.testimonials}
          columns={columnasTestimonios}
          nombreFila={(r) => r.author}
          vacio={{
            author: '',
            role: '',
            company: '',
            avatar: '',
            text: '',
            rating: 5,
            featured: false,
            order: 0,
            active: true,
          }}
          desdeFila={(r) => ({
            author: r.author,
            role: r.role ?? '',
            company: r.company ?? '',
            avatar: r.avatar ?? '',
            text: r.text,
            rating: r.rating ?? 5,
            featured: r.featured,
            order: r.order,
            active: r.active,
          })}
          campos={[
            { name: 'author', label: 'Autor' },
            { name: 'role', label: 'Rol' },
            { name: 'company', label: 'Ciudad o empresa' },
            { name: 'avatar', label: 'Foto', type: 'url' },
            { name: 'text', label: 'Testimonio', type: 'textarea', full: true },
            { name: 'rating', label: 'Puntaje', type: 'number', hint: 'De 1 a 5' },
            ORDEN,
            { name: 'featured', label: 'Destacado', type: 'check' },
            { name: 'active', label: 'Publicado', type: 'check' },
          ]}
        />
      )}

      {seccion === 'galeria' && (
        <CmsResource<GalleryImage>
          singular="Imagen"
          genero="f"
          descripcion="Las fotos del taller y del altiplano que ilustran la marca."
          api={cmsApi.gallery}
          columns={columnasGaleria}
          nombreFila={(r) => r.caption ?? r.url}
          vacio={{ url: '', alt_text: '', caption: '', category: '', order: 0, visible: true }}
          desdeFila={(r) => ({
            url: r.url,
            alt_text: r.altText ?? '',
            caption: r.caption ?? '',
            category: r.category ?? '',
            order: r.order,
            visible: r.visible,
          })}
          campos={[
            { name: 'url', label: 'URL de la imagen', type: 'url', full: true },
            { name: 'caption', label: 'Epígrafe' },
            { name: 'category', label: 'Categoría', hint: 'taller, origen, producto…' },
            {
              name: 'alt_text',
              label: 'Texto alternativo',
              full: true,
              hint: 'Lo que lee un lector de pantalla',
            },
            ORDEN,
            { name: 'visible', label: 'Publicada', type: 'check' },
          ]}
        />
      )}

      {seccion === 'procesos' && (
        <CmsResource<ArtisanProcess>
          singular="Proceso"
          descripcion="Los pasos del oficio, de la esquila al tejido."
          api={cmsApi.processes}
          columns={columnasProcesos}
          nombreFila={(r) => r.title}
          vacio={{ title: '', description: '', icon: '', image: '', step_order: 0, active: true }}
          desdeFila={(r) => ({
            title: r.title,
            description: r.description ?? '',
            icon: r.icon ?? '',
            image: r.image ?? '',
            step_order: r.stepOrder,
            active: r.active,
          })}
          campos={[
            { name: 'title', label: 'Título', full: true },
            { name: 'description', label: 'Descripción', type: 'textarea', full: true },
            { name: 'icon', label: 'Ícono' },
            { name: 'image', label: 'Imagen', type: 'url' },
            { name: 'step_order', label: 'Paso', type: 'number', hint: 'Menor va primero' },
            { name: 'active', label: 'Publicado', type: 'check' },
          ]}
        />
      )}
    </>
  );
}
