import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, ButtonLink } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { IconBag, IconHeart, IconPackage, IconUser } from '../components/ui/Icon';
import { Badge, formatPrice } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useWishlist } from '../hooks/useWishlist';
import { ApiRequestError, authApi, ordersApi } from '../lib/api';
import type { Order } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import { ORDER_STATUS } from './orderStatus';
import styles from './Account.module.css';
import page from './Page.module.css';

export function Account() {
  usePageTitle('Mi cuenta');

  const navigate = useNavigate();
  const toast = useToast();
  const { user, logout, refresh } = useAuth();
  const { items: favourites } = useWishlist();

  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({
    first_name: user?.firstName ?? '',
    last_name: user?.lastName ?? '',
    phone: user?.phone ?? '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    ordersApi
      .list({ limit: 3 })
      .then((response) => setOrders(response.data))
      .catch(() => setOrders([]));
  }, []);

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      await authApi.updateProfile({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: form.phone.trim(),
      });
      await refresh();
      toast.success('Datos actualizados');
    } catch (error) {
      toast.error(
        error instanceof ApiRequestError ? error.message : 'No pudimos guardar los cambios',
      );
    } finally {
      setSaving(false);
    }
  }

  function signOut() {
    logout();
    navigate('/');
    toast.notify('Cerraste sesión');
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <p className="eyebrow">Mi cuenta</p>
        <h1 className={page.title}>Hola, {user?.firstName}</h1>
        <p className={page.subtitle}>{user?.email}</p>
      </header>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <IconPackage size={20} />
          <div>
            <strong>{orders.length}</strong>
            <span>Pedidos recientes</span>
          </div>
        </div>
        <div className={styles.stat}>
          <IconHeart size={20} />
          <div>
            <strong>{favourites.length}</strong>
            <span>Favoritos</span>
          </div>
        </div>
        <div className={styles.stat}>
          <IconBag size={20} />
          <div>
            <strong>{formatPrice(totalSpent)}</strong>
            <span>Últimas compras</span>
          </div>
        </div>
        {user?.loyaltyTier && (
          <div className={styles.stat}>
            <IconUser size={20} />
            <div>
              <strong style={{ textTransform: 'capitalize' }}>{user.loyaltyTier}</strong>
              <span>{user.loyaltyPoints ?? 0} puntos</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <section className={page.card}>
          <h2 className={page.cardTitle}>Datos personales</h2>
          <form className={page.form} onSubmit={save}>
            <div className={page.formRow}>
              <Input
                label="Nombre"
                value={form.first_name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, first_name: event.target.value }))
                }
              />
              <Input
                label="Apellido"
                value={form.last_name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, last_name: event.target.value }))
                }
              />
            </div>
            <Input label="Correo" value={user?.email ?? ''} disabled />
            <Input
              type="tel"
              label="Teléfono"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
            />
            <div className={styles.formActions}>
              <Button type="submit" loading={saving}>
                Guardar cambios
              </Button>
              <Button type="button" variant="ghost" onClick={signOut}>
                Cerrar sesión
              </Button>
            </div>
          </form>
        </section>

        <section className={page.card}>
          <h2 className={page.cardTitle}>Pedidos recientes</h2>

          {orders.length === 0 ? (
            <div className={styles.emptyOrders}>
              <p>Todavía no hiciste ningún pedido.</p>
              <ButtonLink to="/catalogo" variant="secondary" size="sm">
                Ver catálogo
              </ButtonLink>
            </div>
          ) : (
            <>
              <ul className={styles.orders}>
                {orders.map((order) => {
                  const status = ORDER_STATUS[order.status];
                  return (
                    <li key={order.id}>
                      <Link to={`/pedidos/${order.id}`} className={styles.order}>
                        <div>
                          <p className={styles.orderNumber}>{order.orderNumber}</p>
                          <p className={styles.orderMeta}>
                            {order.placedAt
                              ? new Date(order.placedAt).toLocaleDateString('es-PE', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : '—'}{' '}
                            · {order.itemCount} {order.itemCount === 1 ? 'pieza' : 'piezas'}
                          </p>
                        </div>
                        <div className={styles.orderRight}>
                          <Badge tone={status.tone}>{status.label}</Badge>
                          <strong>{formatPrice(order.total)}</strong>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ButtonLink to="/pedidos" variant="link">
                Ver todos mis pedidos
              </ButtonLink>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
