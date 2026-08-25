import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { MonthlySalesChart, RankedProducts } from '../components/charts/Charts';
import { PageHeader } from '../components/layout/Shell';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { IconAlert, IconBag, IconBoxes, IconCoin, IconUsers } from '../components/ui/Icon';
import { Alert, Badge, Card, LoadingBlock } from '../components/ui/Primitives';
import { StatCard } from '../components/ui/StatCard';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { analyticsApi, inventoryApi, ordersApi } from '../lib/api';
import { formatDate, formatNumber, formatPrice } from '../lib/format';
import { ORDER_STATUS } from '../lib/orderStatus';
import type { Kpis, MonthlySales, Order, StockRow, TopProduct } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import styles from './Page.module.css';

interface OverviewData {
  kpis: Kpis;
  sales: MonthlySales[];
  top: TopProduct[];
  orders: Order[];
  lowStock: StockRow[];
}

export function Overview() {
  usePageTitle('Panel');
  const { user } = useAuth();

  // Una sola carga en paralelo: cinco useResource independientes dispararían
  // cinco ciclos de render con esqueletos desincronizados.
  const loader = useCallback(async (signal: AbortSignal): Promise<OverviewData> => {
    const [kpis, sales, top, orders, lowStock] = await Promise.all([
      analyticsApi.kpis(signal),
      analyticsApi.salesByMonth(6, signal),
      analyticsApi.topProducts(6, signal),
      ordersApi.list({ limit: 6 }, signal),
      inventoryApi.stock({ low_stock: true, limit: 5 }, signal),
    ]);
    return { kpis, sales, top, orders: orders.data, lowStock: lowStock.data };
  }, []);

  const { data, loading, error } = useResource<OverviewData>(loader);

  const orderColumns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Pedido',
      render: (row) => (
        <Link to={`/pedidos/${row.id}`} className={styles.primaryCell}>
          <strong>{row.orderNumber}</strong>
          <small>{formatDate(row.placedAt ?? row.createdAt)}</small>
        </Link>
      ),
    },
    {
      key: 'items',
      header: 'Piezas',
      align: 'right',
      secondary: true,
      render: (row) => <span className={styles.numeric}>{formatNumber(row.itemCount)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => (
        <Badge tone={ORDER_STATUS[row.status].tone}>{ORDER_STATUS[row.status].label}</Badge>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      align: 'right',
      render: (row) => <span className={styles.numeric}>{formatPrice(row.total)}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title={`Hola, ${user?.name?.split(' ')[0] ?? ''}`}
        description="Resumen de la operación de los últimos 30 días."
      />

      {error && <Alert tone="danger" icon={<IconAlert size={16} />}>{error}</Alert>}

      <div className={styles.statGrid}>
        <StatCard
          label="Ingresos totales"
          value={formatPrice(data?.kpis.revenue ?? 0)}
          hint={`${formatPrice(data?.kpis.revenueMonth ?? 0)} en los últimos 30 días`}
          icon={<IconCoin size={16} />}
          tone="gold"
          loading={loading}
        />
        <StatCard
          label="Pedidos"
          value={formatNumber(data?.kpis.ordersTotal ?? 0)}
          hint={`${formatNumber(data?.kpis.ordersPending ?? 0)} pendientes de atención`}
          icon={<IconBag size={16} />}
          to="/pedidos"
          loading={loading}
        />
        <StatCard
          label="Ticket promedio"
          value={formatPrice(data?.kpis.averageTicket ?? 0)}
          hint={`${formatNumber(data?.kpis.customersTotal ?? 0)} clientes registrados`}
          icon={<IconUsers size={16} />}
          to="/clientes"
          loading={loading}
        />
        <StatCard
          label="Stock bajo"
          value={formatNumber(data?.kpis.lowStockCount ?? 0)}
          hint={`${formatNumber(data?.kpis.productsActive ?? 0)} productos activos`}
          icon={<IconBoxes size={16} />}
          tone={data?.kpis.lowStockCount ? 'warning' : 'neutral'}
          to="/inventario"
          loading={loading}
        />
      </div>

      <div className={styles.split}>
        <Card title="Ventas por mes">
          {loading || !data ? <LoadingBlock /> : <MonthlySalesChart data={data.sales} />}
        </Card>

        <Card title="Más vendidos">
          {loading || !data ? <LoadingBlock /> : <RankedProducts data={data.top} />}
        </Card>
      </div>

      <div className={styles.split}>
        <Card
          title="Últimos pedidos"
          action={
            <Link to="/pedidos" className={styles.muted}>
              Ver todos
            </Link>
          }
          padded={false}
        >
          <DataTable
            columns={orderColumns}
            rows={data?.orders ?? []}
            rowKey={(row) => row.id}
            loading={loading}
            skeletonRows={5}
            emptyTitle="Todavía no hay pedidos"
          />
        </Card>

        <Card title="Reponer pronto">
          {loading || !data ? (
            <LoadingBlock />
          ) : data.lowStock.length === 0 ? (
            <p className={styles.muted}>Ninguna variante está por debajo del mínimo.</p>
          ) : (
            <ul className={styles.stack}>
              {data.lowStock.map((row) => (
                <li key={row.id} className={styles.primaryCell}>
                  <strong>{row.productName ?? row.sku ?? `Ítem ${row.id}`}</strong>
                  <small>
                    {row.warehouse ?? 'Sin almacén'} · quedan {formatNumber(row.available)} de un
                    mínimo de {formatNumber(row.minStock)}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
