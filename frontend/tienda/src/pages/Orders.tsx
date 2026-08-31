import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { productPath } from '../lib/routes';

import { Button, ButtonLink } from '../components/ui/Button';
import { IconChevronLeft, IconPackage } from '../components/ui/Icon';
import { Alert, Badge, EmptyState, LoadingBlock, formatPrice } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError, mediaUrl, ordersApi } from '../lib/api';
import type { Order } from '../lib/types';
import { useToast } from '../providers/ToastProvider';
import styles from './Orders.module.css';
import { ORDER_STATUS } from './orderStatus';
import page from './Page.module.css';

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function Orders() {
  usePageTitle('Mis pedidos');

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ordersApi
      .list({ limit: 50 })
      .then((response) => setOrders(response.data))
      .catch((caught) =>
        setError(
          caught instanceof ApiRequestError ? caught.message : 'No pudimos cargar tus pedidos',
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <h1 className={page.title}>Mis pedidos</h1>
        <p className={page.subtitle}>El historial completo de tus compras.</p>
      </header>

      {loading ? (
        <LoadingBlock />
      ) : error ? (
        <Alert tone="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<IconPackage size={26} />}
          title="Todavía no hiciste pedidos"
          description="Cuando compres algo, vas a poder seguirlo desde acá."
          actions={<ButtonLink to="/catalogo">Ver el catálogo</ButtonLink>}
        />
      ) : (
        <ul className={styles.list} style={{ paddingBottom: 'var(--space-20)' }}>
          {orders.map((order) => {
            const status = ORDER_STATUS[order.status];
            return (
              <li key={order.id}>
                <Link to={`/pedidos/${order.id}`} className={styles.row}>
                  <div className={styles.rowMain}>
                    <div>
                      <p className={styles.number}>{order.orderNumber}</p>
                      <p className={styles.meta}>{formatDate(order.placedAt)}</p>
                    </div>
                    <div className={styles.thumbs}>
                      {order.items.slice(0, 4).map((item) =>
                        item.image ? (
                          <img key={item.id} src={mediaUrl(item.image) ?? undefined} alt="" loading="lazy" />
                        ) : (
                          <div key={item.id} className={styles.thumbBlank} />
                        ),
                      )}
                      {order.items.length > 4 && (
                        <span className={styles.thumbMore}>+{order.items.length - 4}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.rowSide}>
                    <Badge tone={status.tone}>{status.label}</Badge>
                    <strong className={styles.total}>{formatPrice(order.total)}</strong>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  usePageTitle(order ? `Pedido ${order.orderNumber}` : 'Pedido');

  useEffect(() => {
    if (!id) return;
    ordersApi
      .detail(id)
      .then(setOrder)
      .catch((caught) =>
        setError(
          caught instanceof ApiRequestError ? caught.message : 'No pudimos cargar el pedido',
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  async function cancel() {
    if (!id) return;
    setCancelling(true);
    try {
      setOrder(await ordersApi.cancel(id));
      toast.success('Pedido cancelado');
    } catch (caught) {
      toast.error(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos cancelar el pedido',
      );
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <LoadingBlock />;

  if (error || !order) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--space-20)' }}>
        <Alert tone="danger">{error ?? 'Pedido no encontrado'}</Alert>
      </div>
    );
  }

  const status = ORDER_STATUS[order.status];
  const canCancel = !['shipped', 'delivered', 'cancelled', 'refunded'].includes(order.status);

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-10) var(--space-8)' }}>
        <Link to="/pedidos" className={styles.back}>
          <IconChevronLeft size={16} />
          Volver a mis pedidos
        </Link>
        <div className={styles.detailHead}>
          <div>
            <h1 className={page.titleSm}>Pedido {order.orderNumber}</h1>
            <p className={styles.meta}>Realizado el {formatDate(order.placedAt)}</p>
          </div>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>
      </header>

      <div className={page.split} style={{ paddingTop: 0 }}>
        <div className={styles.detailMain}>
          <section className={page.card}>
            <h2 className={page.cardTitle}>Productos</h2>
            <ul className={styles.items}>
              {order.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  {item.image ? (
                    <img src={mediaUrl(item.image) ?? undefined} alt="" className={styles.itemThumb} loading="lazy" />
                  ) : (
                    <div className={styles.itemThumb} />
                  )}
                  <div className={styles.itemBody}>
                    <Link
                      to={productPath(item.productSlug, item.productId)}
                      className={styles.itemName}
                    >
                      {item.name}
                    </Link>
                    {item.variantLabel && <p className={styles.meta}>{item.variantLabel}</p>}
                    <p className={styles.meta}>
                      {item.quantity} × {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <strong>{formatPrice(item.total)}</strong>
                </li>
              ))}
            </ul>
          </section>

          {order.events && order.events.length > 0 && (
            <section className={page.card}>
              <h2 className={page.cardTitle}>Seguimiento</h2>
              <ol className={styles.timeline}>
                {order.events.map((event) => (
                  <li key={event.id} className={styles.event}>
                    <span className={styles.eventDot} />
                    <div>
                      <p className={styles.eventTitle}>{event.title ?? event.type}</p>
                      {event.description && (
                        <p className={styles.meta}>{event.description}</p>
                      )}
                      <p className={styles.eventDate}>
                        {new Date(event.createdAt).toLocaleString('es-PE', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className={page.aside}>
          <div className={page.card}>
            <h2 className={page.cardTitle}>Resumen</h2>
            <div className={page.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className={`${page.summaryRow} ${page.discount}`}>
                <span>Descuento</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className={page.summaryRow}>
              <span>IGV</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className={page.summaryRow}>
              <span>Envío</span>
              <span className={order.shippingFee === 0 ? page.free : undefined}>
                {order.shippingFee === 0 ? 'Gratis' : formatPrice(order.shippingFee)}
              </span>
            </div>
            <div className={page.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>

            <p className={styles.paidNote}>
              {order.paid ? 'Pago confirmado' : 'Pago pendiente'}
            </p>

            {canCancel && (
              <Button
                variant="danger"
                fullWidth
                onClick={() => void cancel()}
                loading={cancelling}
                style={{ marginTop: 'var(--space-4)' }}
              >
                Cancelar pedido
              </Button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
