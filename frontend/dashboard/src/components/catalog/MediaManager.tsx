import { useRef, useState } from 'react';

import { ApiRequestError, catalogApi, mediaUrl, uploadImage } from '../../lib/api';
import type { MediaItem, Product } from '../../lib/types';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Input } from '../ui/Field';
import { IconCheck, IconTrash, IconUpload } from '../ui/Icon';
import { Badge } from '../ui/Primitives';
import styles from './Manager.module.css';

/** Fotos del producto.
 *
 *  Se suben desde la máquina: el archivo va a `POST /uploads`, que devuelve la
 *  ruta con la que se guarda la foto. Se aceptan varias de una vez y se cargan
 *  en orden — no en paralelo — porque la primera del producto queda como
 *  principal y subirlas a la vez volvería azaroso cuál es.
 */
export function MediaManager({ product, onChanged }: { product: Product; onChanged: () => void }) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState('');
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function add(archivos: FileList | null) {
    const lista = Array.from(archivos ?? []);
    if (lista.length === 0) return;

    setSaving(true);
    let subidas = 0;
    try {
      for (const archivo of lista) {
        const subida = await uploadImage(archivo);
        // El texto alternativo escrito arriba acompaña solo a la primera: es de
        // una foto, no de la tanda.
        await catalogApi.addMedia(product.id, {
          url: subida.url,
          alt_text: subidas === 0 ? alt.trim() || null : null,
        });
        subidas += 1;
      }
      const primera = product.media.length === 0;
      toast.success(
        subidas > 1
          ? `${subidas} fotos agregadas`
          : primera
            ? 'Foto agregada como principal'
            : 'Foto agregada',
      );
      setAlt('');
      onChanged();
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos agregar la foto',
      );
      // Si la tanda se cortó por la mitad, lo ya subido igual tiene que verse.
      if (subidas > 0) onChanged();
    } finally {
      setSaving(false);
      // Sin esto, volver a elegir el mismo archivo no dispara el change.
      if (inputRef.current) inputRef.current.value = '';
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
                src={mediaUrl(media.url)}
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

      <div className={styles.form}>
        <div className={styles.formGrid}>
          <Input
            label="Texto alternativo"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            hint="Lo que lee un lector de pantalla"
          />
        </div>
        <div className={styles.formActions}>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className={styles.fileInput}
            disabled={saving}
            onChange={(event) => void add(event.target.files)}
          />
          <span className={styles.formHint}>JPG, PNG, WEBP, AVIF o GIF. Hasta 8 MB cada una.</span>
          <Button
            type="button"
            size="sm"
            loading={saving}
            onClick={() => inputRef.current?.click()}
          >
            <IconUpload size={16} />
            Subir fotos
          </Button>
        </div>
      </div>

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
