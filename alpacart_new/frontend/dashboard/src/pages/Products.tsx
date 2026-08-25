import { useCallback, useState } from 'react';

import { MediaManager } from '../components/catalog/MediaManager';
import { VariantManager } from '../components/catalog/VariantManager';
import { PageHeader } from '../components/layout/Shell';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Drawer } from '../components/ui/Drawer';
import { Input, Select, Textarea } from '../components/ui/Field';
import { IconPencil, IconPlus, IconSearch, IconTrash } from '../components/ui/Icon';
import { Badge, Card, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDebounced, useResource } from '../hooks/useResource';
import { ApiRequestError, catalogApi } from '../lib/api';
import { formatNumber, formatPrice } from '../lib/format';
import { PRODUCT_STATUS } from '../lib/orderStatus';
import type { Category, Collection, Paginated, Product, ProductInput } from '../lib/types';
import { useToast } from '../providers/ToastProvider';
import styles from './Page.module.css';

const EMPTY_FORM: ProductInput & { sku: string; name: string; slug: string } = {
  sku: '',
  name: '',
  slug: '',
  description: '',
  material: '',
  category_id: null,
  collection_id: null,
  status: 'draft',
};

export function Products() {
  usePageTitle('Productos');
  const toast = useToast();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState<'recent' | 'name' | 'price_asc' | 'price_desc'>('recent');
  const debouncedSearch = useDebounced(search);

  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [tab, setTab] = useState<'datos' | 'variantes' | 'fotos'>('datos');

  const listLoader = useCallback(
    (signal: AbortSignal) =>
      catalogApi.products(
        { page, limit: 20, search: debouncedSearch, status: status || undefined, sort },
        signal,
      ),
    [page, debouncedSearch, status, sort],
  );

  const { data, loading, error, reload } = useResource<Paginated<Product>>(listLoader, [
    page,
    debouncedSearch,
    status,
    sort,
  ]);

  const refsLoader = useCallback(
    async (signal: AbortSignal) => ({
      categories: await catalogApi.categories(signal),
      collections: await catalogApi.collections(signal),
    }),
    [],
  );
  const { data: refs } = useResource<{ categories: Category[]; collections: Collection[] }>(
    refsLoader,
  );

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditing(null);
    setCreating(true);
    setTab('datos');
  }

  function openEdit(product: Product) {
    setForm({
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      material: product.material ?? '',
      category_id: product.category?.id ?? null,
      collection_id: product.collection?.id ?? null,
      status: product.status,
    });
    setEditing(product);
    setCreating(false);
    setTab('datos');
  }

  function closeDrawer() {
    setEditing(null);
    setCreating(false);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload: ProductInput = {
        name: form.name.trim(),
        description: form.description || null,
        material: form.material || null,
        category_id: form.category_id ? Number(form.category_id) : null,
        collection_id: form.collection_id || null,
        status: form.status,
      };

      if (editing) {
        // El slug solo viaja si de verdad cambió: mandarlo igual haría que el
        // backend lo re-normalice y podría mover la URL sin que nadie lo pida.
        const slug = form.slug.trim();
        await catalogApi.update(editing.id, {
          ...payload,
          ...(slug && slug !== editing.slug ? { slug } : {}),
        });
        toast.success('Producto actualizado');
      } else {
        // El SKU solo se manda al crear: el backend no lo acepta en el update
        // y cambiarlo rompería las referencias del inventario.
        await catalogApi.create({ ...payload, sku: form.sku.trim() });
        toast.success('Producto creado');
      }
      closeDrawer();
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos guardar');
    } finally {
      setSaving(false);
    }
  }

  /** Tras tocar variantes o fotos hay que releer: el precio, el stock y la
   *  imagen del producto se calculan a partir de ellas. */
  async function refreshEditing() {
    if (!editing) return;
    try {
      setEditing(await catalogApi.product(editing.id));
      reload();
    } catch {
      reload();
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await catalogApi.remove(toDelete.id);
      toast.success(`"${toDelete.name}" fue archivado`);
      setToDelete(null);
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos archivarlo');
    } finally {
      setDeleting(false);
    }
  }

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Producto',
      sortValue: (row) => row.name,
      render: (row) => (
        <div className={styles.productCell}>
          {row.image ? (
            <img src={row.image} alt="" className={styles.thumb} loading="lazy" />
          ) : (
            <span className={styles.thumb} aria-hidden="true" />
          )}
          <span className={styles.primaryCell}>
            <strong>{row.name}</strong>
            <small>{row.sku}</small>
          </span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Categoría',
      secondary: true,
      sortValue: (row) => row.category?.name ?? '',
      render: (row) => <span className={styles.muted}>{row.category?.name ?? '—'}</span>,
    },
    {
      key: 'variants',
      header: 'Variantes',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.variants.length,
      render: (row) => <span className={styles.numeric}>{row.variants.length}</span>,
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'right',
      sortValue: (row) => row.stock,
      render: (row) => (
        <span className={styles.numeric}>
          {row.stock === 0 ? <Badge tone="danger">agotado</Badge> : formatNumber(row.stock)}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      align: 'right',
      sortValue: (row) => row.price,
      render: (row) => <span className={styles.numeric}>{formatPrice(row.price)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => {
        const meta = PRODUCT_STATUS[row.status] ?? { label: row.status, tone: 'neutral' as const };
        return <Badge tone={meta.tone}>{meta.label}</Badge>;
      },
    },
    {
      key: 'actions',
      header: '',
      width: '6rem',
      render: (row) => (
        <div className={styles.rowActions}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Editar ${row.name}`}
            onClick={() => openEdit(row)}
          >
            <IconPencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Archivar ${row.name}`}
            onClick={() => setToDelete(row)}
          >
            <IconTrash size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Productos"
        description="Catálogo completo, con sus variantes y existencias."
        actions={
          <Button size="sm" onClick={openCreate}>
            <IconPlus size={16} />
            Nuevo producto
          </Button>
        }
      />

      <div className={styles.toolbar}>
        <div className={`${styles.toolbarSearch} ${styles.compactField}`}>
          <Input
            label="Buscar"
            type="search"
            placeholder="Nombre o SKU…"
            icon={<IconSearch size={16} />}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.compactField}>
          <Select
            label="Estado"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="draft">Borradores</option>
            <option value="inactive">Inactivos</option>
          </Select>
        </div>

        <div className={styles.compactField}>
          <Select
            label="Orden"
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
          >
            <option value="recent">Más recientes</option>
            <option value="name">Nombre</option>
            <option value="price_asc">Precio ascendente</option>
            <option value="price_desc">Precio descendente</option>
          </Select>
        </div>
      </div>

      <Card padded={false}>
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          loading={loading}
          error={error}
          emptyTitle="No hay productos con esos filtros"
          emptyDescription="Probá quitando la búsqueda o cambiando el estado."
        />
        {data && (
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.total_pages}
            total={data.meta.total}
            onChange={setPage}
          />
        )}
      </Card>

      <Drawer
        open={creating || editing !== null}
        title={editing ? 'Editar producto' : 'Nuevo producto'}
        description={
          editing
            ? editing.sku
            : 'Se crea como borrador; las variantes y las fotos se cargan al editarlo.'
        }
        onClose={closeDrawer}
        width="34rem"
        footer={
          tab === 'datos' ? (
            <>
              <Button variant="secondary" size="sm" onClick={closeDrawer} disabled={saving}>
                Cancelar
              </Button>
              <Button size="sm" form="product-form" type="submit" loading={saving}>
                Guardar
              </Button>
            </>
          ) : (
            // Variantes y fotos guardan solas, una por una: un botón "Guardar"
            // acá prometería algo que no hace.
            <Button variant="secondary" size="sm" onClick={closeDrawer}>
              Cerrar
            </Button>
          )
        }
      >
        {editing && (
          <Tabs
            value={tab}
            options={[
              { value: 'datos', label: 'Datos' },
              { value: 'variantes', label: 'Variantes', count: editing.variants.length },
              { value: 'fotos', label: 'Fotos', count: editing.media.length },
            ]}
            onChange={setTab}
          />
        )}

        {tab === 'variantes' && editing && (
          <VariantManager product={editing} onChanged={refreshEditing} />
        )}

        {tab === 'fotos' && editing && (
          <MediaManager product={editing} onChanged={refreshEditing} />
        )}

        {tab === 'datos' && (
        <form id="product-form" className={styles.formGrid} onSubmit={save}>
          {!editing && (
            <Input
              label="SKU"
              required
              value={form.sku}
              onChange={(event) => setForm({ ...form, sku: event.target.value })}
              placeholder="ALP-CH-001"
            />
          )}

          <Input
            label="Nombre"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />

          <Select
            label="Categoría"
            value={form.category_id ?? ''}
            onChange={(event) =>
              setForm({ ...form, category_id: event.target.value ? Number(event.target.value) : null })
            }
          >
            <option value="">Sin categoría</option>
            {refs?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Select
            label="Colección"
            value={form.collection_id ?? ''}
            onChange={(event) =>
              setForm({ ...form, collection_id: event.target.value || null })
            }
          >
            <option value="">Sin colección</option>
            {refs?.collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </Select>

          <Input
            label="Material"
            value={form.material ?? ''}
            onChange={(event) => setForm({ ...form, material: event.target.value })}
            placeholder="Alpaca baby 100%"
          />

          {editing && (
            <div className={styles.formGridFull}>
              <Input
                label="URL"
                value={form.slug}
                onChange={(event) => setForm({ ...form, slug: event.target.value })}
                hint={`La tienda lo publica en /producto/${form.slug || '…'} — cambiarlo rompe los links que ya circulan.`}
              />
            </div>
          )}

          <Select
            label="Estado"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="draft">Borrador</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>

          <div className={styles.formGridFull}>
            <Textarea
              label="Descripción"
              value={form.description ?? ''}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              rows={5}
            />
          </div>
        </form>
        )}
      </Drawer>

      <ConfirmDialog
        open={toDelete !== null}
        title="Archivar producto"
        message={`"${toDelete?.name ?? ''}" dejará de aparecer en la tienda. Sus pedidos y su historial se conservan.`}
        confirmLabel="Archivar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
