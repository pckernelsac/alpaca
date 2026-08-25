"""Carga los datos base.

Es idempotente: se puede correr varias veces sin duplicar. Uso:
    python -m app.seeds.run
    python -m app.seeds.run --reset   # vacia las tablas antes de sembrar
"""

import sys
import uuid
from datetime import datetime, timedelta, timezone
from decimal import Decimal

from sqlalchemy import select, text

from app.core.security import hash_password
from app.core.slugs import unique_slug
from app.db.session import SessionLocal
from app.models import (
    ArtisanProcess,
    Benefit,
    Carrier,
    Category,
    Collection,
    CompanySettings,
    Content,
    Coupon,
    Customer,
    CustomerAddress,
    Department,
    FaqCategory,
    FaqItem,
    FiberMaterial,
    GalleryImage,
    HeroSlide,
    NewsletterSubscriber,
    Order,
    OrderEvent,
    OrderItem,
    Permission,
    Product,
    ProductMedia,
    ProductTag,
    ProductVariant,
    Review,
    Role,
    RolePermission,
    Season,
    StockItem,
    Tag,
    Testimonial,
    TextileColor,
    TextileSize,
    User,
    Warehouse,
)
from app.seeds import catalog_data as cd
from app.seeds import data as d

# Orden inverso de dependencias, para el --reset.
TABLES_IN_DELETE_ORDER = [
    "order_events", "order_documents", "order_items", "orders",
    "stock_movements", "stock_items", "warehouse_transfer_items", "warehouse_transfers",
    "shipment_events", "shipments", "transaction_refunds", "transactions",
    "cart_items", "carts", "wishlist_items", "order_idempotency_keys",
    "reviews", "product_tags", "product_media", "product_variants", "products",
    "promotions", "coupons", "campaigns", "newsletter_subscribers",
    "faq_items", "faq_categories", "gallery_images", "testimonials", "benefits",
    "hero_slides", "contents", "contact_inquiries",
    "client_payment_methods", "client_notes", "client_addresses", "clients",
    "customer_addresses", "customers", "collections", "categories", "tags",
    "artisan_processes", "seasons", "textile_sizes", "textile_colors", "fiber_materials",
    "carriers", "warehouses", "company_settings", "audit_logs",
    "sessions", "password_resets", "role_permissions", "users", "permissions",
    "roles", "departments",
]


def as_uuid(value: str | uuid.UUID) -> uuid.UUID:
    """Las columnas UUID no aceptan str: SQLAlchemy no puede casar los
    sentinels del INSERT masivo si el tipo no coincide exactamente."""
    return value if isinstance(value, uuid.UUID) else uuid.UUID(value)


def reset(db) -> None:
    print("Vaciando tablas...")
    db.execute(text("TRUNCATE " + ", ".join(TABLES_IN_DELETE_ORDER) + " RESTART IDENTITY CASCADE"))
    db.commit()


def seed_iam(db) -> None:
    for row in d.DEPARTMENTS:
        db.merge(Department(**row))
    for row in d.ROLES:
        db.merge(Role(**row))
    for row in d.PERMISSIONS:
        db.merge(Permission(**row))
    db.flush()

    for idx, (role_id, perm_id) in enumerate(d.ROLE_PERMISSIONS, start=1):
        db.merge(RolePermission(id=idx, role_id=role_id, permission_id=perm_id))

    for row in d.STAFF:
        payload = dict(row)
        payload["password"] = hash_password(payload["password"])
        payload["id"] = as_uuid(payload["id"])
        db.merge(User(**payload))
    db.commit()
    print(f"  IAM: {len(d.ROLES)} roles, {len(d.PERMISSIONS)} permisos, {len(d.STAFF)} staff")


def seed_textile(db) -> None:
    for row in d.FIBER_MATERIALS:
        db.merge(FiberMaterial(**row))
    for row in d.TEXTILE_COLORS:
        db.merge(TextileColor(**row))
    for row in d.TEXTILE_SIZES:
        db.merge(TextileSize(**row))
    for row in d.SEASONS:
        db.merge(Season(**row))
    for row in cd_artisan():
        db.merge(ArtisanProcess(**row))
    db.commit()
    print(
        f"  Textil: {len(d.FIBER_MATERIALS)} fibras, {len(d.TEXTILE_COLORS)} colores, "
        f"{len(d.TEXTILE_SIZES)} tallas"
    )


def cd_artisan() -> list[dict]:
    return d.ARTISAN_PROCESSES


def seed_catalog(db) -> None:
    for row in d.CATEGORIES:
        db.merge(Category(**row))
    for row in d.COLLECTIONS:
        db.merge(Collection(**row))
    for row in d.TAGS:
        db.merge(Tag(**row))
    db.flush()

    variant_count = 0
    slugs_usados: set[str] = set()
    for item in cd.PRODUCTS:
        product = Product(
            id=as_uuid(item["id"]),
            sku=item["sku"],
            name=item["name"],
            slug=unique_slug(item["name"], slugs_usados),
            description=item["description"],
            material=item["material"],
            category_id=item["category_id"],
            collection_id=item["collection_id"],
            weight=Decimal(item["weight"]),
            status=item["status"],
            published_at=datetime.now(timezone.utc),
        )
        slugs_usados.add(product.slug)
        db.merge(product)
        db.flush()

        for variant in item["variants"]:
            exists = db.scalar(select(ProductVariant).where(ProductVariant.sku == variant["sku"]))
            if not exists:
                db.add(
                    ProductVariant(
                        product_id=as_uuid(item["id"]),
                        sku=variant["sku"],
                        color_name=variant["color_name"],
                        color_hex=variant["color_hex"],
                        size_id=variant["size_id"],
                        material_id=variant["material_id"],
                        color_id=variant["color_id"],
                        price=Decimal(variant["price"]),
                        stock=variant["stock"],
                    )
                )
                variant_count += 1

        url = cd.IMG.format(id=item["image"]) if item.get("image") else None
        if url and not db.scalar(select(ProductMedia).where(ProductMedia.url == url)):
            db.add(
                ProductMedia(
                    product_id=as_uuid(item["id"]),
                    url=url,
                    alt_text=item["name"],
                    is_principal=True,
                )
            )

        for tag_id in item["tags"]:
            exists = db.scalar(
                select(ProductTag).where(
                    ProductTag.product_id == as_uuid(item["id"]), ProductTag.tag_id == tag_id
                )
            )
            if not exists:
                db.add(ProductTag(product_id=as_uuid(item["id"]), tag_id=tag_id))

    db.commit()
    print(f"  Catalogo: {len(cd.PRODUCTS)} productos, {variant_count} variantes")


def seed_customers(db) -> None:
    for row in d.CUSTOMERS:
        payload = dict(row)
        payload["password"] = hash_password(payload["password"])
        payload["id"] = as_uuid(payload["id"])
        db.merge(Customer(**payload))
    db.flush()

    first = as_uuid(d.CUSTOMERS[0]["id"])
    if not db.scalar(select(CustomerAddress).where(CustomerAddress.customer_id == first)):
        db.add(
            CustomerAddress(
                customer_id=first,
                name="Casa",
                street="Av. Larco 1234, Dpto 502",
                city="Lima",
                state="Lima",
                zip="15074",
                country="Peru",
                phone="+51 987 654 321",
                is_default=True,
            )
        )
    db.commit()
    print(f"  Clientes: {len(d.CUSTOMERS)}")


def seed_infra(db) -> None:
    for row in d.WAREHOUSES:
        db.merge(Warehouse(**row))
    for row in d.CARRIERS:
        db.merge(Carrier(**row))
    db.flush()

    # Stock inicial en el almacen central para cada variante.
    created = 0
    for variant in db.scalars(select(ProductVariant)).all():
        exists = db.scalar(
            select(StockItem).where(
                StockItem.variant_id == variant.id, StockItem.warehouse_id == 1
            )
        )
        if not exists:
            db.add(
                StockItem(
                    product_id=variant.product_id,
                    variant_id=variant.id,
                    warehouse_id=1,
                    quantity=variant.stock,
                    min_stock=5,
                    max_stock=200,
                )
            )
            created += 1
    db.commit()
    print(f"  Infra: {len(d.WAREHOUSES)} almacenes, {created} registros de stock")


def seed_cms(db) -> None:
    for row in cd.HERO_SLIDES:
        db.merge(HeroSlide(**row))
    for row in cd.BENEFITS:
        db.merge(Benefit(**row))
    for row in cd.TESTIMONIALS:
        db.merge(Testimonial(**row))
    for row in cd.GALLERY_IMAGES:
        db.merge(GalleryImage(**row))
    for row in cd.FAQ_CATEGORIES:
        db.merge(FaqCategory(**row))
    db.flush()

    for row in cd.FAQ_ITEMS:
        exists = db.scalar(select(FaqItem).where(FaqItem.question == row["question"]))
        if not exists:
            db.add(FaqItem(**row))

    for row in cd.CONTENTS:
        exists = db.scalar(select(Content).where(Content.slug == row["slug"]))
        if not exists:
            db.add(Content(**row, published_at=datetime.now(timezone.utc)))

    if not db.scalar(select(CompanySettings)):
        db.add(CompanySettings(**cd.COMPANY))

    db.commit()
    print(
        f"  CMS: {len(cd.HERO_SLIDES)} slides, {len(cd.FAQ_ITEMS)} FAQs, "
        f"{len(cd.CONTENTS)} contenidos"
    )


def seed_marketing(db) -> None:
    for row in cd.COUPONS:
        payload = dict(row)
        payload["value"] = Decimal(payload["value"])
        payload["min_purchase"] = Decimal(payload["min_purchase"])
        payload["expires_at"] = datetime.now(timezone.utc) + timedelta(days=90)
        db.merge(Coupon(**payload))

    for email in ["ana.torres@email.com", "bruno.diaz@email.com",
                  "carla.vega@email.com", "dario.luna@email.com"]:
        if not db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.email == email)):
            db.add(NewsletterSubscriber(email=email, source="footer"))

    reviews = [
        (as_uuid(cd.PRODUCTS[0]["id"]), "Valeria O.", 5, "Calidad altisima, abriga muchisimo.", "calidad"),
        (as_uuid(cd.PRODUCTS[1]["id"]), "Martin E.", 5, "El talle es fiel a la guia.", "talle"),
        (as_uuid(cd.PRODUCTS[1]["id"]), "Ana L.", 4, "Muy linda, tardo un poco en llegar.", "envio"),
        (as_uuid(cd.PRODUCTS[4]["id"]), "Joaquin D.", 5, "La uso todos los dias, no pica nada.", "comodidad"),
        (as_uuid(cd.PRODUCTS[2]["id"]), "Renata P.", 5, "Una joya. Cara pero lo vale.", "calidad"),
    ]
    for product_id, author, rating, txt, tag in reviews:
        if not db.scalar(select(Review).where(Review.product_id == product_id, Review.author == author)):
            db.add(Review(product_id=product_id, author=author, rating=rating, text=txt, tag=tag))

    db.commit()
    print(f"  Marketing: {len(cd.COUPONS)} cupones, {len(reviews)} resenias")


def seed_orders(db) -> None:
    if db.scalar(select(Order)):
        print("  Pedidos: ya existen, se omite")
        return

    customer_id = as_uuid(d.CUSTOMERS[0]["id"])
    variants = db.scalars(select(ProductVariant).limit(3)).all()
    if not variants:
        return

    now = datetime.now(timezone.utc)
    specs = [
        ("ALP-2024-0001", "delivered", True, 30),
        ("ALP-2024-0002", "shipped", True, 8),
        ("ALP-2024-0003", "pending", False, 1),
    ]

    for idx, (number, status_value, paid, days_ago) in enumerate(specs):
        variant = variants[idx % len(variants)]
        product = db.get(Product, variant.product_id)
        quantity = idx + 1
        subtotal = Decimal(variant.price) * quantity
        shipping = Decimal("0.00") if subtotal >= 500 else Decimal("25.00")
        tax = (subtotal * Decimal("0.18")).quantize(Decimal("0.01"))
        placed = now - timedelta(days=days_ago)

        order = Order(
            order_number=number,
            customer_id=customer_id,
            status=status_value,
            channel="web",
            subtotal=subtotal,
            tax=tax,
            shipping_fee=shipping,
            total=subtotal + tax + shipping,
            paid=paid,
            paid_at=placed if paid else None,
            placed_at=placed,
        )
        db.add(order)
        db.flush()

        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                variant_id=variant.id,
                product_name=product.name,
                sku=variant.sku,
                variant_label=variant.color_name,
                unit_price=variant.price,
                quantity=quantity,
                total=subtotal,
            )
        )
        db.add(
            OrderEvent(
                order_id=order.id,
                type="created",
                title="Pedido creado",
                description=f"Pedido {number} registrado desde la tienda web.",
            )
        )
        if paid:
            db.add(
                OrderEvent(
                    order_id=order.id, type="paid", title="Pago confirmado",
                    description="Pago acreditado correctamente.",
                )
            )

    db.commit()
    print(f"  Pedidos: {len(specs)} con items y eventos")


def sincronizar_secuencias(db) -> None:
    """Pone al dia los contadores de id de Postgres.

    Las semillas insertan ids explicitos (1, 2, 3...) y eso no mueve la
    secuencia: el primer alta desde la API intentaria reusar el id 1 y chocaria
    con la clave primaria. Se corrige una vez, al final, para todas las tablas.
    """
    # Solo tablas que tengan columna `id`: preguntar por la secuencia de una
    # que no la tiene (alembic_version) es un error, no un None.
    tablas = db.execute(
        text(
            "SELECT table_name FROM information_schema.columns "
            "WHERE table_schema = 'public' AND column_name = 'id'"
        )
    ).scalars().all()

    ajustadas = 0
    for tabla in tablas:
        secuencia = db.execute(
            text("SELECT pg_get_serial_sequence(:t, 'id')"), {"t": tabla}
        ).scalar()
        if not secuencia:
            continue  # PK uuid o sin columna id
        db.execute(
            text(
                f"SELECT setval(:seq, COALESCE((SELECT MAX(id) FROM {tabla}), 1), "
                "(SELECT MAX(id) IS NOT NULL FROM " + tabla + "))"
            ),
            {"seq": secuencia},
        )
        ajustadas += 1
    db.commit()
    print(f"  Secuencias: {ajustadas} contadores al dia")


def main() -> None:
    do_reset = "--reset" in sys.argv
    db = SessionLocal()
    try:
        print("Sembrando ALPACART...")
        if do_reset:
            reset(db)
        seed_iam(db)
        seed_textile(db)
        seed_catalog(db)
        seed_customers(db)
        seed_infra(db)
        seed_cms(db)
        seed_marketing(db)
        seed_orders(db)
        sincronizar_secuencias(db)
        print("\nListo.")
        print("  Staff:    mateo.q@alpacart.com / Admin123!")
        print("  Cliente:  camila.g@email.com / Cliente2024!")
    finally:
        db.close()


if __name__ == "__main__":
    main()
