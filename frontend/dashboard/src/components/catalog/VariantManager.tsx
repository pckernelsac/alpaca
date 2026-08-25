import { useCallback, useState } from 'react';

import { useResource } from '../../hooks/useResource';
import { ApiRequestError, catalogApi, textileApi } from '../../lib/api';
import { formatNumber, formatPrice } from '../../lib/format';
import type { FiberMaterial, Product, TextileColor, TextileSize, Variant } from '../../lib/types';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Input, Select } from '../ui/Field';
import { IconCheck, IconPencil, IconPlus, IconTrash } from '../ui/Icon';
import { Badge } from '../ui/Primitives';
import styles from './Manager.module.css';

interface FormState {
  sku: string;
  color_id: string;
  color_name: string;
  color_hex: string;
  size_id: string;
  material_id: string;
  price: string;
  stock: string;
  min_stock: string;
  status: string;
}

const EMPTY: FormState = {
  sku: '',
  color_id: '',
  color_name: '',
  color_hex: '',
  size_id: '',
  material_id: '',
  price: '',
  stock: '0',
  min_stock: '0',
  status: 'active',
};

/** Variantes de un producto: son las que llevan precio y stock, así que sin
 *  esto el alta de un producto queda a medias. */
export function VariantManager({
  product,
  onChanged,
}: {
  product: Product;
  onChanged: () => void;
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editing, setEditing] = useState<Variant | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Variant | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loader = useCallback(
    async (signal: AbortSignal) => ({
      colors: await textileApi.colors(signal),
      sizes: await textileApi.sizes(signal),
      materials: await textileApi.materials(signal),
    }),
    [],
  );
  const { data: refs } = useResource<{
    colors: TextileColor[];
    sizes: TextileSize[];
    materials: FiberMaterial[];
  }>(loader);

  function openCreate() {
    setForm(EMPTY);
    setEditing(null);
    setOpen(true);
  }

  function openEdit(variant: Variant) {
    setForm({
      sku: variant.sku,
      color_id: '',
      color_name: variant.color_name ?? '',
      color_hex: variant.color_hex ?? '',
      size_id: variant.size_id ? String(variant.size_id) : '',
      material_id: '',
      price: String(variant.price),
      stock: String(variant.stock),
      min_stock: '0',
      status: variant.status,
    });
    setEditing(variant);
    setOpen(true);
  }

  /** Elegir un color del catálogo textil completa nombre y hex de una vez. */
  function pickColor(id: string) {
    const color = refs?.colors.find((c) => String(c.id) === id);
    setForm((current) => ({
      ...current,
      color_id: id,
      color_name: color?.name ?? current.color_name,
      color_hex: color?.hex ?? current.color_hex,
    }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        // El stock no viaja en el update: se mueve por Inventario, que deja
        // el movimiento en el historial.
        await catalogApi.updateVariant(editing.id, {
          sku: form.sku.trim(),
          color_name: form.color_name || null,
          color_hex: form.color_hex || null,
          size_id: form.size_id ? Number(form.size_id) : null,
          material_id: form.material_id ? Number(form.material_id) : null,
          color_id: form.color_id ? Number(form.color_id) : null,
          price: Number(form.price),
          status: form.status,
        });
        toast.success('Variante actualizada');
      } else {
        await catalogApi.createVariant({
          product_id: product.id,
          sku: form.sku.trim(),
          color_name: form.color_name || null,
          color_hex: form.color_hex || null,
          size_id: form.size_id ? Number(form.size_id) : null,
          material_id: form.material_id ? Number(form.material_id) : null,
          color_id: form.color_id ? Number(form.color_id) : null,
          price: Number(form.price),
          stock: Number(form.stock || 0),
          min_stock: Number(form.min_stock || 0),
          status: form.status,
        });
        toast.success('Variante creada con su stock inicial');
      }
      setOpen(false);
      onChanged();
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos guardar la variante',
      );
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const resultado = await catalogApi.removeVariant(toDelete.id);
      // El backend desactiva en vez de borrar cuando la variante ya se vendió;
      // el aviso tiene que decir lo que realmente pasó.
      toast.success(
        resultado.deleted
          ? 'Variante eliminada'
          : (resultado.reason ?? 'La variante quedó inactiva'),
      );
      setToDelete(null);
      onChanged();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos eliminarla');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.hint}>
          El precio y el stock del producto salen de acá: la ficha muestra el menor precio entre
          las variantes activas.
        </p>
        <Button type="button" size="sm" variant="secondary" onClick={openCreate}>
          <IconPlus size={16} />
          Agregar
        </Button>
      </div>

      {product.variants.length === 0 ? (
        <p className={styles.empty}>
          Sin variantes: el producto se ve en S/ 0.00 y sin stock hasta que agregues una.
        </p>
      ) : (
        <ul className={styles.list}>
          {product.variants.map((variant) => (
            <li key={variant.id} className={styles.row}>
              <span
                className={styles.swatch}
                style={{ backgroundColor: variant.color_hex ?? 'transparent' }}
                aria-hidden="true"
              />
              <span className={styles.rowMain}>
                <strong>{variant.label}</strong>
                <small>{variant.sku}</small>
              </span>
              <span className={styles.rowNumber}>{formatPrice(variant.price)}</span>
              <span className={styles.rowNumber}>{formatNumber(variant.stock)} u</span>
              {variant.status !== 'active' && <Badge tone="neutral">inactiva</Badge>}
              <span className={styles.rowActions}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={`Editar ${variant.sku}`}
                  onClick={() => openEdit(variant)}
                >
                  <IconPencil size={15} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={`Eliminar ${variant.sku}`}
                  onClick={() => setToDelete(variant)}
                >
                  <IconTrash size={15} />
                </Button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <form className={styles.form} onSubmit={save}>
          <div className={styles.formGrid}>
            <Input
              label="SKU"
              required
              value={form.sku}
              onChange={(event) => setForm({ ...form, sku: event.target.value })}
              placeholder={`${product.sku}-COL-T`}
            />

            <Select label="Color" value={form.color_id} onChange={(e) => pickColor(e.target.value)}>
              <option value="">A mano</option>
              {refs?.colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </Select>

            <Input
              label="Nombre del color"
              value={form.color_name}
              onChange={(event) => setForm({ ...form, color_name: event.target.value })}
            />

            <Input
              label="Hex"
              value={form.color_hex}
              onChange={(event) => setForm({ ...form, color_hex: event.target.value })}
              placeholder="#C9A227"
            />

            <Select
              label="Talla"
              value={form.size_id}
              onChange={(event) => setForm({ ...form, size_id: event.target.value })}
            >
              <option value="">Sin talla</option>
              {refs?.sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </Select>

            <Select
              label="Fibra"
              value={form.material_id}
              onChange={(event) => setForm({ ...form, material_id: event.target.value })}
            >
              <option value="">Sin fibra</option>
              {refs?.materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </Select>

            <Input
              label="Precio"
              type="number"
              step="0.01"
              min="0"
              required
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />

            {editing ? (
              <Select
                label="Estado"
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                <option value="active">Activa</option>
                <option value="inactive">Inactiva</option>
              </Select>
            ) : (
              <>
                <Input
                  label="Stock inicial"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) => setForm({ ...form, stock: event.target.value })}
                  hint="Entra al almacén principal"
                />
                <Input
                  label="Mínimo"
                  type="number"
                  min="0"
                  value={form.min_stock}
                  onChange={(event) => setForm({ ...form, min_stock: event.target.value })}
                  hint="Debajo de esto avisa stock bajo"
                />
              </>
            )}
          </div>

          {editing && (
            <p className={styles.hint}>
              El stock se cambia desde Inventario, que registra el movimiento.
            </p>
          )}

          <div className={styles.formActions}>
            <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm" loading={saving}>
              <IconCheck size={16} />
              {editing ? 'Guardar variante' : 'Crear variante'}
            </Button>
          </div>
        </form>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Eliminar variante"
        message={`${toDelete?.sku ?? ''} se elimina si nunca se vendió. Si ya figura en un pedido, queda inactiva para no romper el historial.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
