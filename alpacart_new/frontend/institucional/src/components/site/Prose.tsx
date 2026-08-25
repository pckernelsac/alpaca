import styles from './Prose.module.css';

/**
 * Cuerpo de texto de los contenidos del CMS.
 *
 * El backend guarda texto plano con párrafos separados por línea en blanco, no
 * HTML. Se parte acá en vez de inyectar con `dangerouslySetInnerHTML`: lo que
 * escribe el equipo en el panel no debería poder ejecutar nada en la web.
 */
export function Prose({ body, className }: { body: string | null | undefined; className?: string }) {
  const parrafos = (body ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parrafos.length === 0) return null;

  return (
    <div className={[styles.prose, className].filter(Boolean).join(' ')}>
      {parrafos.map((parrafo, indice) => (
        <p key={indice}>{parrafo}</p>
      ))}
    </div>
  );
}
