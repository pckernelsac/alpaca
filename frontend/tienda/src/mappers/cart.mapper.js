import { createCart } from '@/domain';

export function mapCart(raw) {
  return createCart(raw);
}
