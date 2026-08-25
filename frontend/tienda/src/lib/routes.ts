/** Rutas que dependen de datos.
 *
 *  Recibe las dos partes por separado a propósito: en un favorito o en una
 *  línea de pedido, `id` es el id de esa fila, no el del producto, y pasar el
 *  objeto entero invitaba a tomar el equivocado.
 */
export function productPath(slug?: string | null, productId?: string | null): string {
  const identificador = slug ?? productId;
  return identificador ? `/producto/${identificador}` : '#';
}
