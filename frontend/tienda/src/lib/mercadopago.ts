/**
 * Carga del SDK de Mercado Pago.
 *
 * El script se sirve desde `https://sdk.mercadopago.com/js/v2` y **no se puede
 * autohospedar**: la tokenización de la tarjeta ocurre dentro de iframes que
 * ellos firman, y es justamente eso lo que mantiene los datos de la tarjeta
 * fuera de nuestro dominio.
 *
 * El cargador no es el ingenuo a propósito. Si la etiqueta `<script>` ya está
 * en el documento —React monta y desmonta la pantalla de pago varias veces— y
 * uno se engancha a su evento `load`, ese evento **ya disparó y no se repite**:
 * la promesa no se resuelve nunca y el checkout se queda en un spinner eterno
 * sin ningún error en consola. Por eso, si la etiqueta existe, se sondea
 * `window.MercadoPago`. Y todo lleva timeout: en una pantalla de cobro un
 * error visible es mucho mejor que una espera infinita.
 */

const SDK_URL = 'https://sdk.mercadopago.com/js/v2';
const CARGA_MAX_MS = 15_000;
const SONDEO_MS = 120;

export interface BrickController {
  unmount: () => void;
}

export interface BrickBuilder {
  create: (
    brick: string,
    containerId: string,
    settings: Record<string, unknown>,
  ) => Promise<BrickController>;
}

export interface YapeTokenizer {
  create: () => Promise<{ id: string }>;
}

export interface MercadoPagoInstance {
  bricks: () => BrickBuilder;
  yape: (config: { otp: string; phoneNumber: string }) => YapeTokenizer;
}

type MercadoPagoConstructor = new (
  publicKey: string,
  options?: { locale?: string },
) => MercadoPagoInstance;

declare global {
  interface Window {
    MercadoPago?: MercadoPagoConstructor;
  }
}

let carga: Promise<MercadoPagoConstructor> | null = null;

function esperarGlobal(limite: number): Promise<MercadoPagoConstructor> {
  return new Promise((resolve, reject) => {
    const inicio = Date.now();
    const timer = window.setInterval(() => {
      if (window.MercadoPago) {
        window.clearInterval(timer);
        resolve(window.MercadoPago);
      } else if (Date.now() - inicio > limite) {
        window.clearInterval(timer);
        reject(new Error('El SDK de Mercado Pago no terminó de cargar'));
      }
    }, SONDEO_MS);
  });
}

export function loadMercadoPagoSdk(): Promise<MercadoPagoConstructor> {
  if (window.MercadoPago) return Promise.resolve(window.MercadoPago);
  if (carga) return carga;

  carga = new Promise<MercadoPagoConstructor>((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(`script[src="${SDK_URL}"]`);

    if (existente) {
      // La etiqueta ya está: su `load` puede haber pasado hace rato.
      esperarGlobal(CARGA_MAX_MS).then(resolve, reject);
      return;
    }

    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.addEventListener('load', () => {
      if (window.MercadoPago) resolve(window.MercadoPago);
      else esperarGlobal(3_000).then(resolve, reject);
    });
    script.addEventListener('error', () =>
      reject(new Error('No pudimos cargar la pasarela de pago')),
    );
    document.head.appendChild(script);

    window.setTimeout(() => reject(new Error('La pasarela de pago tardó demasiado')), CARGA_MAX_MS);
  });

  // Un fallo no debe quedar cacheado: la próxima visita a la pantalla reintenta.
  carga.catch(() => {
    carga = null;
  });

  return carga;
}

const instancias = new Map<string, MercadoPagoInstance>();

/** Una instancia por clave pública: construirla dos veces duplica sus listeners. */
export async function getMercadoPago(
  publicKey: string,
  locale = 'es-PE',
): Promise<MercadoPagoInstance> {
  const cacheada = instancias.get(publicKey);
  if (cacheada) return cacheada;

  const MercadoPago = await loadMercadoPagoSdk();
  const instancia = new MercadoPago(publicKey, { locale });
  instancias.set(publicKey, instancia);
  return instancia;
}
