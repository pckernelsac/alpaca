import { useCallback, useState } from 'react';

import { PageHeader } from '../components/layout/Shell';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Badge, Card } from '../components/ui/Primitives';
import type { BadgeTone } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { systemApi } from '../lib/api';
import { formatDateTime, formatRelative } from '../lib/format';
import type { AuditEntry, Paginated } from '../lib/types';
import styles from './Page.module.css';

const SEVERITY_TONE: Record<string, BadgeTone> = {
  info: 'info',
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
  warning: 'warning',
  error: 'danger',
};

export function Audit() {
  usePageTitle('Auditoría');
  const [page, setPage] = useState(1);

  const loader = useCallback(
    (signal: AbortSignal) => systemApi.audit({ page, limit: 25 }, signal),
    [page],
  );
  const { data, loading, error } = useResource<Paginated<AuditEntry>>(loader, [page]);

  const columns: Column<AuditEntry>[] = [
    {
      key: 'action',
      header: 'Acción',
      sortValue: (row) => row.action,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.action}</strong>
          <small>{row.description ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'module',
      header: 'Módulo',
      sortValue: (row) => row.module ?? '',
      render: (row) => <span className={styles.muted}>{row.module ?? '—'}</span>,
    },
    {
      key: 'severity',
      header: 'Severidad',
      sortValue: (row) => row.severity ?? '',
      render: (row) =>
        row.severity ? (
          <Badge tone={SEVERITY_TONE[row.severity.toLowerCase()] ?? 'neutral'}>
            {row.severity}
          </Badge>
        ) : (
          <span className={styles.muted}>—</span>
        ),
    },
    {
      key: 'ip',
      header: 'Origen',
      secondary: true,
      render: (row) => <span className={styles.muted}>{row.ipAddress ?? '—'}</span>,
    },
    {
      key: 'createdAt',
      header: 'Cuándo',
      align: 'right',
      sortValue: (row) => row.createdAt,
      render: (row) => (
        <span className={styles.muted} title={formatDateTime(row.createdAt)}>
          {formatRelative(row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Auditoría"
        description="Todo lo que el sistema registró, de lo más reciente a lo más viejo."
      />

      <Card padded={false}>
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          loading={loading}
          error={error}
          skeletonRows={8}
          emptyTitle="La bitácora está vacía"
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
