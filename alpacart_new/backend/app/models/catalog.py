"""Catalogo: categorias, colecciones, productos, variantes, media y tags."""

import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin
from app.models.textile import TextileSize


class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    image: Mapped[str | None] = mapped_column(String(500))
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"))
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class Collection(Base, TimestampMixin):
    """La PK es un codigo legible (p. ej. 'AG-2024'), no un serial."""

    __tablename__ = "collections"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    image: Mapped[str | None] = mapped_column(String(500))
    piece_count: Mapped[int | None] = mapped_column(Integer)
    season_id: Mapped[int | None] = mapped_column(ForeignKey("seasons.id"))
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class Tag(Base, TimestampMixin):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sku: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    # Cara publica del producto en la URL. Unico, porque es por donde se lo busca.
    slug: Mapped[str] = mapped_column(String(160), nullable=False, unique=True, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    material: Mapped[str | None] = mapped_column(String(255))
    category_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"))
    collection_id: Mapped[str | None] = mapped_column(ForeignKey("collections.id"))
    weight: Mapped[Decimal | None] = mapped_column(Numeric(8, 2))
    status: Mapped[str] = mapped_column(String(30), default="draft", server_default="draft")
    created_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    category: Mapped["Category | None"] = relationship(lazy="selectin")
    collection: Mapped["Collection | None"] = relationship(lazy="selectin")
    variants: Mapped[list["ProductVariant"]] = relationship(
        back_populates="product", cascade="all, delete-orphan", lazy="selectin"
    )
    media: Mapped[list["ProductMedia"]] = relationship(
        back_populates="product", cascade="all, delete-orphan", lazy="selectin"
    )
    tags: Mapped[list["ProductTag"]] = relationship(
        back_populates="product", cascade="all, delete-orphan", lazy="selectin"
    )


class ProductVariant(Base, TimestampMixin):
    __tablename__ = "product_variants"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False
    )
    sku: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    code: Mapped[str | None] = mapped_column(String(50))
    color_hex: Mapped[str | None] = mapped_column(String(7))
    color_name: Mapped[str | None] = mapped_column(String(100))
    size_id: Mapped[int | None] = mapped_column(ForeignKey("textile_sizes.id"))
    material_id: Mapped[int | None] = mapped_column(ForeignKey("fiber_materials.id"))
    color_id: Mapped[int | None] = mapped_column(ForeignKey("textile_colors.id"))
    price: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    stock: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    status: Mapped[str] = mapped_column(String(30), default="active", server_default="active")

    product: Mapped["Product"] = relationship(back_populates="variants")
    size: Mapped["TextileSize | None"] = relationship(lazy="selectin")


class ProductMedia(Base, TimestampMixin):
    __tablename__ = "product_media"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False
    )
    variant_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("product_variants.id"))
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    type: Mapped[str] = mapped_column(String(10), default="image", server_default="image")
    format: Mapped[str | None] = mapped_column(String(10))
    file_size: Mapped[str | None] = mapped_column(String(20))
    dimensions: Mapped[str | None] = mapped_column(String(30))
    alt_text: Mapped[str | None] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text)
    is_principal: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")
    visible: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")

    product: Mapped["Product"] = relationship(back_populates="media")


class ProductTag(Base, TimestampMixin):
    __tablename__ = "product_tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False
    )
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id", ondelete="CASCADE"), nullable=False)

    product: Mapped["Product"] = relationship(back_populates="tags")
    tag: Mapped["Tag"] = relationship(lazy="selectin")

    __table_args__ = (UniqueConstraint("product_id", "tag_id", name="uq_product_tag"),)
