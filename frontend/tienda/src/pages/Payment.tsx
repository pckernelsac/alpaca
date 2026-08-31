import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { PaymentBrick } from '../components/checkout/PaymentBrick';
import type { BrickFormData } from '../components/checkout/PaymentBrick';
import { YapeForm } from '../components/checkout/YapeForm';
import { ChargeError } from '../components/checkout/errors';
import checkout from '../components/checkout/Payment.module.css';
import { Button, ButtonLink } from '../components/ui/Button';
import { Alert, LoadingBlock, formatPrice } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError, ordersApi, paymentsApi } from '../lib/api';
import type { Order, PaymentConfig, PaymentResult } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import page from './Page.module.css';
import styles from './Checkout.module.css';

/**
 * Pago de un pedido ya creado.
 *
 * Vive en su propia ruta —y no dentro del checkout— por una razón práctica: si
 * el cliente cierra la pestaña con el formulario de la tarjeta a medias, el
 * pedido queda registrado y sin pagar. Con una URL propia puede volver desde
 * «Mis pedidos» y terminar de pagarlo; embebido en el checkout, ese pedido no
 * tendría forma de cobrarse nunca.
 */

const STEPS = ['Datos de envío', 'Pago', 'Confirmación'];

type Medio = 'card' | 'yape';

export function PayOrder() {
  usePageTitle('Pagar pedido');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [cargando, setCargando] = useState(true);
  const [fallo, setFallo] = useState<string | null>(null);
  const [medio, setMedio] = useState<Medio>('card');
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<PaymentResult | null>(null);

  useEffect(() => {
    if (!id) return;
    const controlador = new AbortController();
    setCargando(true);

    Promise.all([ordersApi.detail(id), paymentsApi.config(controlador.signal)])
      .then(([pedido, configuracion]) => {
        if (controlador.signal.aborted) return;
        setOrder(pedido);
        setConfig(configuracion);
      })
      .catch((caught) => {
        if (controlador.signal.aborted) return;
        setFallo(
          caught instanceof ApiRequestError ? caught.message : 'No pudimos abrir el pedido',
        );
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });

    return () => controlador.abort();
  }, [id]);

  /** Cobra en el backend. El importe no viaja: lo pone el servidor. */
  const pay = useCallback(
    async (data: BrickFormData) => {
      if (!order) return;
      setError(null);

      let respuesta: PaymentResult;
      try {
        respuesta = await paymentsApi.charge({
          order_id: order.id,
          token: data.token,
          payment_method_id: data.payment_method_id,
          payment_type_id: data.payment_type_id,
          issuer_id: data.issuer_id,
          installments: data.installments ?? 1,
          payer_email: data.payer?.email ?? user?.email ?? '',
          payer_first_name: data.payer?.first_name,
          payer_last_name: data.payer?.last_name,
          identification_type: data.payer?.identification?.type,
          identification_number: data.payer?.identification?.number,
        });
      } catch (caught) {
        const mensaje =
          caught instanceof ApiRequestError ? caught.message : 'No pudimos procesar el pago';
        setError(mensaje);
        throw new ChargeError(mensaje);
      }

      setResultado(respuesta);

      if (respuesta.paid) {
        toast.success('Pago acreditado');
        navigate(`/pedido/${respuesta.orderNumber ?? order.orderNumber}/confirmado`, {
          replace: true,
        });
        return;
      }

      if (respuesta.status === 'pending' || respuesta.status === 'in_process') {
        // Cupón de pago en efectivo o revisión manual: el pedido queda a la
        // espera y lo destraba el webhook cuando la plata entra.
        return;
      }

      setError(respuesta.message);
      // Lanzar es parte del contrato del Brick: si la promesa se resuelve, da
      // el pago por bueno y deja el botón bloqueado.
      throw new ChargeError(respuesta.message);
    },
    [navigate, order, toast, user],
  );

  if (cargando) return <LoadingBlock label="Abriendo el pedido" />;

  if (fallo || !order) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        <Alert tone="danger">{fallo ?? 'No encontramos el pedido'}</Alert>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <ButtonLink to="/pedidos" variant="secondary">
            Ver mis pedidos
          </ButtonLink>
        </div>
      </div>
    );
  }

  // Un pedido ya cobrado no vuelve a cobrarse: se va a su confirmación.
  if (order.paid) {
    return <Navigate to={`/pedido/${order.orderNumber}/confirmado`} replace />;
  }

  const pendiente =
    resultado && (resultado.status === 'pending' || resultado.status === 'in_process');

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <h1 className={page.title}>Pagar el pedido {order.orderNumber}</h1>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step} className={`${styles.step} ${index === 1 ? styles.stepActive : ''}`}>
              <span className={styles.stepNumber}>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </header>

      <div className={page.split} style={{ paddingTop: 0 }}>
        <div className={styles.fields}>
          {error && <Alert tone="danger">{error}</Alert>}

          {pendiente && resultado && (
            <Alert tone="warning">
              <div className={checkout.result}>
                <span>{resultado.message}</span>
                {resultado.voucherUrl && (
                  <a
                    className={checkout.voucher}
                    href={resultado.voucherUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Ver el cupón de pago
                  </a>
                )}
                <Button variant="secondary" size="sm" onClick={() => navigate('/pedidos')}>
                  Ver mis pedidos
                </Button>
              </div>
            </Alert>
          )}

          <section className={page.card}>
            <h2 className={page.cardTitle}>Método de pago</h2>

            {!config?.enabled ? (
              <Alert tone="info">
                El pago en línea no está disponible en este momento. Tu pedido quedó registrado y
                nos comunicamos para coordinar el cobro.
              </Alert>
            ) : (
              <>
                <div className={checkout.tabs} role="tablist" aria-label="Método de pago">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={medio === 'card'}
                    className={`${checkout.tab} ${medio === 'card' ? checkout.tabActive : ''}`}
                    onClick={() => setMedio('card')}
                  >
                    Tarjeta y otros medios
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={medio === 'yape'}
                    className={`${checkout.tab} ${medio === 'yape' ? checkout.tabActive : ''}`}
                    onClick={() => setMedio('yape')}
                  >
                    Yape
                  </button>
                </div>

                {medio === 'card' ? (
                  <PaymentBrick
                    publicKey={config.publicKey}
                    locale={config.locale}
                    amount={order.total}
                    payerEmail={user?.email ?? ''}
                    onPay={pay}
                  />
                ) : (
                  <YapeForm publicKey={config.publicKey} locale={config.locale} onPay={pay} />
                )}
              </>
            )}

            <p className={styles.paymentNote}>
              Los datos de tu tarjeta viajan cifrados directo a Mercado Pago: no pasan por
              nuestros servidores ni quedan guardados acá.
            </p>
          </section>
        </div>

        <aside className={page.aside}>
          <div className={page.card}>
            <h2 className={page.cardTitle}>Tu pedido</h2>

            <ul className={styles.items}>
              {order.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.itemQty}>{item.quantity}×</span>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    {item.variantLabel && (
                      <p className={styles.itemVariant}>{item.variantLabel}</p>
                    )}
                  </div>
                  <span className={styles.itemTotal}>{formatPrice(item.total)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.totals}>
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
                <span>IGV (18%)</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className={page.summaryRow}>
                <span>Envío</span>
                <span className={order.shippingFee === 0 ? page.free : undefined}>
                  {order.shippingFee === 0 ? 'Gratis' : formatPrice(order.shippingFee)}
                </span>
              </div>
              <div className={page.summaryTotal}>
                <span>Total a pagar</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
