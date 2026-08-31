"""Cobros con Mercado Pago — Checkout API (pago embebido, sin redireccion).

El navegador tokeniza con el SDK de Mercado Pago y aca solo llega un token: los
datos de la tarjeta no tocan este servidor en ningun momento. No se crean
preferencias, no hay `back_urls` ni vuelta desde otro dominio.

Cuatro reglas que sostienen todo lo demas:

1. **El importe lo fija el servidor**, siempre, leyendolo del pedido.
2. **La fila de `transactions` nace antes de la llamada** a la pasarela.
3. **Un solo webhook** para todo, idempotente, que nunca se fia del cuerpo que
   recibe: relee el pago en Mercado Pago y usa ese estado.
4. **El webhook responde 200 salvo firma invalida (401).** Un 5xx hace que
   Mercado Pago reintente en bucle por algo que el reintento no arregla.
"""

import logging
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Header, HTTPException, Query, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.core.config import settings
from app.core.deps import Actor, DbSession, StaffActor
from app.models import Order, Transaction, WebhookEvent
from app.schemas.common import ok
from app.schemas.payments import MercadoPagoCharge
from app.services import mercadopago_client as mp
from app.services import payments as flow

logger = logging.getLogger("alpacart.pagos")

router = APIRouter(tags=["Pagos"])

PROVEEDOR = "mercadopago"
# Estados en los que ya no tiene sentido cobrar.
CERRADOS = ("cancelled", "refunded")


# ---------------------------------------------------------------------------
# Configuracion publica
# ---------------------------------------------------------------------------
@router.get("/payments/config", summary="Configuracion publica de la pasarela")
def payments_config():
    """Lo que la tienda necesita para montar el formulario de pago.

    La clave publica se sirve desde aca y no se compila dentro del bundle: las
    `VITE_*` se incrustan al compilar, asi que cambiarla obligaria a un rebuild.
    Por esta ruta basta reiniciar el backend.
    """
    return ok(
        {
            "provider": PROVEEDOR,
            "enabled": settings.mercadopago_enabled,
            "publicKey": settings.MP_PUBLIC_KEY,
            "currency": "PEN",
            "locale": "es-PE",
            "methods": ["card", "yape", "ticket"],
        }
    )


# ---------------------------------------------------------------------------
# Cobro
# ---------------------------------------------------------------------------
def _pedido_cobrable(db, actor, order_id: UUID) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if actor.type == "customer" and order.customer_id != actor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Este pedido no te pertenece")
    if order.paid:
        raise HTTPException(status.HTTP_409_CONFLICT, "Este pedido ya esta pagado")
    if order.status in CERRADOS:
        raise HTTPException(status.HTTP_409_CONFLICT, "Este pedido ya no admite pagos")

    total = float(order.total)
    if total <= 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "El total del pedido no es cobrable")
    if total > settings.MP_MAX_AMOUNT:
        # Tope de cordura: un total absurdo no deberia siquiera salir a la red.
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "El total supera el maximo permitido para pago en linea",
        )
    return order


@router.post("/payments/mercadopago", summary="Cobrar un pedido con Mercado Pago")
def charge_with_mercadopago(payload: MercadoPagoCharge, db: DbSession, actor: Actor):
    if not settings.mercadopago_enabled:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE, "La pasarela de pago no esta disponible"
        )

    order = _pedido_cobrable(db, actor, payload.order_id)
    referencia = flow.new_reference(order)

    # La fila primero: si la llamada se cae a mitad, el intento queda anotado y
    # el webhook lo concilia. Recien despues se sale a la red.
    transaction = flow.start_transaction(
        db,
        order,
        provider=PROVEEDOR,
        method=payload.payment_method_id,
        amount=order.total,
        external_reference=referencia,
        payer_email=str(payload.payer_email),
        meta={
            "order_number": order.order_number,
            "payment_type_id": payload.payment_type_id,
            "installments": payload.installments,
        },
    )

    body: dict = {
        # El importe sale del pedido. Lo que mande el navegador no se mira.
        "transaction_amount": round(float(order.total), 2),
        "description": f"Pedido {order.order_number} — ALPACART",
        "external_reference": referencia,
        "statement_descriptor": settings.MP_STATEMENT_DESCRIPTOR,
        "installments": payload.installments,
        "payment_method_id": payload.payment_method_id,
        "payer": {"email": str(payload.payer_email)},
        "metadata": {
            "order_id": str(order.id),
            "order_number": order.order_number,
            "transaction_id": transaction.transaction_id,
        },
    }
    if payload.token:
        body["token"] = payload.token
    if payload.issuer_id:
        body["issuer_id"] = payload.issuer_id
    if payload.payer_first_name:
        body["payer"]["first_name"] = payload.payer_first_name
    if payload.payer_last_name:
        body["payer"]["last_name"] = payload.payer_last_name
    if payload.identification_type and payload.identification_number:
        body["payer"]["identification"] = {
            "type": payload.identification_type,
            "number": payload.identification_number,
        }

    # En localhost se omite: Mercado Pago valida el host y rechaza el cobro
    # entero con `notificaction_url attribute must be url valid` (sic).
    notificacion = settings.mp_notification_url
    if notificacion:
        body["notification_url"] = notificacion

    try:
        # La referencia hace de clave de idempotencia: un doble clic del cliente
        # es un solo cobro.
        payment = mp.create_payment(body, idempotency_key=referencia)
    except mp.MercadoPagoError as exc:
        transaction.status = "error"
        transaction.status_detail = (exc.code or "api_error")[:60]
        db.commit()
        raise HTTPException(exc.status, exc.message) from exc

    transaction = flow.apply_payment(db, transaction, payment)

    datos = flow.serialize_transaction(transaction)
    datos["message"] = mp.message_for_status(
        transaction.status, transaction.status_detail, payload.payment_method_id
    )
    datos["orderNumber"] = order.order_number
    datos["paid"] = transaction.status in flow.APROBADOS
    return ok(datos)


@router.get("/payments/orders/{order_id}", summary="Estado de pago de un pedido")
def payment_status(order_id: UUID, db: DbSession, actor: Actor):
    """Ultimo intento de cobro del pedido, releido de la pasarela si sigue vivo.

    Lo consulta la tienda mientras espera: un cupon o una revision manual se
    acreditan minutos —o dias— despues, y ahi el estado bueno es el que tiene
    Mercado Pago, no el que quedo escrito.
    """
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if actor.type == "customer" and order.customer_id != actor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Este pedido no te pertenece")

    transaction = db.scalar(
        select(Transaction)
        .where(Transaction.order_id == order.id)
        .order_by(Transaction.created_at.desc())
        .limit(1)
    )
    if transaction is None:
        return ok({"orderNumber": order.order_number, "paid": order.paid, "transaction": None})

    if (
        transaction.provider == PROVEEDOR
        and transaction.provider_payment_id
        and transaction.status in flow.PENDIENTES
        and settings.mercadopago_enabled
    ):
        payment = mp.get_payment(transaction.provider_payment_id)
        if payment:
            transaction = flow.apply_payment(db, transaction, payment)
            db.refresh(order)

    datos = flow.serialize_transaction(transaction)
    datos["message"] = mp.message_for_status(
        transaction.status, transaction.status_detail, transaction.method
    )
    return ok(
        {
            "orderNumber": order.order_number,
            "paid": order.paid,
            "status": order.status,
            "transaction": datos,
        }
    )


# ---------------------------------------------------------------------------
# Webhook — uno solo, para todo
# ---------------------------------------------------------------------------
@router.post("/payments/mercadopago/webhook", summary="Avisos de Mercado Pago")
async def mercadopago_webhook(
    request: Request,
    db: DbSession,
    x_signature: Annotated[str | None, Header(alias="x-signature")] = None,
    x_request_id: Annotated[str | None, Header(alias="x-request-id")] = None,
    data_id_query: Annotated[str | None, Query(alias="data.id")] = None,
    tipo_query: Annotated[str | None, Query(alias="type")] = None,
):
    try:
        body = await request.json()
    except Exception:  # noqa: BLE001 — Mercado Pago tambien manda avisos vacios
        body = {}

    datos = body.get("data") if isinstance(body.get("data"), dict) else {}
    payment_id = str(datos.get("id") or data_id_query or "").strip()
    tipo = str(body.get("type") or tipo_query or "").strip()

    # La firma se calcula sobre el `data.id` de la query, que es el que Mercado
    # Pago usa para armar el manifiesto.
    if not mp.verify_signature(x_signature, x_request_id, data_id_query or payment_id or None):
        logger.warning("Webhook de Mercado Pago con firma invalida (id %s)", payment_id or "?")
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Firma invalida")

    # De aca en adelante se responde 200 pase lo que pase: un 5xx solo consigue
    # que Mercado Pago reintente lo mismo, y lo mismo va a volver a fallar.
    if tipo and tipo != "payment":
        return ok({"ignored": tipo})
    if not payment_id:
        return ok({"ignored": "sin id"})

    evento_id = str(body.get("id") or f"{payment_id}:{body.get('action') or tipo or 'payment'}")
    evento = db.scalar(
        select(WebhookEvent).where(
            WebhookEvent.provider == PROVEEDOR,
            WebhookEvent.external_event_id == evento_id,
        )
    )
    if evento and evento.status == "processed":
        return ok({"duplicated": True, "paymentId": payment_id})
    if evento is None:
        evento = WebhookEvent(
            provider=PROVEEDOR,
            external_event_id=evento_id,
            event_type=str(body.get("action") or tipo or "payment"),
            status="received",
        )
        db.add(evento)
        try:
            db.commit()
        except IntegrityError:
            # Dos avisos identicos a la vez: el otro lo esta procesando.
            db.rollback()
            return ok({"duplicated": True, "paymentId": payment_id})

    # Nunca el cuerpo: el estado bueno es el que tiene Mercado Pago. Esto es lo
    # que hace que una clave de webhook filtrada tenga impacto bajo.
    payment = mp.get_payment(payment_id)
    if not payment:
        logger.warning("Webhook: no pudimos releer el pago %s", payment_id)
        return ok({"pending": True, "paymentId": payment_id})

    referencia = payment.get("external_reference")
    transaction = None
    if referencia:
        transaction = db.scalar(
            select(Transaction).where(Transaction.external_reference == str(referencia))
        )
    if transaction is None:
        transaction = db.scalar(
            select(Transaction).where(Transaction.provider_payment_id == payment_id)
        )
    if transaction is None:
        logger.warning(
            "Webhook: pago %s (ref %s) sin transaccion local", payment_id, referencia or "?"
        )
        evento.status = "orphan"
        db.commit()
        return ok({"unknown": True, "paymentId": payment_id})

    transaction = flow.apply_payment(db, transaction, payment)

    evento.status = "processed"
    evento.order_id = transaction.order_id
    evento.processed_at = transaction.updated_at
    db.commit()

    logger.info(
        "Webhook conciliado: pago %s -> %s (pedido %s)",
        payment_id,
        transaction.status,
        transaction.order_id,
    )
    return ok({"processed": True, "paymentId": payment_id, "status": transaction.status})


# ---------------------------------------------------------------------------
# Salud de la integracion — solo staff: dice en que modo esta la cuenta
# ---------------------------------------------------------------------------
@router.get("/payments/health", summary="Estado de la integracion de pagos")
def payments_health(actor: StaffActor):
    """Por que la pasarela esta como esta, sin entrar al servidor.

    Decir solo `enabled: false` no alcanza: deja al staff adivinando entre una
    credencial que falta, una mal pegada y dos de modos distintos. `missing`
    nombra la variable exacta y `warnings` describe lo que igual va a fallar
    aunque este encendida. Nunca sale el valor de una credencial, solo si esta.
    """
    pasarela = mp.configuracion()
    return ok(
        {
            "provider": PROVEEDOR,
            "webhookConfigured": bool(settings.MP_WEBHOOK_SECRET),
            **pasarela,
        }
    )
