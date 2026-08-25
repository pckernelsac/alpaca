import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ProductCard, ProductCardSkeleton } from '../components/shop/ProductCard';
import { Button } from '../components/ui/Button';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconFilter,
  IconSearch,
} from '../components/ui/Icon';
import { Alert, EmptyState } from '../components/ui/Primitives';
import { useCategories, useCollections, useProducts } from '../hooks/useCatalog';
import { usePageTitle } from '../hooks/usePageTitle';
import type { ProductQuery } from '../lib/types';
import page from './Page.module.css';
import styles from './Shop.module.css';

const SORTS = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'price_asc', label: 'Menor precio' },
  { value: 'price_desc', label: 'Mayor precio' },
] as const;

const PER_PAGE = 12;

export function Shop() {
  const [params, setParams] = useSearchParams();
  const { categories } = useCategories();
  const { collections } = useCollections();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = params.get('search') ?? undefined;
  const categoryId = params.get('category_id');
  const collectionId = params.get('collection_id') ?? undefined;
  const sort = (params.get('sort') ?? 'recent') as ProductQuery['sort'];
  const currentPage = Number(params.get('page') ?? 1);

  usePageTitle(search ? `Búsqueda: ${search}` : 'Catálogo');

  const { products, meta, loading, error } = useProducts({
    page: currentPage,
    limit: PER_PAGE,
    search,
    category_id: categoryId ? Number(categoryId) : undefined,
    collection_id: collectionId,
    sort,
  });

  /** Cambiar un filtro siempre vuelve a la página 1. */
  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null) next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setParams(next);
  }

  const activeCategory = categories.find((c) => String(c.id) === categoryId);
  const activeCollection = collections.find((c) => c.id === collectionId);
  const hasFilters = Boolean(search || categoryId || collectionId);
  const totalPages = meta?.total_pages ?? 1;

  return (
    <>
      <header className={page.head}>
        <div className="container">
          <nav className={page.breadcrumb} aria-label="Ruta">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span>{activeCategory?.name ?? activeCollection?.name ?? 'Catálogo'}</span>
          </nav>
          <h1 className={page.title}>
            {activeCategory?.name ?? activeCollection?.name ?? 'Todo el catálogo'}
          </h1>
          <p className={page.subtitle}>
            {activeCategory?.description ??
              activeCollection?.description ??
              'Piezas en fibra de alpaca, vicuña y lana de los Andes, tejidas a mano en series cortas.'}
          </p>
        </div>
      </header>

      <div className="container">
        <div className={styles.layout}>
          <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.filterGroup}>
              <h2 className={styles.filterTitle}>Categorías</h2>
              <button
                type="button"
                className={`${styles.filterOption} ${!categoryId ? styles.filterOptionActive : ''}`}
                onClick={() => setParam('category_id', null)}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.filterOption} ${
                    String(category.id) === categoryId ? styles.filterOptionActive : ''
                  }`}
                  onClick={() => setParam('category_id', String(category.id))}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.filterTitle}>Colecciones</h2>
              <button
                type="button"
                className={`${styles.filterOption} ${
                  !collectionId ? styles.filterOptionActive : ''
                }`}
                onClick={() => setParam('collection_id', null)}
              >
                Todas
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  className={`${styles.filterOption} ${
                    collection.id === collectionId ? styles.filterOptionActive : ''
                  }`}
                  onClick={() => setParam('collection_id', collection.id)}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </aside>

          <div>
            <div className={styles.toolbar}>
              <p className={styles.resultCount} aria-live="polite">
                {loading
                  ? 'Buscando…'
                  : `${meta?.total ?? 0} ${meta?.total === 1 ? 'pieza' : 'piezas'}`}
              </p>

              <div className={styles.toolbarRight}>
                <Button
                  variant="secondary"
                  size="sm"
                  className={styles.filterToggle}
                  onClick={() => setFiltersOpen((open) => !open)}
                >
                  <IconFilter size={16} />
                  Filtros
                </Button>

                <div className={styles.sortWrap}>
                  <select
                    className={styles.sortSelect}
                    value={sort}
                    onChange={(event) => setParam('sort', event.target.value)}
                    aria-label="Ordenar resultados"
                  >
                    {SORTS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className={styles.sortArrow}>
                    <IconChevronDown size={14} />
                  </span>
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className={styles.activeFilters}>
                {search && (
                  <span className={styles.chip}>
                    «{search}»
                    <button type="button" onClick={() => setParam('search', null)} aria-label="Quitar búsqueda">
                      <IconClose size={12} />
                    </button>
                  </span>
                )}
                {activeCategory && (
                  <span className={styles.chip}>
                    {activeCategory.name}
                    <button type="button" onClick={() => setParam('category_id', null)} aria-label="Quitar categoría">
                      <IconClose size={12} />
                    </button>
                  </span>
                )}
                {activeCollection && (
                  <span className={styles.chip}>
                    {activeCollection.name}
                    <button type="button" onClick={() => setParam('collection_id', null)} aria-label="Quitar colección">
                      <IconClose size={12} />
                    </button>
                  </span>
                )}
                <Button variant="link" size="sm" onClick={() => setParams(new URLSearchParams())}>
                  Limpiar todo
                </Button>
              </div>
            )}

            {error ? (
              <Alert tone="danger">{error}</Alert>
            ) : loading ? (
              <div className={page.productGrid}>
                {Array.from({ length: PER_PAGE }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                icon={<IconSearch size={26} />}
                title="Sin resultados"
                description="No encontramos piezas con esos filtros. Probá quitando alguno o buscá otra cosa."
                actions={
                  <Button variant="secondary" onClick={() => setParams(new URLSearchParams())}>
                    Ver todo el catálogo
                  </Button>
                }
              />
            ) : (
              <>
                <div className={page.productGrid}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label="Paginación">
                    <button
                      type="button"
                      className={styles.pageButton}
                      onClick={() => setParam('page', String(currentPage - 1))}
                      disabled={currentPage <= 1}
                      aria-label="Página anterior"
                    >
                      <IconChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      // Ventana alrededor de la página actual, con extremos siempre visibles.
                      const near = Math.abs(pageNumber - currentPage) <= 1;
                      const edge = pageNumber === 1 || pageNumber === totalPages;
                      if (!near && !edge) {
                        return pageNumber === 2 || pageNumber === totalPages - 1 ? (
                          <span key={pageNumber} className={styles.pageEllipsis}>
                            …
                          </span>
                        ) : null;
                      }
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          className={`${styles.pageButton} ${
                            pageNumber === currentPage ? styles.pageButtonActive : ''
                          }`}
                          onClick={() => setParam('page', String(pageNumber))}
                          aria-current={pageNumber === currentPage ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      className={styles.pageButton}
                      onClick={() => setParam('page', String(currentPage + 1))}
                      disabled={currentPage >= totalPages}
                      aria-label="Página siguiente"
                    >
                      <IconChevronRight size={16} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
