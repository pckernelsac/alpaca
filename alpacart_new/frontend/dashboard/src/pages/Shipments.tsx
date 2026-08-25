import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '../components/layout/Shell';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Badge, Card } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { inventoryApi } from '../lib/api';
import { formatDateTime } from '../lib/format';
import { statusLabel } from '../lib/orderStatus';
import type { Paginated, Shipment } from '../lib/types';
import styles from './Page.module.css';

const STATUS_TONE: Record<string, 'success' | 'gold' | 'warning' | 'neutral'> = {
  entregado: 'success',
  delivered: 'success',
  en_transito: 'gold',
  in_transit: 'gold',
  pendiente: 'warning',
  pending: 'warning',
};

export function Shipments() {
  usePageTitle('Envíos');
  const [page, setPage] = useState(1);

  const loader = useCallback(
    (signal: AbortSignal) => inventoryApi.shipments({ page, limit: 20 }, signal),
    [page],
  );
  const { data, loading, error } = useResource<Paginated<Shipment>>(loader, [page]);

  const columns: Column<Shipment>[] = [
    {
      key: 'waybill',
      header: 'Guía',
      sortValue: (row) => row.waybill ?? '',
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.waybill ?? '—'}</strong>
          <small>{row.carrier ?? 'Sin transportista'}</small>
        </span>
      ),
    },
    {
      key: 'route',
      header: 'Ruta',
      secondary: true,
      render: (row) => (
        <span className={styles.muted}>
          {row.originCity ?? '—'} → {row.destinationCity ?? '—'}
        </span>
      ),
    },
    {
      key: 'dispatchedAt',
      header: 'Despacho',
      secondary: true,
      sortValue: (row) => row.dispatchedAt ?? '',
      render: (row) => <span className={styles.muted}>{formatDateTime(row.dispatchedAt)}</span>,
    },
    {
      key: 'deliveredAt',
      header: 'Entrega',
      secondary: true,
      sortValue: (row) => row.deliveredAt ?? '',
      render: (row) => <span className={styles.muted}>{formatDateTime(row.deliveredAt)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => (
        <Badge tone={STATUS_TONE[row.status?.toLowerCase()] ?? 'neutral'}>
          {statusLabel(row.status)}
        </Badge>
      ),
    },
    {
      key: 'order',
      header: 'Pedido',
      align: 'right',
      render: (row) => (
        <Link to={`/pedidos/${row.orderId}`} className={styles.muted}>
          Ver pedido
        </Link>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Envíos" description="Guías despachadas y su estado de entrega." />

      <Card padded={false}>
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          loading={loading}
          error={error}
          emptyTitle="Todavía no hay envíos"
          emptyDescription="Los envíos se generan cuando un pedido pasa a despachado."
        />
        {data && (
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.total_pages}
            total={data.meta.total}
            onChange={setPage}
          />
        )}
      </Card>
    </>
  );
}
