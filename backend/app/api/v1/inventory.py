"""Inventario y logistica para el dashboard."""

from datetime import datetime, timezone
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import func, select

from app.core.deps import DbSession, Page, StaffActor
from app.models import (
    Carrier,
    Product,
    ProductVariant,
    Shipment,
    StockItem,
    StockMovement,
    Warehouse,
)
from app.schemas.common import ok, paginated
from app.schemas.inventory import StockAdjust

router = APIRouter(tags=["Inventario"])


@router.get("/warehouses", summary="Listar almacenes")
def list_warehouses(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Warehouse).order_by(Warehouse.name)).all()
    return ok(
        [
            {"id": r.id, "name": r.name, "code": r.code, "city": r.city,
             "type": r.type, "address": r.address}
            for r in rows
        ]
    )


@router.get("/stock", summary="Existencias por variante")
def list_stock(
    db: DbSession,
    page: Page,
    actor: StaffActor,
    warehouse_id: int | None = None,
    low_stock: Annotated[bool, Query()] = False,
):
    stmt = select(StockItem)
    if warehouse_id:
        stmt = stmt.where(StockItem.warehouse_id == warehouse_id)
    if low_stock:
        stmt = stmt.where(StockItem.quantity <= StockItem.min_stock)

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    rows = db.scalars(stmt.order_by(StockItem.id).offset(page.offset).limit(page.limit)).all()

    items = []
    for row in rows:
        variant = db.get(ProductVariant, row.variant_id) if row.variant_id else None
        product = db.get(Product, row.product_id) if row.product_id else None
        items.append(
            {
                "id": row.id,
                "productId": str(row.product_id) if row.product_id else None,
                "productName": product.name if product else None,
                "variantId": str(row.variant_id) if row.variant_id else None,
                "sku": variant.sku if variant else None,
                "variantLabel": variant.color_name if variant else None,
                "warehouseId": row.warehouse_id,
                "warehouse": row.warehouse.name if row.warehouse else None,
                "quantity": row.quantity,
                "reserved": row.reserved,
                "available": row.available,
                "minStock": row.min_stock,
                "maxStock": row.max_stock,
                "lowStock": row.quantity <= row.min_stock,
            }
        )
    return paginated(items, total, page.page, page.limit)


@router.post("/stock/adjust", summary="Ajustar existencias")
def adjust_stock(payload: StockAdjust, db: DbSession, actor: StaffActor):
    """Ajusta el stock y deja rastro en stock_movements.

    El movimiento y el saldo se escriben en la misma transaccion para que el
    historial nunca quede desalineado del stock real.
    """
    item = db.get(StockItem, payload.stock_item_id)
    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Registro de stock no encontrado")

    new_quantity = item.quantity + payload.quantity
    if new_quantity < 0:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            f"El ajuste dejaria el stock en {new_quantity}; disponible actual: {item.quantity}",
        )

    item.quantity = new_quantity
    item.last_movement_at = datetime.now(timezone.utc)

    if item.variant_id:
        variant = db.get(ProductVariant, item.variant_id)
        if variant:
            variant.stock = new_quantity

    count = db.scalar(select(func.count()).select_from(StockMovement)) or 0
    db.add(
        StockMovement(
            movement_number=f"MOV-{count + 1:06d}",
            product_id=item.product_id,
            variant_id=item.variant_id,
            warehouse_id=item.warehouse_id,
            type="entrada" if payload.quantity > 0 else "salida",
            quantity=abs(payload.quantity),
            balance=new_quantity,
            reason=payload.reason,
            person_id=actor.id,
        )
    )
    db.commit()
    db.refresh(item)
    return ok({"id": item.id, "quantity": item.quantity, "available": item.available})


@router.get("/stock/movements", summary="Historial de movimientos")
def list_movements(db: DbSession, page: Page, actor: StaffActor):
    total = db.scalar(select(func.count()).select_from(StockMovement)) or 0
    rows = db.scalars(
        select(StockMovement)
        .order_by(StockMovement.created_at.desc())
        .offset(page.offset)
        .limit(page.limit)
    ).all()
    items = [
        {
            "id": r.id,
            "movementNumber": r.movement_number,
            "type": r.type,
            "quantity": float(r.quantity),
            "balance": float(r.balance) if r.balance is not None else None,
            "reason": r.reason,
            "warehouseId": r.warehouse_id,
            "createdAt": r.created_at.isoformat(),
        }
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)


@router.get("/carriers", summary="Transportistas")
def list_carriers(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Carrier).where(Carrier.active.is_(True))).all()
    return ok([{"id": r.id, "name": r.name, "code": r.code} for r in rows])


@router.get("/shipments", summary="Envios")
def list_shipments(db: DbSession, page: Page, actor: StaffActor):
    total = db.scalar(select(func.count()).select_from(Shipment)) or 0
    rows = db.scalars(
        select(Shipment).order_by(Shipment.created_at.desc()).offset(page.offset).limit(page.limit)
    ).all()
    items = [
        {
            "id": str(r.id),
            "waybill": r.waybill,
            "orderId": str(r.order_id),
            "carrier": r.carrier,
            "status": r.status,
            "originCity": r.origin_city,
            "destinationCity": r.destination_city,
            "dispatchedAt": r.dispatched_at.isoformat() if r.dispatched_at else None,
            "deliveredAt": r.delivered_at.isoformat() if r.delivered_at else None,
        }
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)
