"""Pagos: transacciones, devoluciones y deduplicacion de webhooks."""

import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import BigInteger, DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class Transaction(Base, TimestampMixin):
    __tablename__ = "transactions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    transaction_id: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    order_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("orders.id"))
    stripe_id: Mapped[str | None] = mapped_column(String(100), index=True)
    # Quien cobro: 'mercadopago' o 'manual' (transferencia, contra entrega).
    provider: Mapped[str] = mapped_column(String(30), default="manual", server_default="manual")
    # Id del pago en el proveedor. En Mercado Pago es el que trae el webhook.
    provider_payment_id: Mapped[str | None] = mapped_column(String(60), index=True)
    # Referencia unica del intento (`<pedido>-<uuid4>`). Viaja como
    # external_reference y como X-Idempotency-Key: es lo que ata el aviso del
    # webhook con la fila, aunque el pago se acredite dias despues.
    external_reference: Mapped[str | None] = mapped_column(String(80), unique=True, index=True)
    # El motivo fino del rechazo o de la espera (cc_rejected_bad_filled_*, …).
    status_detail: Mapped[str | None] = mapped_column(String(60))
    payer_email: Mapped[str | None] = mapped_column(String(255))
    method: Mapped[str] = mapped_column(String(30), nullable=False)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(5), default="PEN", server_default="PEN")
    status: Mapped[str] = mapped_column(String(30), default="pending", server_default="pending")
    # 'metadata' esta reservado por SQLAlchemy en la clase; se mapea como meta.
    meta: Mapped[dict | None] = mapped_column("metadata", JSONB)

    refunds: Mapped[list["TransactionRefund"]] = relationship(
        back_populates="transaction", cascade="all, delete-orphan", lazy="selectin"
    )


class TransactionRefund(Base, TimestampMixin):
    __tablename__ = "transaction_refunds"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    transaction_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("transactions.id", ondelete="CASCADE"), nullable=False
    )
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    reason: Mapped[str | None] = mapped_column(String(500))
    created_by: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)

    transaction: Mapped["Transaction"] = relationship(back_populates="refunds")


class WebhookEvent(Base):
    """Las pasarelas reintentan los avisos: (provider, external_event_id)
    unico evita procesar el mismo evento dos veces."""

    __tablename__ = "webhook_events"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    external_event_id: Mapped[str] = mapped_column(String(255), nullable=False)
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="received", server_default="received")
    order_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.current_timestamp(), nullable=False
    )
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (
        UniqueConstraint("provider", "external_event_id", name="uq_webhook_provider_event"),
    )
