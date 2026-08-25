"""KPIs del dashboard, marketing, auditoria y configuracion."""

from datetime import datetime, timedelta, timezone
from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import func, select

from app.core.coupons import calcular_descuento, motivo_de_rechazo
from app.core.deps import DbSession, OptionalActor, Page, StaffActor
from app.models import (
    AuditLog,
    Campaign,
    Cart,
    CompanySettings,
    Coupon,
    Customer,
    NewsletterSubscriber,
    Order,
    OrderItem,
    Product,
    ProductVariant,
    Promotion,
    StockItem,
)
from app.schemas.common import ok, paginated
from app.schemas.system import (
    CampaignCreate,
    CampaignUpdate,
    CompanyUpdate,
    CouponCreate,
    CouponUpdate,
    CouponValidate,
    PromotionCreate,
    PromotionUpdate,
)

router = APIRouter(tags=["Sistema"])


@router.get("/analytics/kpis", summary="Indicadores del dashboard")
def kpis(db: DbSession, actor: StaffActor):
    now = datetime.now(timezone.utc)
    month_ago = now - timedelta(days=30)

    revenue = db.scalar(
        select(func.coalesce(func.sum(Order.total), 0)).where(Order.status != "cancelled")
    )
    revenue_month = db.scalar(
        select(func.coalesce(func.sum(Order.total), 0)).where(
            Order.status != "cancelled", Order.created_at >= month_ago
        )
    )
    orders_total = db.scalar(select(func.count()).select_from(Order)) or 0
    orders_pending = db.scalar(
        select(func.count()).select_from(Order).where(Order.status == "pending")
    ) or 0
    customers_total = db.scalar(
        select(func.count()).select_from(Customer).where(Customer.deleted_at.is_(None))
    ) or 0
    products_active = db.scalar(
        select(func.count())
        .select_from(Product)
        .where(Product.status == "active", Product.deleted_at.is_(None))
    ) or 0
    low_stock = db.scalar(
        select(func.count()).select_from(StockItem).where(StockItem.quantity <= StockItem.min_stock)
    ) or 0

    avg_ticket = float(revenue) / orders_total if orders_total else 0.0

    return ok(
        {
            "revenue": float(revenue),
            "revenueMonth": float(revenue_month),
            "ordersTotal": orders_total,
            "ordersPending": orders_pending,
            "customersTotal": customers_total,
            "productsActive": products_active,
            "lowStockCount": low_stock,
            "averageTicket": round(avg_ticket, 2),
        }
    )


@router.get("/analytics/sales-by-month", summary="Ventas por mes")
def sales_by_month(db: DbSession, actor: StaffActor, months: int = 6):
    since = datetime.now(timezone.utc) - timedelta(days=30 * months)
    rows = db.execute(
        select(
            func.to_char(Order.created_at, "YYYY-MM").label("month"),
            func.coalesce(func.sum(Order.total), 0).label("total"),
            func.count().label("orders"),
        )
        .where(Order.created_at >= since, Order.status != "cancelled")
        .group_by("month")
        .order_by("month")
    ).all()
    return ok([{"month": r.month, "total": float(r.total), "orders": r.orders} for r in rows])


@router.get("/analytics/top-products", summary="Productos mas vendidos")
def top_products(db: DbSession, actor: StaffActor, limit: int = 10):
    rows = db.execute(
        select(
            OrderItem.product_id,
            OrderItem.product_name,
            func.sum(OrderItem.quantity).label("units"),
            func.sum(OrderItem.total).label("revenue"),
        )
        .group_by(OrderItem.product_id, OrderItem.product_name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(limit)
    ).all()
    return ok(
        [
            {
                "productId": str(r.product_id) if r.product_id else None,
                "name": r.product_name,
                "units": int(r.units),
                "revenue": float(r.revenue),
            }
            for r in rows
        ]
    )


def serialize_coupon(r: Coupon) -> dict:
    return {
        "id": r.id,
        "code": r.code,
        "type": r.type,
        "value": float(r.value),
        "minPurchase": float(r.min_purchase) if r.min_purchase else None,
        "maxUses": r.max_uses,
        "usedCount": r.used_count,
        "active": r.active,
        "expiresAt": r.expires_at.isoformat() if r.expires_at else None,
        "campaignId": str(r.campaign_id) if r.campaign_id else None,
    }


def serialize_campaign(r: Campaign) -> dict:
    return {
        "id": str(r.id),
        "name": r.name,
        "type": r.type,
        "channel": r.channel,
        "status": r.status,
        "budget": float(r.budget) if r.budget else None,
        "spent": float(r.spent) if r.spent else None,
        "conversions": r.conversions,
        "image": r.image,
        "startDate": r.start_date.isoformat() if r.start_date else None,
        "endDate": r.end_date.isoformat() if r.end_date else None,
    }


def serialize_promotion(r: Promotion) -> dict:
    return {
        "id": r.id,
        "name": r.name,
        "type": r.type,
        "discountValue": float(r.discount_value),
        "appliesTo": r.applies_to,
        "productIds": r.product_ids,
        "categoryId": r.category_id,
        "collectionId": r.collection_id,
        "startsAt": r.starts_at.isoformat(),
        "endsAt": r.ends_at.isoformat(),
        "active": r.active,
        "campaignId": str(r.campaign_id) if r.campaign_id else None,
    }


@router.get("/coupons", summary="Listar cupones")
def list_coupons(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Coupon).order_by(Coupon.code)).all()
    return ok([serialize_coupon(r) for r in rows])


@router.post("/coupons", status_code=status.HTTP_201_CREATED, summary="Crear cupon")
def create_coupon(payload: CouponCreate, db: DbSession, actor: StaffActor):
    if db.scalar(select(Coupon).where(func.upper(Coupon.code) == payload.code.upper())):
        raise HTTPException(status.HTTP_409_CONFLICT, "Ya existe un cupon con ese codigo")
    coupon = Coupon(**payload.model_dump(), created_by=actor.id)
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return ok(serialize_coupon(coupon))


@router.get("/campaigns", summary="Listar campanias")
def list_campaigns(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Campaign).order_by(Campaign.created_at.desc())).all()
    return ok([serialize_campaign(r) for r in rows])


@router.get("/newsletter/subscribers", summary="Suscriptores del newsletter")
def subscribers(db: DbSession, page: Page, actor: StaffActor):
    total = db.scalar(select(func.count()).select_from(NewsletterSubscriber)) or 0
    rows = db.scalars(
        select(NewsletterSubscriber)
        .order_by(NewsletterSubscriber.created_at.desc())
        .offset(page.offset)
        .limit(page.limit)
    ).all()
    items = [
        {"id": r.id, "email": r.email, "source": r.source, "active": r.active,
         "createdAt": r.created_at.isoformat()}
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)


@router.get("/audit", summary="Bitacora de auditoria")
def audit(db: DbSession, page: Page, actor: StaffActor):
    total = db.scalar(select(func.count()).select_from(AuditLog)) or 0
    rows = db.scalars(
        select(AuditLog).order_by(AuditLog.created_at.desc()).offset(page.offset).limit(page.limit)
    ).all()
    items = [
        {
            "id": r.id,
            "userId": str(r.user_id) if r.user_id else None,
            "action": r.action,
            "module": r.module,
            "description": r.description,
            "severity": r.severity,
            "ipAddress": r.ip_address,
            "createdAt": r.created_at.isoformat(),
        }
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)


@router.get("/settings/company", summary="Datos de la empresa")
def get_company(db: DbSession, actor: StaffActor):
    settings_row = db.scalar(select(CompanySettings))
    if not settings_row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Configuracion no encontrada")
    return ok(
        {
            "id": settings_row.id,
            "legalName": settings_row.legal_name,
            "taxId": settings_row.tax_id,
            "industry": settings_row.industry,
            "website": settings_row.website,
            "email": settings_row.email,
            "phone": settings_row.phone,
            "address": settings_row.address,
            "primaryCurrency": settings_row.primary_currency,
            "defaultTimezone": settings_row.default_timezone,
            "systemLanguage": settings_row.system_language,
            "logo": settings_row.logo,
        }
    )


@router.put("/settings/company", summary="Actualizar datos de la empresa")
def update_company(payload: CompanyUpdate, db: DbSession, actor: StaffActor):
    settings_row = db.scalar(select(CompanySettings))
    if not settings_row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Configuracion no encontrada")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(settings_row, field, value)
    db.commit()
    return ok({"updated": True})


# ---------------------------------------------------------------------------
# Cupones: detalle, edicion, baja y validacion
# ---------------------------------------------------------------------------
@router.get("/coupons/{coupon_id}", summary="Detalle de cupon")
def get_coupon(coupon_id: int, db: DbSession, actor: StaffActor):
    coupon = db.get(Coupon, coupon_id)
    if not coupon:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Cupon no encontrado")
    return ok(serialize_coupon(coupon))


@router.put("/coupons/{coupon_id}", summary="Actualizar cupon")
def update_coupon(coupon_id: int, payload: CouponUpdate, db: DbSession, actor: StaffActor):
    """El codigo no se edita.

    Un cupon ya circula impreso o en un mail; cambiarle el codigo no arregla
    nada y rompe el que la gente tiene. Para otro codigo, otro cupon.
    """
    coupon = db.get(Coupon, coupon_id)
    if not coupon:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Cupon no encontrado")

    for campo, valor in payload.model_dump(exclude_unset=True).items():
        setattr(coupon, campo, valor)
    db.commit()
    db.refresh(coupon)
    return ok(serialize_coupon(coupon))


@router.delete("/coupons/{coupon_id}", summary="Eliminar cupon")
def delete_coupon(coupon_id: int, db: DbSession, actor: StaffActor):
    """Si ya se uso en un pedido se desactiva: borrarlo dejaria pedidos
    apuntando a un cupon inexistente y no se podria auditar el descuento."""
    coupon = db.get(Coupon, coupon_id)
    if not coupon:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Cupon no encontrado")

    usado = db.scalar(
        select(func.count()).select_from(Order).where(Order.coupon_id == coupon_id)
    ) or 0
    if usado:
        coupon.active = False
        db.commit()
        return ok(
            {
                "deleted": False,
                "deactivated": True,
                "id": coupon_id,
                "reason": f"Se uso en {usado} pedido(s): se desactivo en vez de borrarse",
            }
        )

    # Un carrito abierto puede tenerlo puesto; se lo suelta y el proximo
    # recalculo del carrito deja el descuento en cero.
    db.execute(Cart.__table__.update().where(Cart.coupon_id == coupon_id).values(coupon_id=None))
    db.flush()
    db.delete(coupon)
    db.commit()
    return ok({"deleted": True, "deactivated": False, "id": coupon_id})


@router.post("/coupons/validate", summary="Validar un cupon")
def validate_coupon(payload: CouponValidate, db: DbSession):
    """Publico: la tienda pregunta antes de aplicar.

    Nunca dice por que un codigo no existe con mas detalle del necesario, y no
    consume el cupon: solo opina.
    """
    coupon = db.scalar(select(Coupon).where(func.upper(Coupon.code) == payload.code.upper()))
    motivo = motivo_de_rechazo(coupon, payload.subtotal)

    if motivo or coupon is None:
        return ok({"valid": False, "reason": motivo, "code": payload.code.upper()})

    descuento = (
        float(calcular_descuento(coupon, payload.subtotal))
        if payload.subtotal is not None
        else None
    )
    return ok(
        {
            "valid": True,
            "reason": None,
            "code": coupon.code,
            "type": coupon.type,
            "value": float(coupon.value),
            "discount": descuento,
            "minPurchase": float(coupon.min_purchase) if coupon.min_purchase else None,
        }
    )


# ---------------------------------------------------------------------------
# Campanias
# ---------------------------------------------------------------------------
@router.get("/campaigns/{campaign_id}", summary="Detalle de campania")
def get_campaign(campaign_id: UUID, db: DbSession, actor: StaffActor):
    campaign = db.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Campania no encontrada")
    return ok(serialize_campaign(campaign))


@router.post("/campaigns", status_code=status.HTTP_201_CREATED, summary="Crear campania")
def create_campaign(payload: CampaignCreate, db: DbSession, actor: StaffActor):
    campaign = Campaign(**payload.model_dump(), created_by=actor.id)
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return ok(serialize_campaign(campaign))


@router.put("/campaigns/{campaign_id}", summary="Actualizar campania")
def update_campaign(
    campaign_id: UUID, payload: CampaignUpdate, db: DbSession, actor: StaffActor
):
    campaign = db.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Campania no encontrada")
    for campo, valor in payload.model_dump(exclude_unset=True).items():
        setattr(campaign, campo, valor)
    db.commit()
    db.refresh(campaign)
    return ok(serialize_campaign(campaign))


@router.delete("/campaigns/{campaign_id}", summary="Eliminar campania")
def delete_campaign(campaign_id: UUID, db: DbSession, actor: StaffActor):
    """Los cupones y promociones de la campania no se borran con ella: son
    piezas que pueden seguir vivas solas, asi que se les suelta el vinculo."""
    campaign = db.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Campania no encontrada")

    sueltos = db.scalar(
        select(func.count()).select_from(Coupon).where(Coupon.campaign_id == campaign_id)
    ) or 0
    sueltos += db.scalar(
        select(func.count()).select_from(Promotion).where(Promotion.campaign_id == campaign_id)
    ) or 0

    for tabla in (Coupon, Promotion):
        db.execute(
            tabla.__table__.update()
            .where(tabla.campaign_id == campaign_id)
            .values(campaign_id=None)
        )
    db.flush()
    db.delete(campaign)
    db.commit()
    return ok({"deleted": True, "id": str(campaign_id), "unlinked": sueltos})


# ---------------------------------------------------------------------------
# Promociones
# ---------------------------------------------------------------------------
def promocion_vigente(p: Promotion) -> bool:
    ahora = datetime.now(timezone.utc)
    return p.active and p.starts_at <= ahora <= p.ends_at


@router.get("/promotions", summary="Promociones vigentes")
def list_promotions(db: DbSession, actor: OptionalActor, include_hidden: bool = False):
    """La web ve solo lo vigente; el staff, todo, incluidas las programadas."""
    rows = db.scalars(select(Promotion).order_by(Promotion.starts_at.desc())).all()
    if not (include_hidden and actor is not None and actor.type == "staff"):
        rows = [p for p in rows if promocion_vigente(p)]
    return ok([serialize_promotion(p) for p in rows])


@router.get("/promotions/{promotion_id}", summary="Detalle de promocion")
def get_promotion(promotion_id: int, db: DbSession, actor: StaffActor):
    promotion = db.get(Promotion, promotion_id)
    if not promotion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Promocion no encontrada")
    return ok(serialize_promotion(promotion))


@router.post("/promotions", status_code=status.HTTP_201_CREATED, summary="Crear promocion")
def create_promotion(payload: PromotionCreate, db: DbSession, actor: StaffActor):
    if payload.ends_at <= payload.starts_at:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "La promocion no puede terminar antes de empezar"
        )
    promotion = Promotion(**payload.model_dump(), created_by=actor.id)
    db.add(promotion)
    db.commit()
    db.refresh(promotion)
    return ok(serialize_promotion(promotion))


@router.put("/promotions/{promotion_id}", summary="Actualizar promocion")
def update_promotion(
    promotion_id: int, payload: PromotionUpdate, db: DbSession, actor: StaffActor
):
    promotion = db.get(Promotion, promotion_id)
    if not promotion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Promocion no encontrada")

    datos = payload.model_dump(exclude_unset=True)
    desde = datos.get("starts_at", promotion.starts_at)
    hasta = datos.get("ends_at", promotion.ends_at)
    if hasta <= desde:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "La promocion no puede terminar antes de empezar"
        )

    for campo, valor in datos.items():
        setattr(promotion, campo, valor)
    db.commit()
    db.refresh(promotion)
    return ok(serialize_promotion(promotion))


@router.delete("/promotions/{promotion_id}", summary="Eliminar promocion")
def delete_promotion(promotion_id: int, db: DbSession, actor: StaffActor):
    promotion = db.get(Promotion, promotion_id)
    if not promotion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Promocion no encontrada")
    db.delete(promotion)
    db.commit()
    return ok({"deleted": True, "id": promotion_id})
