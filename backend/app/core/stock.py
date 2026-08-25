"""Utilidades de existencias compartidas entre catalogo e inventario.

El numero de movimiento y el saldo se calculan en un solo lugar: si cada
endpoint los armara por su cuenta, el historial terminaria desalineado del
stock real la primera vez que alguien cambie una de las dos copias.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import StockItem, StockMovement, Warehouse


def next_movement_number(db: Session) -> str:
    total = db.scalar(select(func.count()).select_from(StockMovement)) or 0
    return f"MOV-{total + 1:06d}"


def default_warehouse(db: Session) -> Warehouse | None:
    """El almacen principal; si no hay ninguno marcado asi, el primero."""
    principal = db.scalar(select(Warehouse).where(Warehouse.type == "principal"))
    return principal or db.scalar(select(Warehouse).order_by(Warehouse.id))


def register_movement(
    db: Session,
    *,
    item: StockItem,
    quantity: int,
    reason: str | None,
    person_id: uuid.UUID | None,
) -> StockMovement:
    """Deja rastro de un cambio de stock. No hace commit: el que llama decide
    la transaccion, para que el saldo y el movimiento entren juntos o no
    entren."""
    movimiento = StockMovement(
        movement_number=next_movement_number(db),
        product_id=item.product_id,
        variant_id=item.variant_id,
        warehouse_id=item.warehouse_id,
        type="entrada" if quantity > 0 else "salida",
        quantity=abs(quantity),
        balance=item.quantity,
        reason=reason,
        person_id=person_id,
    )
    db.add(movimiento)
    item.last_movement_at = datetime.now(timezone.utc)
    return movimiento
