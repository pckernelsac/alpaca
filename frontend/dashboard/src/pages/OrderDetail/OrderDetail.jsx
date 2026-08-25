import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ordersRepository } from '@/repositories/api';
import styles from './OrderDetail.module.css';

export default function OrderDetail() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        if (orderId) {
          const res = await ordersRepository.getById(orderId);
          setOrder(res?.data || res);
        } else {
          const listRes = await ordersRepository.getAll({ perPage: 1 });
          const list = listRes?.data || (Array.isArray(listRes) ? listRes : []);
          if (list.length > 0) {
            setOrder(list[0]);
          } else {
            setError('No se especificó ID de pedido y no existen pedidos en base de datos.');
          }
        }
      } catch (err) {
        setError(err?.message || 'Error al consultar detalle del pedido en backend');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orderId]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando detalle del pedido desde la API REST...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.page}>
        <div style={{ padding: 24, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h3 style={{ color: 'var(--color-error)', margin: 0 }}>Error al obtener pedido</h3>
          <p style={{ marginTop: 8, color: 'var(--color-on-surface)' }}>{error || 'Pedido no encontrado'}</p>
          <Link to="/orders/list" style={{ marginTop: 12, display: 'inline-block', color: 'var(--color-primary)', textDecoration: 'underline' }}>
            Volver a la lista de pedidos
          </Link>
        </div>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = Number(order.subtotal || order.total || 0);
  const total = Number(order.total || 0);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Inicio</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <Link to="/orders/list">Pedidos</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Detalle del Pedido</span>
      </nav>

      <div className={styles.headerSection}>
        <div>
          <div className={styles.headerTop}>
            <h2 className={styles.pageTitle}>{order.orderNumber || `#ORD-${order.id}`}</h2>
            <span className={styles.statusBadge}>{order.status || 'pending'}</span>
          </div>
          <p className={styles.pageDesc}>
            Registrado el {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link to="/orders/list" className={styles.btnOutline}>
            <span className="material-symbols-outlined">arrow_back</span>
            Volver a Lista
          </Link>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.twoColGrid}>
            <div className={styles.card}>
              <div className={styles.cardAccent} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Información de la Orden</h3>
                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <span>ID de Pedido</span>
                    <span className={styles.infoValue}>{order.id}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>N° Referencia</span>
                    <span className={styles.infoValue}>{order.orderNumber || 'N/A'}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Estado de Pago</span>
                    <span className={styles.infoValue}>{order.paid ? 'Pagado (100%)' : 'Pendiente'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.financialCard}`}>
              <h3 className={styles.cardTitle}>Resumen Financiero</h3>
              <div className={styles.financialRows}>
                <div className={styles.financialRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <div>
                    <span className={styles.totalLabel}>Monto Total</span>
                    <p className={styles.totalValue}>${total.toFixed(2)}</p>
                  </div>
                  <span className={order.paid ? styles.paidBadge : styles.unpaidBadge}>
                    {order.paid ? 'PAGADO' : 'PENDIENTE'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.cardTitle}>Ítems de la Orden ({items.length})</h3>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>SKU</th>
                    <th className={styles.thCenter}>Cantidad</th>
                    <th className={styles.thRight}>Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--color-on-surface-variant)' }}>
                        No hay ítems desglosados en este pedido.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, i) => (
                      <tr key={i} className={styles.tableRow}>
                        <td className={styles.productName}>{item.productName || item.name || `Producto #${item.productId}`}</td>
                        <td className={styles.skuCell}>{item.sku || 'N/A'}</td>
                        <td className={styles.tdCenter}>{item.quantity || item.qty || 1}</td>
                        <td className={styles.tdRight}>${Number(item.unitPrice || item.price || 0).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
