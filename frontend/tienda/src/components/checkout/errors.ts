/** El cobro llegó al backend y volvió con un «no».
 *
 *  Se distingue de cualquier otro fallo porque el mensaje ya está a la vista:
 *  lo pinta la pantalla de pago, encima del formulario. El formulario que lo
 *  recibe solo tiene que dejar de girar, no volver a escribirlo debajo.
 *
 *  Aun así hay que lanzarlo: el Payment Brick decide con la promesa de su
 *  `onSubmit` si vuelve a habilitar su botón. Si se resuelve, da el pago por
 *  bueno y se queda esperando. */
export class ChargeError extends Error {
  readonly displayed = true;

  constructor(message: string) {
    super(message);
    this.name = 'ChargeError';
  }
}
