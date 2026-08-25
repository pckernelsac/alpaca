import { useState } from 'react';

import { ApiRequestError, catalogApi } from '../../lib/api';
import type { MediaItem, Product } from '../../lib/types';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Input } from '../ui/Field';
import { IconCheck, IconPlus, IconTrash } from '../ui/Icon';
import { Badge } from '../ui/Primitives';
import styles from './Manager.module.css';

/** Fotos del producto.
 *
 *  Se cargan por URL y no por archivo: el stack local no levanta almacenamiento
 *  de objetos, así que subir un archivo no tendría dónde dejarlo.
 */
export function MediaManager({ product, onChanged }: { product: Product; onChanged: () => void }) {
  const toast = useToast();
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function add(event: React.FormEvent) {
    event.preventDefault();
    const limpia = url.trim();
    if (!limpia) return;

    setSaving(true);
    try {
      await catalogApi.addMedia(product.id, { url: limpia, alt_text: alt.trim() || null });
      toast.success(product.media.length ? 'Foto agregada' : 'Foto agregada como principal');
      setUrl('');
      setAlt('');
      onChanged();
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos agregar la foto',
      );
    } finally {
      setSaving(false);
    }
  }

  async function cambiar(media: MediaItem, cambios: { is_principal?: boolean; visible?: boolean }) {
    setBusy(media.id);
    try {
      await catalogApi.updateMedia(media.id, cambios);
      onChanged();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos actualizarla');
    } finally {
      setBusy(null);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await catalogApi.removeMedia(toDelete.id);
      toast.success('Foto eliminada');
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
      <p className={styles.hint}>
        La principal es la que se ve en la tienda y en los listados. Si ocultás o borrás la
        principal, otra toma su lugar.
      </p>

      {product.media.length === 0 ? (
        <p className={styles.empty}>Sin fotos: la tienda muestra el placeholder de marca.</p>
      ) : (
        <ul className={styles.gallery}>
          {product.media.map((media) => (
            <li key={media.id} className={styles.tile}>
              <img
                src={media.url}
                alt={media.alt_text ?? ''}
                className={media.visible ? styles.tileImg : styles.tileImgHidden}
                loading="lazy"
              />
              <div className={styles.tileBar}>
                {media.is_principal ? (
                  <Badge tone="gold">principal</Badge>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={busy === media.id}
                    onClick={() => void cambiar(media, { is_principal: true })}
                  >
                    <IconCheck size={14} />
                    Principal
                  </Button>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={busy === media.id}
                  onClick={() => void cambiar(media, { visible: !media.visible })}
                >
                  {media.visible ? 'Ocultar' : 'Mostrar'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label="Eliminar foto"
                  onClick={() => setToDelete(media)}
                >
                  <IconTrash size={15} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className={styles.form} onSubmit={add}>
        <div className={styles.formGrid}>
          <Input
            label="URL de la foto"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://…"
          />
          <Input
            label="Texto alternativo"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            hint="Lo que lee un lector de pantalla"
          />
        </div>
        <div className={styles.formActions}>
          <Button type="submit" size="sm" loading={saving} disabled={!url.trim()}>
            <IconPlus size={16} />
            Agregar foto
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={toDelete !== null}
        title="Eliminar foto"
        message="La foto se borra del producto. Si era la principal, otra ocupa su lugar."
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
