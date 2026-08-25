"""CRM B2B: clientes mayoristas, sus direcciones, notas y medios de pago."""

import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class Client(Base, TimestampMixin):
    """Cliente mayorista. No inicia sesion: lo opera el staff."""

    __tablename__ = "clients"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    company: Mapped[str | None] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String(50))
    website: Mapped[str | None] = mapped_column(String(500))
    document_type: Mapped[str | None] = mapped_column(String(30))
    document_number: Mapped[str | None] = mapped_column(String(30))
    type: Mapped[str] = mapped_column(String(30), default="wholesale", server_default="wholesale")
    status: Mapped[str] = mapped_column(String(30), default="active", server_default="active")
    assigned_seller_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id"))
    credit_limit: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    payment_terms: Mapped[str | None] = mapped_column(String(100))
    internal_notes: Mapped[str | None] = mapped_column(Text)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    addresses: Mapped[list["ClientAddress"]] = relationship(
        back_populates="client", cascade="all, delete-orphan", lazy="selectin"
    )
    notes: Mapped[list["ClientNote"]] = relationship(
        back_populates="client", cascade="all, delete-orphan", lazy="selectin"
    )


class ClientAddress(Base, TimestampMixin):
    __tablename__ = "client_addresses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("clients.id", ondelete="CASCADE"), nullable=False
    )
    type: Mapped[str] = mapped_column(String(20), default="principal", server_default="principal")
    street: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str | None] = mapped_column(String(100))
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    postal_code: Mapped[str | None] = mapped_column(String(20))
    is_default: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")

    client: Mapped["Client"] = relationship(back_populates="addresses")


class ClientNote(Base, TimestampMixin):
    __tablename__ = "client_notes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("clients.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id"))
    content: Mapped[str] = mapped_column(Text, nullable=False)

    client: Mapped["Client"] = relationship(back_populates="notes")


class ClientPaymentMethod(Base, TimestampMixin):
    """Solo marca y ultimos 4 digitos: el dato sensible vive en Stripe."""

    __tablename__ = "client_payment_methods"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("clients.id", ondelete="CASCADE"), nullable=False
    )
    brand: Mapped[str] = mapped_column(String(50), nullable=False)
    last4: Mapped[str] = mapped_column(String(4), nullable=False)
    exp_month: Mapped[int] = mapped_column(Integer, nullable=False)
    exp_year: Mapped[int] = mapped_column(Integer, nullable=False)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")
