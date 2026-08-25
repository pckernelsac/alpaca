"""Registro central de modelos.

Alembic y SQLAlchemy necesitan que todos los modelos esten importados antes
de resolver relaciones y autogenerar migraciones.
"""

from app.db.base import Base
from app.models.catalog import (
    Category,
    Collection,
    Product,
    ProductMedia,
    ProductTag,
    ProductVariant,
    Tag,
)
from app.models.cms import (
    Benefit,
    ContactInquiry,
    Content,
    FaqCategory,
    FaqItem,
    GalleryImage,
    HeroSlide,
    Testimonial,
)
from app.models.crm import Client, ClientAddress, ClientNote, ClientPaymentMethod
from app.models.customers import (
    Cart,
    CartItem,
    Customer,
    CustomerAddress,
    IdempotencyKey,
    WishlistItem,
)
from app.models.iam import (
    Department,
    PasswordReset,
    Permission,
    Role,
    RolePermission,
    Session,
    User,
)
from app.models.inventory import (
    StockItem,
    StockMovement,
    Warehouse,
    WarehouseTransfer,
    WarehouseTransferItem,
)
from app.models.logistics import Carrier, Shipment, ShipmentEvent
from app.models.marketing import (
    Campaign,
    Coupon,
    NewsletterSubscriber,
    Promotion,
    Review,
)
from app.models.orders import Order, OrderDocument, OrderEvent, OrderItem
from app.models.payments import Transaction, TransactionRefund, WebhookEvent
from app.models.system import AuditLog, CompanySettings
from app.models.textile import (
    ArtisanProcess,
    FiberMaterial,
    Season,
    TextileColor,
    TextileSize,
)

__all__ = [
    "Base",
    "ArtisanProcess", "AuditLog", "Benefit", "Campaign", "Carrier", "Cart", "CartItem",
    "Category", "Client", "ClientAddress", "ClientNote", "ClientPaymentMethod",
    "Collection", "CompanySettings", "ContactInquiry", "Content", "Coupon", "Customer",
    "CustomerAddress", "Department", "FaqCategory", "FaqItem", "FiberMaterial",
    "GalleryImage", "HeroSlide", "IdempotencyKey", "NewsletterSubscriber", "Order",
    "OrderDocument", "OrderEvent", "OrderItem", "PasswordReset", "Permission", "Product",
    "ProductMedia", "ProductTag", "ProductVariant", "Promotion", "Review", "Role",
    "RolePermission", "Season", "Session", "Shipment", "ShipmentEvent", "StockItem",
    "StockMovement", "Tag", "Testimonial", "TextileColor", "TextileSize", "Transaction",
    "TransactionRefund", "User", "Warehouse", "WarehouseTransfer", "WarehouseTransferItem",
    "WebhookEvent", "WishlistItem",
]
