"""Los pasos comunes de un cobro, sin importar quien lo dispare.

La coreografia es siempre la misma y esta escrita una sola vez:

    fila en `transactions`  ->  llamada a la pasarela  ->  fila actualizada

La fila **nace antes** de salir a la red. Si la llamada se cae a mitad —o la
respuesta se pierde— el intento igual queda registrado con su
`external_reference`, y el webhook lo concilia despues sin que nadie tenga que
adivinar que paso.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from decimal import Decimal
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Order, OrderEvent, Transaction

# Estados de la pasarela que damos por buenos para acreditar el pedido.
APROBADOS = {"approved"}
# Estados en los que el pago existe pero todavia no es plata: cupon sin pagar,
# revision manual, transferencia a medias.
PENDIENTES = {"pending", "in_process", "authorized"}


def next_transaction_number(db: Session) -> str:
    year = datetime.now(timezone.utc).year
    prefix = f"TRX-{year}-"
    last = db.scalar(
        select(Transaction.transaction_id)
        .where(Transaction.transaction_id.like(f"{prefix}%"))
        .order_by(Transaction.transaction_id.desc())
        .limit(1)
    )
    seq = int(last.rsplit("-", 1)[1]) + 1 if last else 1
    return f"{prefix}{seq:05d}"


def new_reference(order: Order) -> str:
    """Referencia unica del intento.

    Un uuid4 por intento —y no el numero de pedido a secas— porque un pedido
    puede reintentarse: dos cobros del mismo pedido son dos referencias. El
    mismo valor viaja como `external_reference` y como `X-Idempotency-Key`, que
    es lo que hace que un doble clic sea un solo cobro.
    """
    return f"{order.order_number}-{uuid.uuid4().hex[:12]}"


def start_transaction(
    db: Session,
    order: Order,
    *,
    provider: str,
    method: str,
    amount: Decimal,
    external_reference: str,
    payer_email: str | None = None,
    meta: dict[str, Any] | None = None,
) -> Transaction:
    """Registra el intento y lo deja confirmado en la base antes de cobrar."""
    transaction = Transaction(
        transaction_id=next_transaction_number(db),
        order_id=order.id,
        provider=provider,
        method=method,
        amount=amount,
        currency="PEN",
        status="pending",
        external_reference=external_reference,
        payer_email=payer_email,
        meta=meta or {},
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


def apply_payment(db: Session, transaction: Transaction, payment: dict[str, Any]) -> Transaction:
    """Vuelca el pago de la pasarela sobre la transaccion y sobre el pedido.

    Idempotente a proposito: Mercado Pago reenvia el mismo aviso, y el
    navegador puede consultar el estado mientras tanto. Si nada cambio, no se
    escribe un segundo evento en el historial del pedido.
    """
    estado = str(payment.get("status") or "pending")
    detalle = payment.get("status_detail")
    payment_id = str(payment.get("id")) if payment.get("id") is not None else None

    cambio = transaction.status != estado
    transaction.status = estado
    transaction.status_detail = detalle
    if payment_id:
        transaction.provider_payment_id = payment_id
    if payment.get("payment_method_id"):
        transaction.method = str(payment["payment_method_id"])[:30]

    # Guardamos solo lo que sirve para conciliar o dar soporte: el pago entero
    # trae datos del pagador que no necesitamos retener.
    transaction.meta = {
        **(transaction.meta or {}),
        "payment_id": payment_id,
        "status": estado,
        "status_detail": detalle,
        "payment_method_id": payment.get("payment_method_id"),
        "payment_type_id": payment.get("payment_type_id"),
        "installments": payment.get("installments"),
        "transaction_amount": payment.get("transaction_amount"),
        "date_approved": payment.get("date_approved"),
        "voucher_url": _voucher_url(payment),
    }

    order = db.get(Order, transaction.order_id) if transaction.order_id else None
    if order and cambio:
        _apply_to_order(db, order, transaction, estado, detalle)

    db.commit()
    db.refresh(transaction)
    return transaction


def _voucher_url(payment: dict[str, Any]) -> str | None:
    """Cupon de pago en efectivo: la unica forma de que el cliente lo abone."""
    detalles = payment.get("transaction_details") or {}
    return detalles.get("external_resource_url")


def _apply_to_order(
    db: Session, order: Order, transaction: Transaction, estado: str, detalle: str | None
) -> None:
    ahora = datetime.now(timezone.utc)

    if estado in APROBADOS:
        order.paid = True
        order.paid_at = ahora
        # `confirmed` solo desde `pending`: si el pedido ya avanzo —o alguien lo
        # cancelo— el cobro no debe hacerlo retroceder.
        if order.status == "pending":
            order.status = "confirmed"
        titulo = "Pago acreditado"
        descripcion = (
            f"{transaction.provider} acredito {transaction.currency} "
            f"{transaction.amount} (pago {transaction.provider_payment_id})."
        )
    elif estado in PENDIENTES:
        titulo = "Pago pendiente"
        descripcion = f"{transaction.provider} dejo el pago en {estado} ({detalle or 'sin detalle'})."
    elif estado == "refunded":
        order.paid = False
        order.status = "refunded"
        titulo = "Pago devuelto"
        descripcion = f"{transaction.provider} devolvio el pago {transaction.provider_payment_id}."
    elif estado == "charged_back":
        titulo = "Contracargo"
        descripcion = f"El banco desconocio el pago {transaction.provider_payment_id}."
    else:
        titulo = "Pago rechazado"
        descripcion = f"{transaction.provider} rechazo el pago ({detalle or estado})."

    db.add(
        OrderEvent(
            order_id=order.id,
            type="payment",
            title=titulo,
            description=descripcion,
        )
    )


def serialize_transaction(transaction: Transaction) -> dict[str, Any]:
    meta = transaction.meta or {}
    return {
        "id": str(transaction.id),
        "transactionId": transaction.transaction_id,
        "orderId": str(transaction.order_id) if transaction.order_id else None,
        "provider": transaction.provider,
        "method": transaction.method,
        "amount": float(transaction.amount),
        "currency": transaction.currency,
        "status": transaction.status,
        "statusDetail": transaction.status_detail,
        "paymentId": transaction.provider_payment_id,
        "externalReference": transaction.external_reference,
        "voucherUrl": meta.get("voucher_url"),
        "createdAt": transaction.created_at.isoformat(),
    }
