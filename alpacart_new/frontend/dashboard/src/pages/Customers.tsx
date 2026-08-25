import { useCallback, useState } from 'react';

import { PageHeader } from '../components/layout/Shell';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Input } from '../components/ui/Field';
import { IconSearch } from '../components/ui/Icon';
import { Badge, Card, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDebounced, useResource } from '../hooks/useResource';
import { iamApi } from '../lib/api';
import { formatDate, formatNumber, formatPrice } from '../lib/format';
import { statusLabel } from '../lib/orderStatus';
import type { ClientRow, CustomerRow, Paginated } from '../lib/types';
import styles from './Page.module.css';

const TIER_TONE: Record<string, 'gold' | 'info' | 'neutral'> = {
  oro: 'gold',
  gold: 'gold',
  plata: 'info',
  silver: 'info',
};

// Los seeds guardan el nivel en inglés; la interfaz habla español.
const TIER_LABEL: Record<string, string> = {
  gold: 'Oro',
  silver: 'Plata',
  bronze: 'Bronce',
  platinum: 'Platino',
};

export function Customers() {
  usePageTitle('Clientes');

  const [tab, setTab] = useState<'tienda' | 'mayoristas'>('tienda');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search);

  const customersLoader = useCallback(
    (signal: AbortSignal) =>
      iamApi.customers({ page, limit: 20, search: debouncedSearch || undefined }, signal),
    [page, debouncedSearch],
  );
  const {
    data: customers,
    loading: customersLoading,
    error: customersError,
  } = useResource<Paginated<CustomerRow>>(customersLoader, [page, debouncedSearch, tab]);

  const clientsLoader = useCallback(
    (signal: AbortSignal) =>
      iamApi.clients({ page, limit: 20, search: debouncedSearch || undefined }, signal),
    [page, debouncedSearch],
  );
  const {
    data: clients,
    loading: clientsLoading,
    error: clientsError,
  } = useResource<Paginated<ClientRow>>(clientsLoader, [page, debouncedSearch, tab]);

  const customerColumns: Column<CustomerRow>[] = [
    {
      key: 'name',
      header: 'Cliente',
      sortValue: (row) => row.name,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.name}</strong>
          <small>{row.email}</small>
        </span>
      ),
    },
    {
      key: 'phone',
      header: 'Teléfono',
      secondary: true,
      render: (row) => <span className={styles.muted}>{row.phone ?? '—'}</span>,
    },
    {
      key: 'tier',
      header: 'Nivel',
      sortValue: (row) => row.loyaltyTier ?? '',
      render: (row) =>
        row.loyaltyTier ? (
          <Badge tone={TIER_TONE[row.loyaltyTier.toLowerCase()] ?? 'neutral'}>
            {TIER_LABEL[row.loyaltyTier.toLowerCase()] ?? row.loyaltyTier}
          </Badge>
        ) : (
          <span className={styles.muted}>—</span>
        ),
    },
    {
      key: 'points',
      header: 'Puntos',
      align: 'right',
      sortValue: (row) => row.loyaltyPoints,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.loyaltyPoints)}</span>,
    },
    {
      key: 'createdAt',
      header: 'Alta',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.createdAt,
      render: (row) => <span className={styles.muted}>{formatDate(row.createdAt)}</span>,
    },
  ];

  const clientColumns: Column<ClientRow>[] = [
    {
      key: 'name',
      header: 'Razón social',
      sortValue: (row) => row.name,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.name}</strong>
          <small>{row.company ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'contact',
      header: 'Contacto',
      secondary: true,
      render: (row) => (
        <span className={styles.primaryCell}>
          <span>{row.email ?? '—'}</span>
          <small>{row.phone ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      sortValue: (row) => row.type ?? '',
      render: (row) => <span className={styles.muted}>{row.type ?? '—'}</span>,
    },
    {
      key: 'credit',
      header: 'Línea de crédito',
      align: 'right',
      sortValue: (row) => row.creditLimit ?? 0,
      render: (row) => (
        <span className={styles.numeric}>
          {row.creditLimit === null ? '—' : formatPrice(row.creditLimit)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'}>
          {statusLabel(row.status)}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Compradores de la tienda y cuentas mayoristas."
      />

      <div className={styles.toolbar}>
        <Tabs
          value={tab}
          options={[
            { value: 'tienda', label: 'Tienda', count: customers?.meta.total },
            { value: 'mayoristas', label: 'Mayoristas', count: clients?.meta.total },
          ]}
          onChange={(next) => {
            setTab(next);
            setPage(1);
            setSearch('');
          }}
        />
        <span className={styles.toolbarSpacer} />
        <div className={`${styles.toolbarSearch} ${styles.compactField}`}>
          <Input
            label="Buscar"
            type="search"
            placeholder={tab === 'tienda' ? 'Nombre o correo…' : 'Razón social o empresa…'}
            icon={<IconSearch size={16} />}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <Card padded={false}>
        {tab === 'tienda' ? (
          <>
            <DataTable
              columns={customerColumns}
              rows={customers?.data ?? []}
              rowKey={(row) => row.id}
              loading={customersLoading}
              error={customersError}
              emptyTitle="No hay clientes con esa búsqueda"
            />
            {customers && (
              <Pagination
                page={customers.meta.page}
                totalPages={customers.meta.total_pages}
                total={customers.meta.total}
                onChange={setPage}
              />
            )}
          </>
        ) : (
          <>
            <DataTable
              columns={clientColumns}
              rows={clients?.data ?? []}
              rowKey={(row) => row.id}
              loading={clientsLoading}
              error={clientsError}
              emptyTitle="No hay mayoristas con esa búsqueda"
            />
            {clients && (
              <Pagination
                page={clients.meta.page}
                totalPages={clients.meta.total_pages}
                total={clients.meta.total}
                onChange={setPage}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}
