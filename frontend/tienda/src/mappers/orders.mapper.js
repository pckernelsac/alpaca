import { createOrderList, createOrder } from '@/domain';

export function mapOrders(rawList) {
  return createOrderList(rawList?.data || rawList || []);
}

export function mapOrder(raw) {
  return createOrder(raw);
}
