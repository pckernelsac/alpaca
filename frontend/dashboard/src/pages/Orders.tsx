import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { PageHeader } from '../components/layout/Shell';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Input, Select, Textarea } from '../components/ui/Field';
import { IconAlert, IconChevronLeft, IconSearch } from '../components/ui/Icon';
import { Alert, Badge, Card, LoadingBlock, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDebounced, useResource } from '../hooks/useResource';
import { ApiRequestError, ordersApi } from '../lib/api';
import { formatDateTime, formatNumber, formatPrice } from '../lib/format';
import { ORDER_STATUS, nextStatuses } from '../lib/orderStatus';
import type { Order, OrderStatus, Paginated } from '../lib/types';
import { useToast } from '../providers/ToastProvider';
import styles from './Page.module.css';

const STATUS_TABS: { value: string; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmados' },
  { value: 'processing', label: 'En preparación' },
  { value: 'shipped', label: 'Enviados' },
  { value: 'delivered', label: 'Entregados' },
  { value: 'cancelled', label: 'Cancelados' },
];

export function Orders() {
  usePageTitle('Pedidos');
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  // El buscador de la barra superior deja el término en la URL.
  const search = params.get('buscar') ?? '';
  const debouncedSearch = useDebounced(search);

  const loader = useCallback(
    (signal: AbortSignal) =>
      ordersApi.list(
        { page, limit: 20, status: status || undefined, search: debouncedSearch || undefined },
        signal,
      ),
    [page, status, debouncedSearch],
  );

  const { data, loading, error } = useResource<Paginated<Order>>(loader, [
    page,
    status,
    debouncedSearch,
  ]);

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Pedido',
      sortValue: (row) => row.orderNumber,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.orderNumber}</strong>
          <small>{formatDateTime(row.placedAt ?? row.createdAt)}</small>
        </span>
      ),
    },
    {
      key: 'channel',
      header: 'Canal',
      secondary: true,
      sortValue: (row) => row.channel ?? '',
      render: (row) => <span className={styles.muted}>{row.channel ?? '—'}</span>,
    },
    {
      key: 'items',
      header: 'Piezas',
      align: 'right',
      secondary: true,
      sortValue: (row) => row.itemCount,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.itemCount)}</span>,
    },
    {
      key: 'paid',
      header: 'Pago',
      secondary: true,
      sortValue: (row) => (row.paid ? 1 : 0),
      render: (row) =>
        row.paid ? <Badge tone="success">pagado</Badge> : <Badge tone="warning">pendiente</Badge>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => (
        <Badge tone={ORDER_STATUS[row.status].tone}>{ORDER_STATUS[row.status].label}</Badge>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      align: 'right',
      sortValue: (row) => row.total,
      render: (row) => <span className={styles.numeric}>{formatPrice(row.total)}</span>,
    },
  ];

  return (
    <>
      <PageHeader title="Pedidos" description="Todo lo que entró por la tienda y por mayoristas." />

      <div className={styles.toolbar}>
        <Tabs
          value={status}
          options={STATUS_TABS}
          onChange={(next) => {
            setStatus(next);
            setPage(1);
          }}
        />
        <span className={styles.toolbarSpacer} />
        <div className={`${styles.toolbarSearch} ${styles.compactField}`}>
          <Input
            label="Buscar"
            type="search"
            placeholder="Número de pedido…"
            icon={<IconSearch size={16} />}
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setParams(value ? { buscar: value } : {}, { replace: true });
              setPage(1);
            }}
          />
        </div>
      </div>

      <Card padded={false}>
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          loading={loading}
          error={error}
          onRowClick={(row) => navigate(`/pedidos/${row.id}`)}
          emptyTitle="No hay pedidos con esos filtros"
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

/* -------------------------------------------------------------------------- */
/* Detalle                                                                    */
/* -------------------------------------------------------------------------- */
export function OrderDetail() {
  const { id = '' } = useParams();
  const toast = useToast();

  const loader = useCallback((signal: AbortSignal) => ordersApi.detail(id, signal), [id]);
  const { data: order, loading, error, setData } = useResource<Order>(loader, [id]);

  usePageTitle(order ? `Pedido ${order.orderNumber}` : 'Pedido');

  const [nextStatus, setNextStatus] = useState<OrderStatus | ''>('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  async function applyStatus(event: React.FormEvent) {
    event.preventDefault();
    if (!order || !nextStatus) return;
    setSaving(true);
    try {
      const updated = await ordersApi.updateStatus(order.id, nextStatus, note || undefined);
      setData(updated);
      setNextStatus('');
      setNote('');
      toast.success(`El pedido pasó a "${ORDER_STATUS[updated.status].label}"`);
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos cambiar el estado',
      );
    } finally {
      setSaving(false);
    }
  }

  async function cancel() {
    if (!order) return;
    setCancelling(true);
    try {
      setData(await ordersApi.cancel(order.id));
      toast.success('Pedido cancelado');
      setConfirmCancel(false);
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos cancelarlo');
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <LoadingBlock label="Cargando pedido" />;
  if (error || !order) {
    return (
      <>
        <PageHeader title="Pedido" />
        <Alert tone="danger" icon={<IconAlert size={16} />}>
          {error ?? 'No encontramos el pedido'}
        </Alert>
      </>
    );
  }

  const options = nextStatuses(order.status);

  return (
    <>
      <PageHeader
        title={order.orderNumber}
        description={`Recibido el ${formatDateTime(order.placedAt ?? order.createdAt)}`}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => history.back()}>
              <IconChevronLeft size={16} />
              Volver
            </Button>
            {!['shipped', 'delivered', 'cancelled'].includes(order.status) && (
              <Button variant="danger" size="sm" onClick={() => setConfirmCancel(true)}>
                Cancelar pedido
              </Button>
            )}
          </>
        }
      />

      <div className={styles.toolbar}>
        <Badge tone={ORDER_STATUS[order.status].tone}>{ORDER_STATUS[order.status].label}</Badge>
        {order.paid ? (
          <Badge tone="success">pagado</Badge>
        ) : (
          <Badge tone="warning">pago pendiente</Badge>
        )}
        {order.customerId && (
          <Link to={`/clientes?cliente=${order.customerId}`} className={styles.muted}>
            Ver cliente
          </Link>
        )}
      </div>

      <div className={styles.split}>
        <div className={styles.stack}>
          <Card title="Piezas" padded={false}>
            <DataTable
              columns={
                [
                  {
                    key: 'name',
                    header: 'Producto',
                    render: (item) => (
                      <span className={styles.primaryCell}>
                        <strong>{item.name}</strong>
                        <small>
                          {[item.sku, item.variantLabel].filter(Boolean).join(' · ') || '—'}
                        </small>
                      </span>
                    ),
                  },
                  {
                    key: 'unitPrice',
                    header: 'Unitario',
                    align: 'right',
                    render: (item) => (
                      <span className={styles.numeric}>{formatPrice(item.unitPrice)}</span>
                    ),
                  },
                  {
                    key: 'quantity',
                    header: 'Cant.',
                    align: 'right',
                    render: (item) => <span className={styles.numeric}>{item.quantity}</span>,
                  },
                  {
                    key: 'total',
                    header: 'Total',
                    align: 'right',
                    render: (item) => (
                      <span className={styles.numeric}>{formatPrice(item.total)}</span>
                    ),
                  },
                ] as Column<Order['items'][number]>[]
              }
              rows={order.items}
              rowKey={(item) => item.id}
              emptyTitle="El pedido no tiene piezas"
            />
          </Card>

          <Card title="Historial">
            {order.events && order.events.length > 0 ? (
              <ol className={styles.timeline}>
                {order.events.map((event) => (
                  <li key={event.id} className={styles.timelineItem}>
                    <strong>{event.title}</strong>
                    {event.description && <p className={styles.muted}>{event.description}</p>}
                    <span className={styles.timelineTime}>{formatDateTime(event.createdAt)}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.muted}>Sin movimientos registrados.</p>
            )}
          </Card>
        </div>

        <div className={styles.stack}>
          <Card title="Totales">
            <dl className={styles.definitionList}>
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
              <dt>Descuento</dt>
              <dd>{order.discount ? `− ${formatPrice(order.discount)}` : formatPrice(0)}</dd>
              <dt>Envío</dt>
              <dd>{formatPrice(order.shippingFee)}</dd>
              <dt>Impuestos</dt>
              <dd>{formatPrice(order.tax)}</dd>
              <dt>
                <strong>Total</strong>
              </dt>
              <dd>
                <strong>{formatPrice(order.total)}</strong>
              </dd>
            </dl>
          </Card>

          <Card title="Cambiar estado">
            {options.length === 0 ? (
              <p className={styles.muted}>
                Un pedido {ORDER_STATUS[order.status].label.toLowerCase()} ya no admite más
                cambios.
              </p>
            ) : (
              <form className={styles.stack} onSubmit={applyStatus}>
                <Select
                  label="Nuevo estado"
                  value={nextStatus}
                  onChange={(event) => setNextStatus(event.target.value as OrderStatus)}
                  required
                >
                  <option value="">Elegí un estado</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {ORDER_STATUS[option].label}
                    </option>
                  ))}
                </Select>

                <Textarea
                  label="Nota"
                  hint="Queda en el historial del pedido."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                />

                <Button type="submit" size="sm" loading={saving} disabled={!nextStatus}>
                  Aplicar cambio
                </Button>
              </form>
            )}
          </Card>

          {order.notes && (
            <Card title="Notas del cliente">
              <p className={styles.muted}>{order.notes}</p>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancelar pedido"
        message={`El pedido ${order.orderNumber} pasará a cancelado. La acción queda registrada en el historial.`}
        confirmLabel="Cancelar pedido"
        cancelLabel="Volver"
        loading={cancelling}
        onConfirm={cancel}
        onCancel={() => setConfirmCancel(false)}
      />
    </>
  );
}
