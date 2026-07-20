import { createCustomer } from '@/domain';

export function mapCustomer(raw) {
  return createCustomer(raw?.data || raw?.customer || raw?.user || raw);
}
