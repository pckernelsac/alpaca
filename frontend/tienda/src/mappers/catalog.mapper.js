import { createProductList } from '@/domain';

export function mapProducts(rawList) {
  return createProductList(rawList?.data || rawList || []);
}

export function mapProduct(raw) {
  if (!raw) return null;
  return createProductList([raw])[0];
}
