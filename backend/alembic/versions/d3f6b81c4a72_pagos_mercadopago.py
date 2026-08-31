"""pagos con mercado pago

Agrega a `transactions` las columnas que necesita un cobro por Checkout API:
quien cobro, el id del pago en la pasarela, la referencia unica del intento
—que es lo que ata el aviso del webhook con la fila— y el detalle del estado.

Revision ID: d3f6b81c4a72
Revises: b2c7f1d4e9a3
Create Date: 2026-08-31 10:00:00.000000
"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = 'd3f6b81c4a72'
down_revision: str | None = 'b2c7f1d4e9a3'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        'transactions',
        sa.Column('provider', sa.String(length=30), server_default='manual', nullable=False),
    )
    op.add_column('transactions', sa.Column('provider_payment_id', sa.String(length=60), nullable=True))
    op.add_column('transactions', sa.Column('external_reference', sa.String(length=80), nullable=True))
    op.add_column('transactions', sa.Column('status_detail', sa.String(length=60), nullable=True))
    op.add_column('transactions', sa.Column('payer_email', sa.String(length=255), nullable=True))

    op.create_index(
        op.f('ix_transactions_provider_payment_id'),
        'transactions',
        ['provider_payment_id'],
        unique=False,
    )
    # Unico: el webhook busca la fila por esta referencia y no puede haber dos.
    op.create_index(
        op.f('ix_transactions_external_reference'),
        'transactions',
        ['external_reference'],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index(op.f('ix_transactions_external_reference'), table_name='transactions')
    op.drop_index(op.f('ix_transactions_provider_payment_id'), table_name='transactions')
    op.drop_column('transactions', 'payer_email')
    op.drop_column('transactions', 'status_detail')
    op.drop_column('transactions', 'external_reference')
    op.drop_column('transactions', 'provider_payment_id')
    op.drop_column('transactions', 'provider')
