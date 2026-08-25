import { useCallback, useState } from 'react';

import { PageHeader } from '../components/layout/Shell';
import { Button } from '../components/ui/Button';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Drawer } from '../components/ui/Drawer';
import { Checkbox, Input, Select, Textarea } from '../components/ui/Field';
import { IconMinus, IconPlus } from '../components/ui/Icon';
import { Badge, Card, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { ApiRequestError, inventoryApi } from '../lib/api';
import { formatDateTime, formatNumber } from '../lib/format';
import type { Paginated, StockMovement, StockRow, Warehouse } from '../lib/types';
import { useToast } from '../providers/ToastProvider';
import styles from './Page.module.css';

export function Inventory() {
  usePageTitle('Inventario');
  const toast = useToast();

  const [tab, setTab] = useState<'stock' | 'movimientos'>('stock');
  const [page, setPage] = useState(1);
  const [warehouse, setWarehouse] = useState('');
  const [onlyLow, setOnlyLow] = useState(false);

  const [adjusting, setAdjusting] = useState<StockRow | null>(null);
  const [delta, setDelta] = useState('0');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const warehousesLoader = useCallback((signal: AbortSignal) => inventoryApi.warehouses(signal), []);
  const { data: warehouses } = useResource<Warehouse[]>(warehousesLoader);

  const stockLoader = useCallback(
    (signal: AbortSignal) =>
      inventoryApi.stock(
        {
          page,
          limit: 20,
          warehouse_id: warehouse ? Number(warehouse) : undefined,
          low_stock: onlyLow || undefined,
        },
        signal,
      ),
    [page, warehouse, onlyLow],
  );
  const {
    data: stock,
    loading,
    error,
    reload,
  } = useResource<Paginated<StockRow>>(stockLoader, [page, warehouse, onlyLow]);

  const [movementsPage, setMovementsPage] = useState(1);
  const movementsLoader = useCallback(
    (signal: AbortSignal) => inventoryApi.movements({ page: movementsPage, limit: 20 }, signal),
    [movementsPage],
  );
  const {
    data: movements,
    loading: movementsLoading,
    error: movementsError,
    reload: reloadMovements,
  } = useResource<Paginated<StockMovement>>(movementsLoader, [movementsPage]);

  function openAdjust(row: StockRow) {
    setAdjusting(row);
    setDelta('0');
    setReason('');
  }

  async function submitAdjust(event: React.FormEvent) {
    event.preventDefault();
    if (!adjusting) return;

    const quantity = Number(delta);
    if (!Number.isInteger(quantity) || quantity === 0) {
      toast.error('El ajuste tiene que ser un entero distinto de cero');
      return;
    }

    setSaving(true);
    try {
      await inventoryApi.adjust({
        stock_item_id: adjusting.id,
        quantity,
        reason: reason || undefined,
      });
      const units = Math.abs(quantity);
      const noun = units === 1 ? 'unidad' : 'unidades';
      toast.success(
        quantity > 0
          ? `Se ${units === 1 ? 'sumó' : 'sumaron'} ${formatNumber(units)} ${noun}`
          : `Se ${units === 1 ? 'descontó' : 'descontaron'} ${formatNumber(units)} ${noun}`,
      );
      setAdjusting(null);
      reload();
      // El movimiento nuevo también cambia la pestaña de historial.
      reloadMovements();
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos ajustar el stock',
      );
    } finally {
      setSaving(false);
    }
  }

  const stockColumns: Column<StockRow>[] = [
    {
      key: 'product',
      header: 'Variante',
      sortValue: (row) => row.productName ?? '',
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.productName ?? 'Sin producto'}</strong>
          <small>{[row.sku, row.variantLabel].filter(Boolean).join(' · ') || '—'}</small>
        </span>
      ),
    },
    {
      key: 'warehouse',
      header: 'Almacén',
      secondary: true,
      sortValue: (row) => row.warehouse ?? '',
      render: (row) => <span className={styles.muted}>{row.warehouse ?? '—'}</span>,
    },
    {
      key: 'quantity',
      header: 'En stock',
      align: 'right',
      sortValue: (row) => row.quantity,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.quantity)}</span>,
    },
    {
      key: 'reserved',
      header: 'Reservado',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.reserved,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.reserved)}</span>,
    },
    {
      key: 'available',
      header: 'Disponible',
      align: 'right',
      sortValue: (row) => row.available,
      render: (row) => (
        <span className={styles.numeric}>
          {row.lowStock ? (
            <Badge tone="warning">{formatNumber(row.available)}</Badge>
          ) : (
            formatNumber(row.available)
          )}
        </span>
      ),
    },
    {
      key: 'minStock',
      header: 'Mínimo',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.minStock,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.minStock)}</span>,
    },
    {
      key: 'actions',
      header: '',
      width: '7rem',
      render: (row) => (
        <div className={styles.rowActions}>
          <Button variant="secondary" size="sm" onClick={() => openAdjust(row)}>
            Ajustar
          </Button>
        </div>
      ),
    },
  ];

  const movementColumns: Column<StockMovement>[] = [
    {
      key: 'movementNumber',
      header: 'Movimiento',
      sortValue: (row) => row.movementNumber,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.movementNumber}</strong>
          <small>{formatDateTime(row.createdAt)}</small>
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      sortValue: (row) => row.type,
      render: (row) => (
        <Badge tone={row.type === 'entrada' ? 'success' : 'neutral'}>{row.type}</Badge>
      ),
    },
    {
      key: 'quantity',
      header: 'Cantidad',
      align: 'right',
      sortValue: (row) => row.quantity,
      render: (row) => (
        <span className={styles.numeric}>
          {row.type === 'entrada' ? '+' : '−'}
          {formatNumber(row.quantity)}
        </span>
      ),
    },
    {
      key: 'balance',
      header: 'Saldo',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.balance ?? 0,
      render: (row) => (
        <span className={styles.numeric}>
          {row.balance === null ? '—' : formatNumber(row.balance)}
        </span>
      ),
    },
    {
      key: 'reason',
      header: 'Motivo',
      secondary: true,
      render: (row) => <span className={styles.muted}>{row.reason ?? '—'}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title="Inventario"
        description="Existencias por variante y almacén, con su historial de movimientos."
      />

      <div className={styles.toolbar}>
        <Tabs
          value={tab}
          options={[
            { value: 'stock', label: 'Existencias' },
            { value: 'movimientos', label: 'Movimientos' },
          ]}
          onChange={setTab}
        />

        {tab === 'stock' && (
          <>
            <span className={styles.toolbarSpacer} />
            <div className={styles.compactField}>
              <Select
                label="Almacén"
                value={warehouse}
                onChange={(event) => {
                  setWarehouse(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">Todos los almacenes</option>
                {warehouses?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <Checkbox
              label="Solo stock bajo"
              checked={onlyLow}
              onChange={(event) => {
                setOnlyLow(event.target.checked);
                setPage(1);
              }}
            />
          </>
        )}
      </div>

      {tab === 'stock' ? (
        <Card padded={false}>
          <DataTable
            columns={stockColumns}
            rows={stock?.data ?? []}
            rowKey={(row) => row.id}
            loading={loading}
            error={error}
            emptyTitle="No hay existencias con esos filtros"
          />
          {stock && (
            <Pagination
              page={stock.meta.page}
              totalPages={stock.meta.total_pages}
              total={stock.meta.total}
              onChange={setPage}
            />
          )}
        </Card>
      ) : (
        <Card padded={false}>
          <DataTable
            columns={movementColumns}
            rows={movements?.data ?? []}
            rowKey={(row) => row.id}
            loading={movementsLoading}
            error={movementsError}
            emptyTitle="Todavía no hay movimientos"
          />
          {movements && (
            <Pagination
              page={movements.meta.page}
              totalPages={movements.meta.total_pages}
              total={movements.meta.total}
              onChange={setMovementsPage}
            />
          )}
        </Card>
      )}

      <Drawer
        open={adjusting !== null}
        title="Ajustar existencias"
        description={adjusting?.productName ?? undefined}
        onClose={() => setAdjusting(null)}
        width="26rem"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setAdjusting(null)} disabled={saving}>
              Cancelar
            </Button>
            <Button size="sm" type="submit" form="adjust-form" loading={saving}>
              Registrar ajuste
            </Button>
          </>
        }
      >
        <dl className={styles.definitionList}>
          <dt>Almacén</dt>
          <dd>{adjusting?.warehouse ?? '—'}</dd>
          <dt>En stock</dt>
          <dd>{formatNumber(adjusting?.quantity ?? 0)}</dd>
          <dt>Reservado</dt>
          <dd>{formatNumber(adjusting?.reserved ?? 0)}</dd>
          <dt>Mínimo</dt>
          <dd>{formatNumber(adjusting?.minStock ?? 0)}</dd>
        </dl>

        <form id="adjust-form" className={styles.stack} onSubmit={submitAdjust}>
          <div className={styles.toolbar}>
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              type="button"
              aria-label="Restar una unidad"
              onClick={() => setDelta(String(Number(delta) - 1))}
            >
              <IconMinus size={16} />
            </Button>
            <div style={{ flex: 1 }}>
              <Input
                label="Ajuste"
                type="number"
                step={1}
                value={delta}
                onChange={(event) => setDelta(event.target.value)}
                hint="Positivo suma, negativo descuenta."
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              type="button"
              aria-label="Sumar una unidad"
              onClick={() => setDelta(String(Number(delta) + 1))}
            >
              <IconPlus size={16} />
            </Button>
          </div>

          <Textarea
            label="Motivo"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
            placeholder="Recuento físico, merma, devolución…"
          />

          <p className={styles.muted}>
            Quedará en stock: <strong>{formatNumber((adjusting?.quantity ?? 0) + Number(delta || 0))}</strong>
          </p>
        </form>
      </Drawer>
    </>
  );
}
