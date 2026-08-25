/**
 * Páginas cortas que comparten estructura: colecciones, favoritos, FAQ,
 * contacto, contenido del CMS, 404 y confirmación de pedido.
 */

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

import { productPath } from '../lib/routes';

import { ProductCard } from '../components/shop/ProductCard';
import { Button, ButtonLink } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Field';
import {
  IconCheck,
  IconChevronDown,
  IconHeart,
  IconSearch,
} from '../components/ui/Icon';
import { Alert, EmptyState, LoadingBlock, SkeletonText } from '../components/ui/Primitives';
import { useCollections, useProducts } from '../hooks/useCatalog';
import { useFaq } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useWishlist } from '../hooks/useWishlist';
import { ApiRequestError, cmsApi } from '../lib/api';
import { useToast } from '../providers/ToastProvider';
import styles from './Misc.module.css';
import page from './Page.module.css';

/* -------------------------------------------------------------------------- */
/* Colecciones                                                                */
/* -------------------------------------------------------------------------- */
export function Collections() {
  usePageTitle('Colecciones');
  const { collections, loading } = useCollections();

  return (
    <div className="container">
      <header className={page.headNarrow}>
        <p className="eyebrow">Nuestro trabajo</p>
        <h1 className={page.title}>Colecciones</h1>
        <p className={page.subtitle}>
          Cada colección nace de una temporada de esquila, una paleta y un grupo de tejedores.
        </p>
      </header>

      {loading ? (
        <LoadingBlock />
      ) : (
        <div className={styles.collectionGrid}>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/catalogo?collection_id=${collection.id}`}
              className={styles.collectionCard}
            >
              <div className={styles.collectionMedia}>
                {collection.image && (
                  <img src={collection.image} alt="" loading="lazy" />
                )}
              </div>
              <div className={styles.collectionBody}>
                <h2 className={styles.collectionName}>{collection.name}</h2>
                {collection.description && (
                  <p className={styles.collectionText}>{collection.description}</p>
                )}
                {collection.piece_count && (
                  <p className={styles.collectionCount}>{collection.piece_count} piezas</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Favoritos                                                                  */
/* -------------------------------------------------------------------------- */
export function Wishlist() {
  usePageTitle('Favoritos');
  const { items, loading } = useWishlist();

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <h1 className={page.title}>Tus favoritos</h1>
        <p className={page.subtitle}>
          {items.length} {items.length === 1 ? 'pieza guardada' : 'piezas guardadas'}
        </p>
      </header>

      {loading ? (
        <LoadingBlock />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<IconHeart size={26} />}
          title="Todavía no guardaste nada"
          description="Tocá el corazón en cualquier pieza para tenerla a mano."
          actions={<ButtonLink to="/catalogo">Explorar el catálogo</ButtonLink>}
        />
      ) : (
        <div className={styles.wishlistGrid} style={{ paddingBottom: 'var(--space-20)' }}>
          {items.map((item) => (
            <Link key={item.id} to={productPath(item.productSlug, item.productId)} className={styles.wishCard}>
              <div className={styles.wishMedia}>
                {item.image && <img src={item.image} alt="" loading="lazy" />}
              </div>
              <div>
                <p className={styles.wishName}>{item.name}</p>
                <p className={styles.wishSku}>{item.sku}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preguntas frecuentes                                                       */
/* -------------------------------------------------------------------------- */
export function Faq() {
  usePageTitle('Preguntas frecuentes');
  const { categories, loading } = useFaq();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="container">
      <header className={page.headNarrow}>
        <p className="eyebrow">Ayuda</p>
        <h1 className={page.title}>Preguntas frecuentes</h1>
        <p className={page.subtitle}>
          Lo que más nos consultan sobre envíos, cuidado de las prendas y devoluciones.
        </p>
      </header>

      {loading ? (
        <LoadingBlock />
      ) : (
        <div className={styles.faqWrap}>
          {categories.map((category) => (
            <section key={category.id} className={styles.faqSection}>
              <h2 className={styles.faqCategory}>{category.name}</h2>
              <div>
                {category.items.map((item) => {
                  const isOpen = open === item.id;
                  return (
                    <div key={item.id} className={styles.faqItem}>
                      <button
                        type="button"
                        className={styles.faqTrigger}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                      >
                        {item.question}
                        <IconChevronDown
                          size={18}
                          className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}
                        />
                      </button>
                      {isOpen && <div className={styles.faqAnswer}>{item.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className={styles.faqFoot}>
        <p>¿No encontraste lo que buscabas?</p>
        <ButtonLink to="/contacto" variant="secondary">
          Escribinos
        </ButtonLink>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contacto                                                                   */
/* -------------------------------------------------------------------------- */
export function Contact() {
  usePageTitle('Contacto');
  const toast = useToast();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    try {
      await cmsApi.contact(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(
        error instanceof ApiRequestError ? error.message : 'No pudimos enviar tu consulta',
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container">
      <header className={page.headNarrow}>
        <p className="eyebrow">Contacto</p>
        <h1 className={page.title}>Hablemos</h1>
        <p className={page.subtitle}>
          Respondemos de lunes a viernes, dentro de las 24 horas hábiles.
        </p>
      </header>

      <div className={styles.contactWrap}>
        {sent ? (
          <Alert tone="success" icon={<IconCheck size={18} />}>
            Recibimos tu consulta. Te respondemos al correo que dejaste.
          </Alert>
        ) : (
          <form className={page.form} onSubmit={submit}>
            <div className={page.formRow}>
              <Input
                label="Nombre"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
                minLength={2}
              />
              <Input
                type="email"
                label="Correo"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </div>
            <Input
              label="Asunto"
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
              required
              minLength={2}
            />
            <Textarea
              label="Mensaje"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              required
              minLength={5}
              rows={6}
            />
            <Button type="submit" size="lg" loading={sending}>
              Enviar consulta
            </Button>
          </form>
        )}

        <aside className={styles.contactAside}>
          <div className={styles.contactBlock}>
            <h2 className={page.cardTitle}>Escribinos</h2>
            <p>hola@alpacart.com</p>
            <p>+51 999 888 777</p>
          </div>
          <div className={styles.contactBlock}>
            <h2 className={page.cardTitle}>Visitanos</h2>
            <p>Av. Ejército 1010</p>
            <p>Yanahuara, Arequipa</p>
            <p>Perú</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contenido del CMS                                                          */
/* -------------------------------------------------------------------------- */
export function ContentPage({ slug }: { slug: string }) {
  const [content, setContent] = useState<{ title: string; body: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  usePageTitle(content?.title);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    cmsApi
      .content(slug, controller.signal)
      .then(setContent)
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  return (
    <div className="container">
      <header className={page.headNarrow}>
        {loading ? (
          <SkeletonText lines={1} />
        ) : (
          <h1 className={page.title}>{content?.title ?? 'Contenido'}</h1>
        )}
      </header>

      <div style={{ paddingBottom: 'var(--space-24)' }}>
        {loading ? (
          <div className={page.prose}>
            <SkeletonText lines={6} />
          </div>
        ) : error ? (
          <Alert tone="danger">No pudimos cargar este contenido.</Alert>
        ) : (
          <div className={page.prose}>
            {content?.body?.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Confirmación de pedido                                                     */
/* -------------------------------------------------------------------------- */
export function OrderConfirmed() {
  usePageTitle('Pedido confirmado');
  const { orderNumber } = useParams<{ orderNumber: string }>();

  return (
    <div className="container">
      <div className={styles.confirmed}>
        <span className={styles.confirmedIcon}>
          <IconCheck size={32} strokeWidth={1.5} />
        </span>
        <h1 className={page.title}>Gracias por tu compra</h1>
        <p className={page.subtitle}>
          Tu pedido <strong>{orderNumber}</strong> quedó registrado. Te enviamos la confirmación
          por correo y avisamos apenas salga del taller.
        </p>
        <div className={styles.confirmedActions}>
          <ButtonLink to="/pedidos">Ver mis pedidos</ButtonLink>
          <ButtonLink to="/catalogo" variant="secondary">
            Seguir comprando
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 404                                                                        */
/* -------------------------------------------------------------------------- */
export function NotFound() {
  usePageTitle('Página no encontrada');
  const { products } = useProducts({ limit: 4, sort: 'recent' });

  return (
    <div className="container">
      <EmptyState
        icon={<IconSearch size={26} />}
        title="No encontramos esta página"
        description="Puede que el enlace haya cambiado o que la pieza ya no esté disponible."
        actions={
          <>
            <ButtonLink to="/">Volver al inicio</ButtonLink>
            <ButtonLink to="/catalogo" variant="secondary">
              Ver el catálogo
            </ButtonLink>
          </>
        }
      />

      {products.length > 0 && (
        <section style={{ paddingBottom: 'var(--space-24)' }}>
          <h2 className={page.titleSm} style={{ marginBottom: 'var(--space-8)' }}>
            Mientras tanto
          </h2>
          <div className={page.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

