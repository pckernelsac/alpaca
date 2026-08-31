import { useEffect, useRef, useState } from 'react';

import { Alert, Spinner } from '../ui/Primitives';
import { getMercadoPago } from '../../lib/mercadopago';
import type { BrickController } from '../../lib/mercadopago';
import { useTheme } from '../../providers/ThemeProvider';
import styles from './Payment.module.css';

/** Datos que el Brick entrega al enviar el formulario.
 *
 *  Trae también un `transaction_amount`: **se ignora**. El importe lo fija el
 *  servidor leyéndolo del pedido; aceptar el del navegador sería dejar que el
 *  cliente elija cuánto paga. */
export interface BrickFormData {
  token?: string;
  payment_method_id: string;
  payment_type_id?: string;
  issuer_id?: string;
  installments?: number;
  payer?: {
    email?: string;
    identification?: { type?: string; number?: string };
    first_name?: string;
    last_name?: string;
  };
}

interface Props {
  publicKey: string;
  locale: string;
  /** Solo para que el Brick calcule cuotas y muestre el importe. */
  amount: number;
  payerEmail: string;
  /** Cobra en el backend. Si lanza, el Brick vuelve a habilitar su botón. */
  onPay: (data: BrickFormData) => Promise<void>;
}

const CONTAINER_ID = 'alpacart-payment-brick';
// En una pantalla de cobro un error visible es mucho mejor que un spinner
// infinito: si el Brick no avisa que está listo en este plazo, se lo da por
// caído y se ofrece recargar.
const LISTO_MAX_MS = 20_000;

export function PaymentBrick({ publicKey, locale, amount, payerEmail, onPay }: Props) {
  const { resolved } = useTheme();
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'caido'>('cargando');
  const [error, setError] = useState<string | null>(null);

  // El envío vive en una ref para que un render del padre —el toast, el
  // temporizador, cualquier cosa— no reconstruya el Brick y borre de la
  // pantalla lo que el cliente ya tecleó.
  const onPayRef = useRef(onPay);
  useEffect(() => {
    onPayRef.current = onPay;
  }, [onPay]);

  useEffect(() => {
    let cancelado = false;
    let controlador: BrickController | null = null;
    let listo = false;

    const temporizador = window.setTimeout(() => {
      if (!listo && !cancelado) {
        setEstado('caido');
        setError('El formulario de pago no terminó de cargar. Recargá la página.');
      }
    }, LISTO_MAX_MS);

    getMercadoPago(publicKey, locale)
      .then((mp) =>
        mp.bricks().create('payment', CONTAINER_ID, {
          initialization: {
            amount,
            payer: { email: payerEmail },
          },
          customization: {
            // `mercadoPago` NO va acá. Ese medio exige un `preferenceId` y en
            // Checkout API no creamos preferencias: con él, el Brick no se
            // inicializa, `onReady` no dispara nunca y la pantalla se queda en
            // un spinner eterno sin ningún error.
            paymentMethods: {
              creditCard: 'all',
              debitCard: 'all',
              prepaidCard: 'all',
              ticket: 'all',
              maxInstallments: 12,
            },
            visual: {
              style: { theme: resolved === 'dark' ? 'dark' : 'default' },
              hidePaymentButton: false,
            },
          },
          callbacks: {
            onReady: () => {
              listo = true;
              window.clearTimeout(temporizador);
              if (!cancelado) setEstado('listo');
            },
            onSubmit: ({ formData }: { formData: BrickFormData }) => {
              setError(null);
              // Devolver la promesa es parte del contrato: si se resuelve, el
              // Brick muestra el estado de éxito; si se rechaza, vuelve a
              // habilitar el botón para reintentar.
              return onPayRef.current(formData);
            },
            onError: (fallo: { message?: string; cause?: string }) => {
              if (cancelado) return;
              // Apagar el indicador además de mostrar el mensaje: si no, el
              // formulario queda con el botón girando para siempre.
              setEstado((actual) => (actual === 'cargando' ? 'caido' : actual));
              setError(
                fallo?.message
                  ? 'No pudimos preparar el formulario de pago. Probá recargar la página.'
                  : 'Revisá los datos de la tarjeta.',
              );
            },
          },
        }),
      )
      .then((instancia) => {
        // StrictMode monta y desmonta: si ya nos fuimos, el Brick recién creado
        // se desmonta acá o quedan dos formularios apilados.
        if (cancelado) instancia.unmount();
        else controlador = instancia;
      })
      .catch((fallo: Error) => {
        if (cancelado) return;
        setEstado('caido');
        setError(fallo.message || 'No pudimos cargar la pasarela de pago');
      });

    return () => {
      cancelado = true;
      window.clearTimeout(temporizador);
      controlador?.unmount();
    };
  }, [publicKey, locale, amount, payerEmail, resolved]);

  return (
    <div className={styles.brickWrap}>
      {error && <Alert tone="danger">{error}</Alert>}

      {estado === 'cargando' && (
        <div className={styles.loading}>
          <Spinner size={20} />
          <span>Preparando el formulario de pago…</span>
        </div>
      )}

      {/* El contenedor se renderiza siempre: el Brick se monta sobre este id y
          tiene que existir en el DOM antes de crearlo. */}
      <div id={CONTAINER_ID} className={estado === 'listo' ? undefined : styles.hidden} />
    </div>
  );
}
