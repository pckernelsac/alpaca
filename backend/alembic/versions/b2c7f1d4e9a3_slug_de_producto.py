"""slug de producto

Agrega products.slug para que la URL publica sea legible
(/producto/manta-imperial-gold en vez del UUID) y rellena los existentes
a partir del nombre.

Revision ID: b2c7f1d4e9a3
Revises: 1a5840135c78
Create Date: 2026-08-20 18:05:00.000000
"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

from app.core.slugs import slugify

revision: str = 'b2c7f1d4e9a3'
down_revision: str | None = '1a5840135c78'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column('products', sa.Column('slug', sa.String(length=160), nullable=True))

    # Relleno en Python y no en SQL: sacar tildes y colisiones con regex de
    # Postgres seria mas fragil que reusar el mismo slugify que usa la API.
    conn = op.get_bind()
    filas = conn.execute(sa.text('SELECT id, name, sku FROM products ORDER BY created_at')).all()

    tomados: set[str] = set()
    for fila in filas:
        raiz = slugify(fila.name) or slugify(fila.sku) or 'producto'
        candidato, n = raiz, 2
        while candidato in tomados:
            candidato = f'{raiz}-{n}'
            n += 1
        tomados.add(candidato)
        conn.execute(
            sa.text('UPDATE products SET slug = :slug WHERE id = :id'),
            {'slug': candidato, 'id': fila.id},
        )

    op.alter_column('products', 'slug', nullable=False)
    op.create_index('ix_products_slug', 'products', ['slug'], unique=True)


def downgrade() -> None:
    op.drop_index('ix_products_slug', table_name='products')
    op.drop_column('products', 'slug')
