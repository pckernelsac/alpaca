"""Catalogo: productos, variantes, fotos, categorias y colecciones.

La lectura es publica; todo lo que escribe pide staff.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import func, or_, select

from app.core.deps import DbSession, Page, StaffActor
from app.core.slugs import slugify, unique_slug
from app.core.stock import default_warehouse, register_movement
from app.models import (
    CartItem,
    Category,
    Collection,
    OrderItem,
    Product,
    ProductMedia,
    ProductVariant,
    StockItem,
    StockMovement,
    WarehouseTransferItem,
    WishlistItem,
)
from app.schemas.catalog import (
    CategoryCreate,
    CategoryOut,
    CollectionOut,
    MediaCreate,
    MediaOut,
    MediaUpdate,
    ProductCreate,
    ProductOut,
    ProductUpdate,
    VariantCreate,
    VariantOut,
    VariantUpdate,
)
from app.schemas.common import ok, paginated

router = APIRouter(tags=["Catalogo"])


@router.get("/products", summary="Listar productos")
def list_products(
    db: DbSession,
    page: Page,
    search: Annotated[str | None, Query(max_length=120)] = None,
    category_id: int | None = None,
    collection_id: str | None = None,
    status_filter: Annotated[str | None, Query(alias="status")] = None,
    sort: Annotated[str, Query(pattern="^(recent|name|price_asc|price_desc)$")] = "recent",
):
    stmt = select(Product).where(Product.deleted_at.is_(None))

    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(or_(Product.name.ilike(pattern), Product.sku.ilike(pattern)))
    if category_id:
        stmt = stmt.where(Product.category_id == category_id)
    if collection_id:
        stmt = stmt.where(Product.collection_id == collection_id)
    if status_filter:
        stmt = stmt.where(Product.status == status_filter)

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0

    if sort in ("price_asc", "price_desc"):
        # El precio del producto es el minimo de sus variantes.
        min_price = (
            select(func.min(ProductVariant.price))
            .where(ProductVariant.product_id == Product.id)
            .scalar_subquery()
        )
        stmt = stmt.order_by(min_price.asc() if sort == "price_asc" else min_price.desc())
    elif sort == "name":
        stmt = stmt.order_by(Product.name.asc())
    else:
        stmt = stmt.order_by(Product.created_at.desc())

    rows = db.scalars(stmt.offset(page.offset).limit(page.limit)).all()
    items = [ProductOut.model_validate(r).model_dump(mode="json") for r in rows]
    return paginated(items, total, page.page, page.limit)


def find_product(db, identificador: str) -> Product:
    """Resuelve por slug o por id.

    Acepta las dos formas a proposito: las URLs nuevas usan el slug, pero los
    links viejos con UUID —y el carrito, que guarda el id— tienen que seguir
    funcionando.
    """
    product = db.scalar(select(Product).where(Product.slug == identificador))
    if product is None:
        try:
            product = db.get(Product, UUID(identificador))
        except ValueError:
            product = None
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")
    return product


@router.get("/products/{identificador}", summary="Detalle de producto por slug o id")
def get_product(identificador: str, db: DbSession):
    product = find_product(db, identificador)
    return ok(ProductOut.model_validate(product).model_dump(mode="json"))


@router.post("/products", status_code=status.HTTP_201_CREATED, summary="Crear producto")
def create_product(payload: ProductCreate, db: DbSession, actor: StaffActor):
    if db.scalar(select(Product).where(Product.sku == payload.sku)):
        raise HTTPException(status.HTTP_409_CONFLICT, "El SKU ya existe")

    tomados = set(db.scalars(select(Product.slug)).all())
    slug = unique_slug(payload.name, tomados, fallback=slugify(payload.sku))
    product = Product(**payload.model_dump(), slug=slug, created_by=actor.id)
    db.add(product)
    db.commit()
    db.refresh(product)
    return ok(ProductOut.model_validate(product).model_dump(mode="json"))


@router.put("/products/{product_id}", summary="Actualizar producto")
def update_product(product_id: UUID, payload: ProductUpdate, db: DbSession, actor: StaffActor):
    product = db.get(Product, product_id)
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")
    data = payload.model_dump(exclude_unset=True)
    if data.get("slug"):
        tomados = set(db.scalars(select(Product.slug).where(Product.id != product_id)).all())
        data["slug"] = unique_slug(data["slug"], tomados, fallback=slugify(product.sku))
    else:
        data.pop("slug", None)

    for field, value in data.items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return ok(ProductOut.model_validate(product).model_dump(mode="json"))


@router.delete("/products/{product_id}", summary="Eliminar producto (soft delete)")
def delete_product(product_id: UUID, db: DbSession, actor: StaffActor):
    product = db.get(Product, product_id)
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")
    product.deleted_at = func.current_timestamp()
    db.commit()
    return ok({"deleted": True, "id": str(product_id)})


@router.get("/categories", summary="Listar categorias")
def list_categories(db: DbSession):
    rows = db.scalars(
        select(Category).where(Category.deleted_at.is_(None)).order_by(Category.name)
    ).all()
    return ok([CategoryOut.model_validate(r).model_dump(mode="json") for r in rows])


@router.post("/categories", status_code=status.HTTP_201_CREATED, summary="Crear categoria")
def create_category(payload: CategoryCreate, db: DbSession, actor: StaffActor):
    if db.scalar(select(Category).where(Category.slug == payload.slug)):
        raise HTTPException(status.HTTP_409_CONFLICT, "El slug ya existe")
    category = Category(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return ok(CategoryOut.model_validate(category).model_dump(mode="json"))


@router.get("/collections", summary="Listar colecciones")
def list_collections(db: DbSession):
    rows = db.scalars(
        select(Collection)
        .where(Collection.deleted_at.is_(None), Collection.active.is_(True))
        .order_by(Collection.name)
    ).all()
    return ok([CollectionOut.model_validate(r).model_dump(mode="json") for r in rows])


@router.get("/collections/{collection_id}", summary="Detalle de coleccion")
def get_collection(collection_id: str, db: DbSession):
    collection = db.get(Collection, collection_id)
    if not collection or collection.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Coleccion no encontrada")
    return ok(CollectionOut.model_validate(collection).model_dump(mode="json"))


# ---------------------------------------------------------------------------
# Variantes
# ---------------------------------------------------------------------------
@router.post("/variants", status_code=status.HTTP_201_CREATED, summary="Crear variante")
def create_variant(payload: VariantCreate, db: DbSession, actor: StaffActor):
    """Crea la variante y le abre su fila de stock.

    Sin la fila en `stock_items` la variante no aparece en inventario y nadie
    puede ajustarla: naceria invisible para la operacion.
    """
    product = db.get(Product, payload.product_id)
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")

    if db.scalar(select(ProductVariant).where(ProductVariant.sku == payload.sku)):
        raise HTTPException(status.HTTP_409_CONFLICT, "El SKU de variante ya existe")

    variant = ProductVariant(**payload.model_dump(exclude={"warehouse_id", "min_stock"}))
    db.add(variant)
    db.flush()

    warehouse_id = payload.warehouse_id
    if warehouse_id is None:
        warehouse = default_warehouse(db)
        if warehouse is None:
            raise HTTPException(
                status.HTTP_409_CONFLICT,
                "No hay almacenes cargados: cree uno antes de dar de alta variantes",
            )
        warehouse_id = warehouse.id

    item = StockItem(
        product_id=product.id,
        variant_id=variant.id,
        warehouse_id=warehouse_id,
        quantity=payload.stock,
        min_stock=payload.min_stock,
    )
    db.add(item)
    db.flush()

    if payload.stock:
        register_movement(
            db,
            item=item,
            quantity=payload.stock,
            reason=f"Alta de la variante {variant.sku}",
            person_id=actor.id,
        )

    db.commit()
    db.refresh(variant)
    return ok(VariantOut.model_validate(variant).model_dump(mode="json"))


@router.put("/variants/{variant_id}", summary="Actualizar variante")
def update_variant(variant_id: UUID, payload: VariantUpdate, db: DbSession, actor: StaffActor):
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Variante no encontrada")

    datos = payload.model_dump(exclude_unset=True)
    nuevo_sku = datos.get("sku")
    if nuevo_sku and nuevo_sku != variant.sku:
        duplicado = db.scalar(
            select(ProductVariant).where(
                ProductVariant.sku == nuevo_sku, ProductVariant.id != variant_id
            )
        )
        if duplicado:
            raise HTTPException(status.HTTP_409_CONFLICT, "El SKU de variante ya existe")

    for campo, valor in datos.items():
        setattr(variant, campo, valor)
    db.commit()
    db.refresh(variant)
    return ok(VariantOut.model_validate(variant).model_dump(mode="json"))


@router.delete("/variants/{variant_id}", summary="Eliminar variante")
def delete_variant(variant_id: UUID, db: DbSession, actor: StaffActor):
    """Borra de verdad solo si nadie la compro.

    Una variante que ya figura en un pedido no se puede borrar sin romper el
    historial de ventas; ahi se desactiva, que es lo que el negocio quiere
    decir con "sacarla del catalogo".
    """
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Variante no encontrada")

    vendida = db.scalar(
        select(func.count()).select_from(OrderItem).where(OrderItem.variant_id == variant_id)
    ) or 0
    transferida = db.scalar(
        select(func.count())
        .select_from(WarehouseTransferItem)
        .where(WarehouseTransferItem.variant_id == variant_id)
    ) or 0

    if vendida or transferida:
        variant.status = "inactive"
        db.commit()
        motivo = []
        if vendida:
            motivo.append(f"{vendida} pedido(s)")
        if transferida:
            motivo.append(f"{transferida} transferencia(s)")
        return ok(
            {
                "deleted": False,
                "deactivated": True,
                "id": str(variant_id),
                "reason": f"Figura en {' y '.join(motivo)}: se desactivo en vez de borrarse",
            }
        )

    # Referencias blandas: se sueltan en vez de borrar la fila del otro lado.
    # Un carrito o un favorito del cliente no tienen por que romperse, y los
    # movimientos de stock son historial que conviene conservar.
    for tabla in (CartItem, WishlistItem, ProductMedia, StockMovement):
        db.execute(
            tabla.__table__.update()
            .where(tabla.variant_id == variant_id)
            .values(variant_id=None)
        )

    db.execute(StockItem.__table__.delete().where(StockItem.variant_id == variant_id))
    # El flush explicito ordena las bajas: sin relacion declarada entre
    # stock_items y la variante, SQLAlchemy no sabe que una depende de la otra
    # y podria intentar borrar la variante primero.
    db.flush()

    db.delete(variant)
    db.commit()
    return ok({"deleted": True, "deactivated": False, "id": str(variant_id)})


# ---------------------------------------------------------------------------
# Fotos del producto
# ---------------------------------------------------------------------------
def ensure_single_principal(db, product_id: UUID, principal_id: UUID | None) -> None:
    """Deja una sola foto marcada como principal.

    El producto expone `image` tomando la principal; con dos marcadas, cual se
    muestra dependeria del orden que devuelva la base.
    """
    fotos = db.scalars(select(ProductMedia).where(ProductMedia.product_id == product_id)).all()
    if principal_id is None:
        visibles = [m for m in fotos if m.visible]
        principal_id = visibles[0].id if visibles else (fotos[0].id if fotos else None)
    for foto in fotos:
        foto.is_principal = foto.id == principal_id


@router.post(
    "/products/{product_id}/media",
    status_code=status.HTTP_201_CREATED,
    summary="Agregar foto a un producto",
)
def add_media(product_id: UUID, payload: MediaCreate, db: DbSession, actor: StaffActor):
    product = db.get(Product, product_id)
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")

    if payload.variant_id:
        variant = db.get(ProductVariant, payload.variant_id)
        if not variant or variant.product_id != product_id:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "La variante no pertenece a este producto"
            )

    primera = not product.media
    media = ProductMedia(**payload.model_dump(), product_id=product_id)
    # La primera foto queda principal aunque no lo pidan: un producto sin
    # principal se ve sin imagen en la tienda.
    media.is_principal = payload.is_principal or primera
    db.add(media)
    db.flush()

    if media.is_principal:
        ensure_single_principal(db, product_id, media.id)

    db.commit()
    db.refresh(media)
    return ok(MediaOut.model_validate(media).model_dump(mode="json"))


@router.put("/media/{media_id}", summary="Actualizar foto")
def update_media(media_id: UUID, payload: MediaUpdate, db: DbSession, actor: StaffActor):
    media = db.get(ProductMedia, media_id)
    if not media:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Foto no encontrada")

    datos = payload.model_dump(exclude_unset=True)
    for campo, valor in datos.items():
        setattr(media, campo, valor)

    if datos.get("is_principal"):
        ensure_single_principal(db, media.product_id, media.id)
    elif datos.get("visible") is False and media.is_principal:
        # Ocultar la principal dejaria al producto sin imagen: pasa el titulo
        # a la primera visible que quede.
        media.is_principal = False
        ensure_single_principal(db, media.product_id, None)

    db.commit()
    db.refresh(media)
    return ok(MediaOut.model_validate(media).model_dump(mode="json"))


@router.delete("/media/{media_id}", summary="Eliminar foto")
def delete_media(media_id: UUID, db: DbSession, actor: StaffActor):
    media = db.get(ProductMedia, media_id)
    if not media:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Foto no encontrada")

    product_id, era_principal = media.product_id, media.is_principal
    db.delete(media)
    db.flush()
    if era_principal:
        ensure_single_principal(db, product_id, None)
    db.commit()
    return ok({"deleted": True, "id": str(media_id)})
