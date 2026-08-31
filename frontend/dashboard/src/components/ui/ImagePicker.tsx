import { useId, useRef, useState } from 'react';

import { ApiRequestError, mediaUrl, uploadImage } from '../../lib/api';
import { useToast } from '../../providers/ToastProvider';
import { Button } from './Button';
import { IconClose, IconImage, IconUpload } from './Icon';
import styles from './ImagePicker.module.css';

export interface ImagePickerProps {
  label?: string;
  hint?: string;
  /** Ruta ya guardada, o cadena vacia si todavia no hay foto. */
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

/** Selector de imagen: se elige un archivo, se sube y queda la ruta.
 *
 *  La foto se sube apenas se elige, antes de guardar el formulario, para que la
 *  vista previa muestre lo que realmente quedo en el servidor y no un blob local
 *  que podria no haber llegado nunca.
 */
export function ImagePicker({ label, hint, value, onChange, disabled }: ImagePickerProps) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [rota, setRota] = useState(false);
  const id = useId();

  async function elegir(archivo: File | undefined) {
    if (!archivo) return;
    setSubiendo(true);
    try {
      const subida = await uploadImage(archivo);
      setRota(false);
      onChange(subida.url);
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos subir la foto');
    } finally {
      setSubiendo(false);
      // El input se limpia siempre: sin esto, volver a elegir el mismo archivo
      // no dispara el change y parece que el boton no anda.
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  const previa = mediaUrl(value);

  return (
    <div className={styles.campo}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.caja}>
        <div className={styles.previa} aria-hidden={!previa}>
          {previa && !rota ? (
            <img src={previa} alt="" className={styles.img} onError={() => setRota(true)} />
          ) : (
            <span className={styles.vacia}>
              <IconImage size={22} />
            </span>
          )}
        </div>

        <div className={styles.acciones}>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className={styles.input}
            disabled={disabled || subiendo}
            onChange={(event) => void elegir(event.target.files?.[0])}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            loading={subiendo}
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <IconUpload size={16} />
            {value ? 'Cambiar foto' : 'Subir foto'}
          </Button>

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled || subiendo}
              onClick={() => {
                setRota(false);
                onChange('');
              }}
            >
              <IconClose size={15} />
              Quitar
            </Button>
          )}
        </div>
      </div>

      <span className={styles.hint}>
        {rota && previa
          ? 'La imagen guardada no se pudo cargar. Subi una nueva para reemplazarla.'
          : (hint ?? 'JPG, PNG, WEBP, AVIF o GIF. Hasta 8 MB.')}
      </span>
    </div>
  );
}
