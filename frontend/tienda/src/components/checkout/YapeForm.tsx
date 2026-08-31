import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '../ui/Button';
import { Input } from '../ui/Field';
import { Alert } from '../ui/Primitives';
import { getMercadoPago } from '../../lib/mercadopago';
import { ChargeError } from './errors';
import styles from './Payment.module.css';
import type { BrickFormData } from './PaymentBrick';

/**
 * Yape va aparte, y no es una decisión de diseño: **Mercado Pago no lo
 * renderiza dentro del Payment Brick**. Exige formulario propio con el celular
 * y un código de aprobación de seis dígitos, que el cliente genera en su app
 * (Yape → «Aprobar compras por internet»), y tokeniza con `mp.yape()`.
 *
 * El token no lleva importe: eso lo pone el servidor al cobrar.
 */

interface Props {
  publicKey: string;
  locale: string;
  onPay: (data: BrickFormData) => Promise<void>;
}

const CELULAR = /^9\d{8}$/;
const OTP = /^\d{6}$/;

export function YapeForm({ publicKey, locale, onPay }: Props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!CELULAR.test(phone)) {
      setError('El celular tiene que ser un número peruano de nueve dígitos, empezando por 9.');
      return;
    }
    if (!OTP.test(otp)) {
      setError('El código de aprobación tiene seis dígitos.');
      return;
    }

    setEnviando(true);
    try {
      const mp = await getMercadoPago(publicKey, locale);
      const { id } = await mp.yape({ otp, phoneNumber: phone }).create();
      await onPay({
        token: id,
        // Yape es `debit_card` para Mercado Pago, por raro que suene: es lo que
        // devuelve su propio `/v1/payment_methods`. No viaja a la pasarela —el
        // backend solo manda `payment_method_id`— pero queda archivado en
        // `transactions.meta`, y ahí un valor inventado es una pista falsa el
        // día que haya que conciliar un cobro a mano.
        payment_type_id: 'debit_card',
        installments: 1,
      });
      // Un código sirve una sola vez: si hay que reintentar, hay que pedir otro.
      setOtp('');
    } catch (fallo) {
      // Un rechazo del cobro ya está escrito arriba del formulario; repetirlo
      // acá solo duplica el mismo mensaje.
      if (!(fallo instanceof ChargeError)) {
        setError(
          fallo instanceof Error
            ? fallo.message
            : 'No pudimos procesar el pago con Yape. Probá de nuevo.',
        );
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className={styles.yape} onSubmit={submit}>
      {error && <Alert tone="danger">{error}</Alert>}

      <ol className={styles.yapeSteps}>
        <li>Abrí tu app de Yape y entrá a «Aprobar compras por internet».</li>
        <li>Generá el código de aprobación de seis dígitos.</li>
        <li>Ingresalo acá abajo junto con tu celular. Vence a los pocos minutos.</li>
      </ol>

      <Input
        label="Celular"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={9}
        placeholder="9XXXXXXXX"
        value={phone}
        onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
        required
      />
      <Input
        label="Código de aprobación"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="000000"
        value={otp}
        onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
        hint="Lo generás en tu app de Yape, no llega por SMS."
        required
      />

      <Button type="submit" size="lg" fullWidth loading={enviando}>
        Pagar con Yape
      </Button>
    </form>
  );
}
