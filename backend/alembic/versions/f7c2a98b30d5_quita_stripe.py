"""quita los restos de stripe

`transactions.stripe_id` venia del esquema inicial, cuando la pasarela iba a
ser Stripe. Se cobra con Mercado Pago y su identificador vive en
`provider_payment_id`, asi que la columna y su indice sobraban: nunca los
escribio nadie.

Revision ID: f7c2a98b30d5
Revises: d3f6b81c4a72
Create Date: 2026-09-14 11:20:00.000000
"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = 'f7c2a98b30d5'
down_revision: str | None = 'd3f6b81c4a72'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.drop_index(op.f('ix_transactions_stripe_id'), table_name='transactions')
    op.drop_column('transactions', 'stripe_id')


def downgrade() -> None:
    op.add_column('transactions', sa.Column('stripe_id', sa.String(length=100), nullable=True))
    op.create_index(op.f('ix_transactions_stripe_id'), 'transactions', ['stripe_id'], unique=False)
