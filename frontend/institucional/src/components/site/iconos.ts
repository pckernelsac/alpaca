/**
 * Traducción de los nombres de icono que guarda el CMS.
 *
 * El panel guarda nombres de Material Symbols (`local_shipping`, `content_cut`)
 * porque así venía del backend viejo y así los edita el equipo. Acá se mapean a
 * los SVG propios: traer la fuente de iconos entera para dibujar ocho glifos
 * costaría más que los ocho glifos.
 */

import {
  IconDrop,
  IconFunnel,
  IconHand,
  IconHeartHands,
  IconLeaf,
  IconPackage,
  IconPalette,
  IconScissors,
  IconSwap,
  IconThread,
  IconTruck,
  IconVerified,
} from '../ui/Icon';

type IconoSvg = typeof IconLeaf;

const MAPA: Record<string, IconoSvg> = {
  local_shipping: IconTruck,
  swap_horiz: IconSwap,
  handyman: IconHand,
  volunteer_activism: IconHeartHands,
  eco: IconLeaf,
  content_cut: IconScissors,
  filter_alt: IconFunnel,
  water_drop: IconDrop,
  line_weight: IconThread,
  palette: IconPalette,
  verified: IconVerified,
  inventory_2: IconPackage,
};

/** La hoja se usa de comodín: un icono desconocido no debe dejar un hueco. */
export function iconoDe(nombre: string | null | undefined): IconoSvg {
  return MAPA[nombre ?? ''] ?? IconLeaf;
}
