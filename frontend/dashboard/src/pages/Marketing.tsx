import { useCallback, useState } from 'react';

import { CmsResource } from '../components/cms/CmsResource';
import type { CampoDef } from '../components/cms/CmsResource';
import { PageHeader } from '../components/layout/Shell';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Badge, Card, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { marketingApi } from '../lib/api';
import {
  formatDate,
  formatDateTime,
  formatDayOnly,
  formatNumber,
  formatPrice,
} from '../lib/format';
import { statusLabel } from '../lib/orderStatus';
import type {
  Campaign,
  ContactMessage,
  Coupon,
  Paginated,
  Promotion,
  Subscriber,
} from '../lib/types';
import styles from './Page.module.css';

type Tab = 'cupones' | 'promociones' | 'campanias' | 'suscriptores' | 'consultas';

/** Un `datetime-local` no entra en un input date; el backend acepta ISO, así
 *  que se corta y se completa la hora al ida y vuelta. */
function aFecha(iso: string | null): string {
  return iso ? iso.slice(0, 10) : '';
}

function aISO(fecha: unknown, momento: 'inicio' | 'fin' = 'inicio'): string | null {
  const texto = String(fecha ?? '').trim();
  if (!texto) return null;
  // Un cupón que "vence el 31" tiene que servir todo el 31, no morir a las 00:00.
  return `${texto}T${momento === 'fin' ? '23:59:59' : '00:00:00'}Z`;
}

export function Marketing() {
  usePageTitle('Marketing');
  const [tab, setTab] = useState<Tab>('cupones');

  const [subsPage, setSubsPage] = useState(1);
  const subsLoader = useCallback(
    (signal: AbortSignal) => marketingApi.subscribers({ page: subsPage, limit: 20 }, signal),
    [subsPage],
  );
  const {
    data: subscribers,
    loading: subsLoading,
    error: subsError,
  } = useResource<Paginated<Subscriber>>(subsLoader, [subsPage]);

  const [inquiriesPage, setInquiriesPage] = useState(1);
  const inquiriesLoader = useCallback(
    (signal: AbortSignal) => marketingApi.inquiries({ page: inquiriesPage, limit: 20 }, signal),
    [inquiriesPage],
  );
  const {
    data: inquiries,
    loading: inquiriesLoading,
    error: inquiriesError,
  } = useResource<Paginated<ContactMessage>>(inquiriesLoader, [inquiriesPage]);

  /* --- Columnas ---------------------------------------------------------- */
  const columnasCupones: Column<Coupon>[] = [
    {
      key: 'code',
      header: 'Código',
      sortValue: (r) => r.code,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.code}</strong>
          <small>{r.type === 'percentage' ? 'Porcentaje' : 'Monto fijo'}</small>
        </span>
      ),
    },
    {
      key: 'value',
      header: 'Descuento',
      align: 'right',
      sortValue: (r) => r.value,
      render: (r) => (
        <span className={styles.numeric}>
          {r.type === 'percentage' ? `${formatNumber(r.value)} %` : formatPrice(r.value)}
        </span>
      ),
    },
    {
      key: 'minPurchase',
      header: 'Compra mínima',
      align: 'right',
      secondary: true,
      sortValue: (r) => r.minPurchase ?? 0,
      render: (r) => (
        <span className={styles.numeric}>
          {r.minPurchase === null ? '—' : formatPrice(r.minPurchase)}
        </span>
      ),
    },
    {
      key: 'uses',
      header: 'Usos',
      align: 'right',
      sortValue: (r) => r.usedCount,
      render: (r) => (
        <span className={styles.numeric}>
          {formatNumber(r.usedCount)}
          {r.maxUses ? ` / ${formatNumber(r.maxUses)}` : ''}
        </span>
      ),
    },
    {
      key: 'expiresAt',
      header: 'Vence',
      secondary: true,
      sortValue: (r) => r.expiresAt ?? '',
      render: (r) => <span className={styles.muted}>{formatDayOnly(r.expiresAt)}</span>,
    },
    {
      key: 'active',
      header: 'Estado',
      sortValue: (r) => (r.active ? 1 : 0),
      render: (r) =>
        r.active ? <Badge tone="success">activo</Badge> : <Badge tone="neutral">inactivo</Badge>,
    },
  ];

  const columnasPromociones: Column<Promotion>[] = [
    {
      key: 'name',
      header: 'Promoción',
      sortValue: (r) => r.name,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.name}</strong>
          <small>
            {r.appliesTo === 'all' ? 'Todo el catálogo' : `Aplica a ${r.appliesTo}`}
          </small>
        </span>
      ),
    },
    {
      key: 'discount',
      header: 'Descuento',
      align: 'right',
      sortValue: (r) => r.discountValue,
      render: (r) => (
        <span className={styles.numeric}>
          {r.type === 'percentage'
            ? `${formatNumber(r.discountValue)} %`
            : formatPrice(r.discountValue)}
        </span>
      ),
    },
    {
      key: 'ventana',
      header: 'Vigencia',
      sortValue: (r) => r.startsAt,
      render: (r) => (
        <span className={styles.muted}>
          {formatDayOnly(r.startsAt)} → {formatDayOnly(r.endsAt)}
        </span>
      ),
    },
    {
      key: 'active',
      header: 'Estado',
      render: (r) => {
        const ahora = Date.now();
        if (!r.active) return <Badge tone="neutral">inactiva</Badge>;
        if (new Date(r.startsAt).getTime() > ahora) return <Badge tone="info">programada</Badge>;
        if (new Date(r.endsAt).getTime() < ahora) return <Badge tone="neutral">terminada</Badge>;
        return <Badge tone="success">vigente</Badge>;
      },
    },
  ];

  const columnasCampanias: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaña',
      sortValue: (r) => r.name,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.name}</strong>
          <small>{[r.type, r.channel].filter(Boolean).join(' · ') || '—'}</small>
        </span>
      ),
    },
    {
      key: 'budget',
      header: 'Presupuesto',
      align: 'right',
      sortValue: (r) => r.budget ?? 0,
      render: (r) => (
        <span className={styles.numeric}>{r.budget === null ? '—' : formatPrice(r.budget)}</span>
      ),
    },
    {
      key: 'spent',
      header: 'Gastado',
      align: 'right',
      secondary: true,
      sortValue: (r) => r.spent ?? 0,
      render: (r) => (
        <span className={styles.numeric}>{r.spent === null ? '—' : formatPrice(r.spent)}</span>
      ),
    },
    {
      key: 'conversions',
      header: 'Conversiones',
      align: 'right',
      sortValue: (r) => r.conversions ?? 0,
      render: (r) => <span className={styles.numeric}>{formatNumber(r.conversions ?? 0)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (r) => r.status,
      render: (r) => (
        <Badge tone={r.status === 'active' ? 'success' : 'neutral'}>
          {statusLabel(r.status)}
        </Badge>
      ),
    },
  ];

  const columnasSuscriptores: Column<Subscriber>[] = [
    { key: 'email', header: 'Correo', sortValue: (r) => r.email },
    {
      key: 'source',
      header: 'Origen',
      secondary: true,
      sortValue: (r) => r.source ?? '',
      render: (r) => <span className={styles.muted}>{r.source ?? '—'}</span>,
    },
    {
      key: 'createdAt',
      header: 'Alta',
      align: 'right',
      sortValue: (r) => r.createdAt,
      render: (r) => <span className={styles.muted}>{formatDate(r.createdAt)}</span>,
    },
    {
      key: 'active',
      header: 'Estado',
      render: (r) =>
        r.active ? <Badge tone="success">activo</Badge> : <Badge tone="neutral">baja</Badge>,
    },
  ];

  const columnasConsultas: Column<ContactMessage>[] = [
    {
      key: 'name',
      header: 'De',
      sortValue: (r) => r.name,
      render: (r) => (
        <span className={styles.primaryCell}>
          <strong>{r.name}</strong>
          <small>{r.email}</small>
        </span>
      ),
    },
    {
      key: 'subject',
      header: 'Asunto',
      sortValue: (r) => r.subject ?? '',
      render: (r) => (
        <span className={styles.primaryCell}>
          <span>{r.subject ?? '—'}</span>
          <small>{r.message.slice(0, 70)}…</small>
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Recibida',
      align: 'right',
      secondary: true,
      sortValue: (r) => r.createdAt,
      render: (r) => <span className={styles.muted}>{formatDateTime(r.createdAt)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (r) => (
        <Badge tone={r.status === 'pending' ? 'warning' : 'neutral'}>
          {statusLabel(r.status)}
        </Badge>
      ),
    },
  ];

  const camposCupon: CampoDef[] = [
    {
      name: 'code',
      label: 'Código',
      soloAlCrear: true,
      hint: 'No se edita: el que circula impreso tiene que seguir funcionando',
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'percentage', label: 'Porcentaje' },
        { value: 'fixed', label: 'Monto fijo' },
      ],
    },
    { name: 'value', label: 'Descuento', type: 'number' },
    { name: 'min_purchase', label: 'Compra mínima', type: 'number' },
    { name: 'max_uses', label: 'Usos máximos', type: 'number' },
    { name: 'expires_at', label: 'Vence', type: 'date' },
    { name: 'active', label: 'Activo', type: 'check' },
  ];

  return (
    <>
      <PageHeader
        title="Marketing"
        description="Cupones, promociones, campañas, newsletter y consultas que entran por la web."
      />

      <div className={styles.toolbar}>
        <Tabs
          value={tab}
          options={[
            { value: 'cupones', label: 'Cupones' },
            { value: 'promociones', label: 'Promociones' },
            { value: 'campanias', label: 'Campañas' },
            { value: 'suscriptores', label: 'Newsletter', count: subscribers?.meta.total },
            { value: 'consultas', label: 'Consultas', count: inquiries?.meta.total },
          ]}
          onChange={setTab}
        />
      </div>

      {tab === 'cupones' && (
        <CmsResource<Coupon>
          singular="Cupón"
          descripcion="Códigos de descuento. Si un cupón ya se usó en un pedido, borrarlo lo desactiva en vez de eliminarlo."
          api={{
            ...marketingApi.coupons,
            create: (input) =>
              marketingApi.coupons.create({ ...input, expires_at: aISO(input.expires_at, 'fin') }),
            update: (id, input) =>
              marketingApi.coupons.update(id, {
                ...input,
                expires_at: aISO(input.expires_at, 'fin'),
              }),
          }}
          columns={columnasCupones}
          nombreFila={(r) => r.code}
          vacio={{
            code: '',
            type: 'percentage',
            value: 10,
            min_purchase: 0,
            max_uses: 0,
            expires_at: '',
            active: true,
          }}
          desdeFila={(r) => ({
            code: r.code,
            type: r.type,
            value: r.value,
            min_purchase: r.minPurchase ?? 0,
            max_uses: r.maxUses ?? 0,
            expires_at: aFecha(r.expiresAt),
            active: r.active,
          })}
          campos={camposCupon}
        />
      )}

      {tab === 'promociones' && (
        <CmsResource<Promotion>
          singular="Promoción"
          genero="f"
          descripcion="Descuentos por catálogo con ventana de fechas. Fuera de esa ventana la tienda no las muestra."
          vacioTexto="Creá la primera promoción para que la tienda muestre un descuento."
          api={{
            ...marketingApi.promotions,
            // Las fechas van y vuelven como día suelto; la API habla ISO.
            create: (input) =>
              marketingApi.promotions.create({
                ...input,
                starts_at: aISO(input.starts_at),
                ends_at: aISO(input.ends_at),
              }),
            update: (id, input) =>
              marketingApi.promotions.update(id, {
                ...input,
                starts_at: aISO(input.starts_at),
                ends_at: aISO(input.ends_at),
              }),
          }}
          columns={columnasPromociones}
          nombreFila={(r) => r.name}
          vacio={{
            name: '',
            type: 'percentage',
            discount_value: 10,
            applies_to: 'all',
            starts_at: '',
            ends_at: '',
            active: true,
          }}
          desdeFila={(r) => ({
            name: r.name,
            type: r.type,
            discount_value: r.discountValue,
            applies_to: r.appliesTo,
            starts_at: aFecha(r.startsAt),
            ends_at: aFecha(r.endsAt),
            active: r.active,
          })}
          campos={[
            { name: 'name', label: 'Nombre', full: true },
            {
              name: 'type',
              label: 'Tipo',
              type: 'select',
              options: [
                { value: 'percentage', label: 'Porcentaje' },
                { value: 'fixed', label: 'Monto fijo' },
              ],
            },
            { name: 'discount_value', label: 'Descuento', type: 'number' },
            {
              name: 'applies_to',
              label: 'Aplica a',
              type: 'select',
              options: [
                { value: 'all', label: 'Todo el catálogo' },
                { value: 'category', label: 'Una categoría' },
                { value: 'collection', label: 'Una colección' },
                { value: 'products', label: 'Productos elegidos' },
              ],
            },
            { name: 'starts_at', label: 'Desde', type: 'date' },
            { name: 'ends_at', label: 'Hasta', type: 'date' },
            { name: 'active', label: 'Activa', type: 'check' },
          ]}
        />
      )}

      {tab === 'campanias' && (
        <CmsResource<Campaign>
          singular="Campaña"
          genero="f"
          descripcion="Las acciones de marketing y su presupuesto. Borrar una campaña no borra sus cupones ni sus promociones: les suelta el vínculo."
          api={marketingApi.campaigns}
          columns={columnasCampanias}
          nombreFila={(r) => r.name}
          vacio={{
            name: '',
            type: '',
            channel: '',
            budget: 0,
            spent: 0,
            conversions: 0,
            status: 'draft',
          }}
          desdeFila={(r) => ({
            name: r.name,
            type: r.type ?? '',
            channel: r.channel ?? '',
            budget: r.budget ?? 0,
            spent: r.spent ?? 0,
            conversions: r.conversions ?? 0,
            status: r.status,
          })}
          campos={[
            { name: 'name', label: 'Nombre', full: true },
            { name: 'type', label: 'Tipo', hint: 'lanzamiento, temporada…' },
            { name: 'channel', label: 'Canal', hint: 'email, redes, buscador…' },
            { name: 'budget', label: 'Presupuesto', type: 'number' },
            { name: 'spent', label: 'Gastado', type: 'number' },
            { name: 'conversions', label: 'Conversiones', type: 'number' },
            {
              name: 'status',
              label: 'Estado',
              type: 'select',
              options: [
                { value: 'draft', label: 'Borrador' },
                { value: 'active', label: 'Activa' },
                { value: 'paused', label: 'Pausada' },
                { value: 'finished', label: 'Finalizada' },
              ],
            },
          ]}
        />
      )}

      {tab === 'suscriptores' && (
        <Card padded={false}>
          <DataTable
            columns={columnasSuscriptores}
            rows={subscribers?.data ?? []}
            rowKey={(row) => row.id}
            loading={subsLoading}
            error={subsError}
            emptyTitle="Nadie se suscribió todavía"
          />
          {subscribers && (
            <Pagination
              page={subscribers.meta.page}
              totalPages={subscribers.meta.total_pages}
              total={subscribers.meta.total}
              onChange={setSubsPage}
            />
          )}
        </Card>
      )}

      {tab === 'consultas' && (
        <Card padded={false}>
          <DataTable
            columns={columnasConsultas}
            rows={inquiries?.data ?? []}
            rowKey={(row) => row.id}
            loading={inquiriesLoading}
            error={inquiriesError}
            emptyTitle="No hay consultas pendientes"
          />
          {inquiries && (
            <Pagination
              page={inquiries.meta.page}
              totalPages={inquiries.meta.total_pages}
              total={inquiries.meta.total}
              onChange={setInquiriesPage}
            />
          )}
        </Card>
      )}
    </>
  );
}
