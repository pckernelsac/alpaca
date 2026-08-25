import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ordersRepository } from '@/repositories/api';
import styles from './OrderTimeline.module.css';

export default function OrderTimeline() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        if (orderId) {
          const ordRes = await ordersRepository.getById(orderId);
          setOrder(ordRes?.data || ordRes);
          const evRes = await ordersRepository.getEvents(orderId);
          setEvents(evRes?.data || (Array.isArray(evRes) ? evRes : []));
        } else {
          const listRes = await ordersRepository.getAll({ perPage: 1 });
          const list = listRes?.data || (Array.isArray(listRes) ? listRes : []);
          if (list.length > 0) {
            setOrder(list[0]);
            const evRes = await ordersRepository.getEvents(list[0].id);
            setEvents(evRes?.data || (Array.isArray(evRes) ? evRes : []));
          }
        }
      } catch (err) {
        setError(err?.message || 'Error al cargar eventos de seguimiento');
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
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando línea de tiempo de eventos desde la API REST...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Inicio</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <Link to="/orders/list">Pedidos</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Seguimiento</span>
      </nav>

      <div className={styles.headerSection}>
        <div>
          <div className={styles.headerTop}>
            <h2 className={styles.pageTitle}>{order?.orderNumber || `#ORD-${order?.id || 'ID'}`}</h2>
            <span className={styles.statusBadge}>{order?.status || 'Active'}</span>
          </div>
          <p className={styles.pageDesc}>
            Historial de auditoría y ciclo de vida en tiempo real desde PostgreSQL.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link to="/orders/list" className={styles.btnOutline}>
            <span className="material-symbols-outlined">arrow_back</span>
            Volver a Lista
          </Link>
        </div>
      </div>

      {error && (
        <div style={{ padding: 16, marginBottom: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.timelineCol}>
          <div className={styles.timelineCard}>
            {events.length === 0 ? (
              <div style={{ padding: 30, textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--color-outline)' }}>history</span>
                <p style={{ marginTop: 8 }}>El pedido se encuentra registrado pero no registra hitos secundarios de tracking aún.</p>
              </div>
            ) : (
              events.map((evt, i) => (
                <div key={i} className={styles.event}>
                  <div className={`${styles.eventIcon} ${styles.eventIconActive}`}>
                    <span className="material-symbols-outlined">{evt.icon || 'check_circle'}</span>
                  </div>
                  <div className={styles.eventBody}>
                    <div className={styles.eventHeader}>
                      <div>
                        <h3 className={styles.eventTitle}>{evt.name || evt.title || 'Evento de Pedido'}</h3>
                        <p className={styles.eventMeta}>{evt.timestamp || evt.createdAt ? new Date(evt.timestamp || evt.createdAt).toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                    {evt.description && (
                      <div className={styles.eventNote}>
                        <p className={styles.noteTextMuted}>&ldquo;{evt.description}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
