/**
 * Fotografías de portada de cada sección.
 *
 * No salen del CMS a propósito: la portada es lo primero que se pinta y
 * esperar una petición para saber qué imagen va deja la cabecera vacía medio
 * segundo.
 *
 * Son sólo dos porque de las seis fotos que siembra el backend, una está caída
 * (404) y otras tres no muestran lo que dice su epígrafe: la rotulada «Alpacas
 * en el altiplano» es una cámara fotográfica y la de la colección de vicuña es
 * una taza de café. Los identificadores de Unsplash son arbitrarios y no se
 * pueden deducir del tema. Las demás secciones abren con la portada
 * tipográfica, que es mejor que ilustrar el oficio con algo que no lo es.
 *
 * Cuando haya fotos propias del taller, agregarlas acá —y revisar de paso las
 * de la galería y las colecciones, que arrastran el mismo problema—.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

export const FOTOS = {
  colecciones: unsplash('1483985988355-763728e1935b'),
  diario: unsplash('1490481651871-ab68de25d43d'),
} as const;
