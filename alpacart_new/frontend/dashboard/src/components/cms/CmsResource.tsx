import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';

import { useResource } from '../../hooks/useResource';
import { ApiRequestError } from '../../lib/api';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { DataTable } from '../ui/DataTable';
import type { Column } from '../ui/DataTable';
import { Checkbox, Input, Select, Textarea } from '../ui/Field';
import { IconPencil, IconPlus, IconTrash } from '../ui/Icon';
import { Card } from '../ui/Primitives';
import styles from './CmsResource.module.css';

export interface CampoDef {
  name: string;
  label: string;
  type?: 'text' | 'url' | 'number' | 'textarea' | 'check' | 'select' | 'date';
  hint?: string;
  /** Ocupa las dos columnas del formulario. */
  full?: boolean;
  /** Para `select`. */
  options?: { value: string; label: string }[];
  /** Campos que solo se piden al crear: el código de un cupón ya circula
   *  impreso y cambiarlo rompería el que la gente tiene. */
  soloAlCrear?: boolean;
}

type Id = number | string;

interface Recurso<T> {
  list: (signal?: AbortSignal) => Promise<T[]>;
  create: (input: Record<string, unknown>) => Promise<T>;
  update: (id: Id, input: Record<string, unknown>) => Promise<T>;
  remove: (id: Id) => Promise<{ deleted: boolean; id: Id }>;
}

interface Props<T> {
  /** Cómo se llama una unidad: "slide", "beneficio"… para los mensajes. */
  singular: string;
  descripcion: string;
  api: Recurso<T>;
  columns: Column<T>[];
  campos: CampoDef[];
  /** Valores del formulario vacío, y de dónde salen al editar. */
  vacio: Record<string, unknown>;
  desdeFila: (fila: T) => Record<string, unknown>;
  nombreFila: (fila: T) => string;
  /** El género del sustantivo: "Nueva promoción", no "Nuevo promoción". */
  genero?: 'm' | 'f';
  vacioTexto?: string;
  extra?: ReactNode;
}

/**
 * Un recurso del CMS: tabla + alta/edición/borrado.
 *
 * Los cinco (hero, beneficios, testimonios, galería, procesos) tienen la misma
 * coreografía y sólo cambian los campos, así que se describen con datos en vez
 * de repetir cinco pantallas casi iguales.
 */
export function CmsResource<T extends { id: number | string }>({
  singular,
  descripcion,
  api,
  columns,
  campos,
  vacio,
  desdeFila,
  nombreFila,
  genero = 'm',
  vacioTexto,
  extra,
}: Props<T>) {
  const toast = useToast();
  const loader = useCallback((signal: AbortSignal) => api.list(signal), [api]);
  const { data, loading, error, reload } = useResource<T[]>(loader);

  const [form, setForm] = useState<Record<string, unknown>>(vacio);
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setForm(vacio);
    setEditing(null);
    setOpen(true);
  }

  function openEdit(fila: T) {
    setForm(desdeFila(fila));
    setEditing(fila);
    setOpen(true);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      // Los campos numéricos viajan como número: el input los entrega string
      // y el backend rechazaría "3" donde espera un entero.
      const payload: Record<string, unknown> = {};
      campos.forEach((campo) => {
        if (editing && campo.soloAlCrear) return;
        const valor = form[campo.name];
        payload[campo.name] =
          campo.type === 'number' ? Number(valor || 0) : valor === '' ? null : valor;
      });

      if (editing) {
        await api.update(editing.id, payload);
        toast.success(`${singular} actualizado`);
      } else {
        await api.create(payload);
        toast.success(`${singular} creado`);
      }
      setOpen(false);
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos guardar');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await api.remove(toDelete.id);
      toast.success(`${singular} eliminado`);
      setToDelete(null);
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos eliminarlo');
    } finally {
      setDeleting(false);
    }
  }

  const nombre = singular.toLowerCase();
  const nuevo = genero === 'f' ? 'Nueva' : 'Nuevo';
  const primero = genero === 'f' ? 'la primera' : 'el primer';

  const conAcciones: Column<T>[] = [
    ...columns,
    {
      key: 'acciones',
      header: '',
      width: '6rem',
      render: (fila) => (
        <div className={styles.acciones}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Editar ${nombreFila(fila)}`}
            onClick={() => openEdit(fila)}
          >
            <IconPencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Eliminar ${nombreFila(fila)}`}
            onClick={() => setToDelete(fila)}
          >
            <IconTrash size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.barra}>
        <p className={styles.descripcion}>{descripcion}</p>
        <Button size="sm" onClick={openCreate}>
          <IconPlus size={16} />
          {nuevo} {nombre}
        </Button>
      </div>

      {extra}

      {open && (
        <Card title={editing ? `Editar ${nombre}` : `${nuevo} ${nombre}`}>
          <form className={styles.form} onSubmit={save}>
            <div className={styles.grid}>
              {campos.map((campo) => {
                const valor = form[campo.name];
                const clase = campo.full ? styles.full : undefined;

                if (campo.type === 'check') {
                  return (
                    <div key={campo.name} className={clase}>
                      <Checkbox
                        label={campo.label}
                        checked={Boolean(valor)}
                        onChange={(event) =>
                          setForm({ ...form, [campo.name]: event.target.checked })
                        }
                      />
                    </div>
                  );
                }

                if (campo.type === 'select') {
                  return (
                    <div key={campo.name} className={clase}>
                      <Select
                        label={campo.label}
                        hint={campo.hint}
                        value={String(valor ?? '')}
                        disabled={Boolean(editing && campo.soloAlCrear)}
                        onChange={(event) => setForm({ ...form, [campo.name]: event.target.value })}
                      >
                        {(campo.options ?? []).map((opcion) => (
                          <option key={opcion.value} value={opcion.value}>
                            {opcion.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  );
                }

                if (campo.type === 'textarea') {
                  return (
                    <div key={campo.name} className={clase}>
                      <Textarea
                        label={campo.label}
                        hint={campo.hint}
                        rows={4}
                        value={String(valor ?? '')}
                        onChange={(event) => setForm({ ...form, [campo.name]: event.target.value })}
                      />
                    </div>
                  );
                }

                return (
                  <div key={campo.name} className={clase}>
                    <Input
                      label={campo.label}
                      hint={campo.hint}
                      type={
                        campo.type === 'number'
                          ? 'number'
                          : campo.type === 'url'
                            ? 'url'
                            : campo.type === 'date'
                              ? 'date'
                              : 'text'
                      }
                      disabled={Boolean(editing && campo.soloAlCrear)}
                      value={String(valor ?? '')}
                      onChange={(event) => setForm({ ...form, [campo.name]: event.target.value })}
                    />
                  </div>
                );
              })}
            </div>

            <div className={styles.formAcciones}>
              <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" loading={saving}>
                Guardar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card padded={false}>
        <DataTable
          columns={conAcciones}
          rows={data ?? []}
          rowKey={(fila) => fila.id}
          loading={loading}
          error={error}
          emptyTitle="Todavía no hay nada acá"
          emptyDescription={vacioTexto ?? `Creá ${primero} ${nombre} para empezar.`}
        />
      </Card>

      <ConfirmDialog
        open={toDelete !== null}
        title={`Eliminar ${nombre}`}
        message={`"${toDelete ? nombreFila(toDelete) : ''}" se borra de la web. La acción no se deshace.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
