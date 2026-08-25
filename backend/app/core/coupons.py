"""Reglas de un cupon, en un solo lugar.

Las usan el carrito (que aplica) y `/coupons/validate` (que solo opina). Si
cada uno tuviera su copia, un cupon podria validar bien y despues fallar al
aplicarse, que es la peor forma de enterarse.
"""

from datetime import datetime, timezone
from decimal import Decimal

from app.models import Coupon


def motivo_de_rechazo(coupon: Coupon | None, subtotal: Decimal | None = None) -> str | None:
    """Devuelve por que no sirve el cupon, o None si sirve."""
    if coupon is None:
        return "El cupon no existe"
    if not coupon.active:
        return "El cupon esta desactivado"
    if coupon.expires_at and coupon.expires_at < datetime.now(timezone.utc):
        return "El cupon expiro"
    if coupon.max_uses and coupon.used_count >= coupon.max_uses:
        return "El cupon alcanzo su limite de usos"
    if subtotal is not None and coupon.min_purchase and subtotal < coupon.min_purchase:
        return f"El cupon requiere una compra minima de S/{coupon.min_purchase}"
    return None


def calcular_descuento(coupon: Coupon, subtotal: Decimal) -> Decimal:
    """Cuanto descuenta sobre ese subtotal. Nunca mas que el subtotal: un
    cupon fijo mayor a la compra no puede dejar un total negativo."""
    if coupon.type == "percentage":
        descuento = (subtotal * Decimal(coupon.value) / 100).quantize(Decimal("0.01"))
    else:
        descuento = Decimal(coupon.value)
    return min(descuento, subtotal)
