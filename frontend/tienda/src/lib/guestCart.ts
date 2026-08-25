/**
 * Carrito de invitado.
 *
 * Agregar al carrito no pide sesión: hasta que el visitante tiene cuenta, las
 * líneas viven en localStorage. La sesión recién se exige al pagar, y al
 * iniciarla el CartProvider vuelca esto al carrito del servidor y lo vacía.
 *
 * Los totales se calculan acá con las mismas reglas que el backend
 * (`recalculate` en app/api/v1/customers.py). Es una duplicación deliberada y
 * la única de este módulo: un invitado no tiene /cart al que pedirle totales.
 * Si allá cambia el IGV o el envío, cambia acá.
 */

import type { Cart, CartItem, Product, Variant } from './types';

const STORAGE_KEY = 'alpacart.guest-cart';

const IGV = 0.18;
const FREE_SHIPPING_FROM = 500;
const FLAT_SHIPPING = 25;

export interface GuestCartItem extends CartItem {
  /** Foto del stock de la variante al momento de agregar. Sirve para frenar el
   *  "+" sin ir al backend; no es la verdad, y por eso el backend revalida al
   *  volcar el carrito en el login y otra vez al confirmar el pedido. */
  stock: number;
}

/** El backend trabaja en Decimal; acá hay floats, así que se redondea en cada
 *  paso para que 0.1 + 0.2 no se filtre a un precio mostrado. */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function read(): GuestCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GuestCartItem[]) : [];
  } catch {
    // Storage bloqueado o JSON corrupto: se arranca con el carrito vacío en
    // vez de romper toda la tienda.
    return [];
  }
}

function write(items: GuestCartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* modo privado sin storage: el carrito dura lo que la pestaña */
  }
}

/** Ids propios de cada línea. Nunca conviven con los del servidor —el volcado
 *  al iniciar sesión vacía este carrito—, así que alcanza con no repetirlos. */
function nextId(items: GuestCartItem[]): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

/** Arma el Cart completo, totales incluidos, desde las líneas guardadas. */
export function buildGuestCart(items: GuestCartItem[] = read()): Cart {
  const subtotal = round2(items.reduce((sum, item) => sum + item.total, 0));
  // Sin descuento: validar un cupón es del backend y exige sesión. El invitado
  // ve el aviso en el carrito y lo aplica después de ingresar.
  const tax = round2(subtotal * IGV);
  const shippingFee = subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : FLAT_SHIPPING;

  return {
    id: 'guest',
    items,
    subtotal,
    discount: 0,
    tax,
    shippingFee,
    total: round2(subtotal + tax + shippingFee),
    couponId: null,
  };
}

export function getGuestCart(): Cart {
  return buildGuestCart();
}

export function readGuestItems(): GuestCartItem[] {
  return read();
}

export function clearGuestCart(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nada que limpiar */
  }
}

/** Misma elección que hace el backend al agregar: la variante pedida, o la
 *  activa más barata si no se especificó ninguna. */
function resolveVariant(product: Product, variantId?: string): Variant {
  if (variantId) {
    const chosen = product.variants.find((variant) => variant.id === variantId);
    if (!chosen) throw new Error('Variante inválida');
    return chosen;
  }

  const actives = product.variants.filter((variant) => variant.status === 'active');
  if (actives.length === 0) throw new Error('El producto no tiene variantes activas');

  return actives.reduce((cheapest, variant) =>
    variant.price < cheapest.price ? variant : cheapest,
  );
}

export function addGuestItem(product: Product, quantity: number, variantId?: string): Cart {
  const variant = resolveVariant(product, variantId);
  const items = read();
  const existing = items.find((item) => item.variantId === variant.id);
  const wanted = (existing?.quantity ?? 0) + quantity;

  // Se mira el total acumulado y no solo lo que se agrega ahora: si se pasara,
  // la línea entraría igual y el error recién saltaría al iniciar sesión.
  if (variant.stock < wanted) {
    throw new Error(`Stock insuficiente: quedan ${variant.stock} unidades`);
  }

  if (existing) {
    existing.quantity = wanted;
    existing.total = round2(existing.unitPrice * wanted);
    existing.stock = variant.stock;
  } else {
    items.push({
      id: nextId(items),
      productId: product.id,
      productSlug: product.slug,
      variantId: variant.id,
      name: product.name,
      sku: variant.sku,
      variantLabel: variant.color_name,
      image: product.image ?? product.media[0]?.url ?? null,
      unitPrice: variant.price,
      price: variant.price,
      quantity,
      total: round2(variant.price * quantity),
      stock: variant.stock,
    });
  }

  write(items);
  return buildGuestCart(items);
}

export function updateGuestItem(itemId: number, quantity: number): Cart {
  const items = read();
  const target = items.find((item) => item.id === itemId);
  if (!target) return buildGuestCart(items);

  if (quantity <= 0) return removeGuestItem(itemId);
  if (quantity > target.stock) {
    throw new Error(`Stock insuficiente: quedan ${target.stock} unidades`);
  }

  target.quantity = quantity;
  target.total = round2(target.unitPrice * quantity);
  write(items);
  return buildGuestCart(items);
}

export function removeGuestItem(itemId: number): Cart {
  const items = read().filter((item) => item.id !== itemId);
  write(items);
  return buildGuestCart(items);
}

export function emptyGuestCart(): Cart {
  clearGuestCart();
  return buildGuestCart([]);
}
