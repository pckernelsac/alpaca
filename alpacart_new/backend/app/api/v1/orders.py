"""Pedidos.

El mismo listado sirve a la tienda y al dashboard: si llama un customer se
filtra por su id, si llama staff ve todo.
"""

from datetime import datetime, timezone
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import func, or_, select

from app.core.deps import Actor, DbSession, Page, StaffActor
from app.models import Order, OrderEvent
from app.schemas.common import ok, paginated
from app.schemas.orders import OrderStatusUpdate

router = APIRouter(tags=["Pedidos"])

VALID_STATUSES = [
    "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded",
]


def serialize_order(order: Order, detailed: bool = False) -> dict:
    payload = {
        "id": str(order.id),
        "orderNumber": order.order_number,
        "status": order.status,
        "channel": order.channel,
        "subtotal": float(order.subtotal),
        "tax": float(order.tax),
        "shippingFee": float(order.shipping_fee),
        "discount": float(order.discount),
        "total": float(order.total),
        "paid": order.paid,
        "paidAt": order.paid_at.isoformat() if order.paid_at else None,
        "placedAt": order.placed_at.isoformat() if order.placed_at else None,
        "createdAt": order.created_at.isoformat(),
        "customerId": str(order.customer_id) if order.customer_id else None,
        "itemCount": sum(i.quantity for i in order.items),
        "items": [
            {
                "id": i.id,
                "productId": str(i.product_id) if i.product_id else None,
                "productSlug": i.product.slug if i.product else None,
                "name": i.product_name,
                "sku": i.sku,
                "variantLabel": i.variant_label,
                "image": i.image_url,
                "unitPrice": float(i.unit_price),
                "quantity": i.quantity,
                "total": float(i.total),
            }
            for i in order.items
        ],
    }
    if detailed:
        payload["notes"] = order.notes
        payload["events"] = [
            {
                "id": e.id,
                "type": e.type,
                "title": e.title,
                "description": e.description,
                "createdAt": e.created_at.isoformat(),
            }
            for e in sorted(order.events, key=lambda e: e.created_at)
        ]
        payload["documents"] = [
            {"id": d.id, "type": d.type, "name": d.name, "url": d.url} for d in order.documents
        ]
    return payload


@router.get("/orders", summary="Listar pedidos")
def list_orders(
    db: DbSession,
    actor: Actor,
    page: Page,
    status_filter: Annotated[str | None, Query(alias="status")] = None,
    search: Annotated[str | None, Query(max_length=120)] = None,
):
    stmt = select(Order)

    # Un cliente solo ve lo suyo; el staff ve todo.
    if actor.type == "customer":
        stmt = stmt.where(Order.customer_id == actor.id)

    if status_filter:
        stmt = stmt.where(Order.status == status_filter)
    if search:
        stmt = stmt.where(Order.order_number.ilike(f"%{search}%"))

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    rows = db.scalars(
        stmt.order_by(Order.created_at.desc()).offset(page.offset).limit(page.limit)
    ).all()
    return paginated([serialize_order(r) for r in rows], total, page.page, page.limit)


@router.get("/orders/{order_id}", summary="Detalle de pedido")
def get_order(order_id: UUID, db: DbSession, actor: Actor):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if actor.type == "customer" and order.customer_id != actor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Este pedido no te pertenece")
    return ok(serialize_order(order, detailed=True))


@router.get("/orders/number/{order_number}", summary="Buscar pedido por numero")
def get_by_number(order_number: str, db: DbSession, actor: Actor):
    order = db.scalar(select(Order).where(Order.order_number == order_number))
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if actor.type == "customer" and order.customer_id != actor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Este pedido no te pertenece")
    return ok(serialize_order(order, detailed=True))


@router.put("/orders/{order_id}/status", summary="Cambiar estado del pedido")
def update_status(
    order_id: UUID, payload: OrderStatusUpdate, db: DbSession, actor: StaffActor
):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if payload.status not in VALID_STATUSES:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            f"Estado invalido. Validos: {', '.join(VALID_STATUSES)}",
        )

    previous = order.status
    order.status = payload.status
    if payload.status == "delivered" and not order.paid:
        order.paid = True
        order.paid_at = datetime.now(timezone.utc)

    db.add(
        OrderEvent(
            order_id=order.id,
            type="status_changed",
            title=f"Estado: {previous} -> {payload.status}",
            description=payload.note,
            actor_id=actor.id,
        )
    )
    db.commit()
    db.refresh(order)
    return ok(serialize_order(order, detailed=True))


@router.post("/orders/{order_id}/cancel", summary="Cancelar pedido")
def cancel_order(order_id: UUID, db: DbSession, actor: Actor):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido no encontrado")
    if actor.type == "customer" and order.customer_id != actor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Este pedido no te pertenece")
    if order.status in ("shipped", "delivered"):
        raise HTTPException(
            status.HTTP_409_CONFLICT, "No se puede cancelar un pedido ya despachado"
        )

    order.status = "cancelled"
    db.add(
        OrderEvent(
            order_id=order.id,
            type="cancelled",
            title="Pedido cancelado",
            description=f"Cancelado por {actor.name}",
            actor_id=actor.id,
        )
    )
    db.commit()
    db.refresh(order)
    return ok(serialize_order(order, detailed=True))
