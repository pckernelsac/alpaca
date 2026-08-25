"""Catalogos textiles: fibras, colores, talles y temporadas.

Son las listas de referencia que alimentan el alta de variantes. Se dejan
publicas —como en el backend anterior— porque la tienda tambien las usa para
filtrar, y no exponen nada sensible.
"""

from fastapi import APIRouter
from sqlalchemy import select

from app.core.deps import DbSession
from app.models import FiberMaterial, Season, TextileColor, TextileSize
from app.schemas.common import ok

router = APIRouter(tags=["Textil"])


@router.get("/textile/materials", summary="Fibras y materiales")
def list_materials(db: DbSession):
    filas = db.scalars(
        select(FiberMaterial).where(FiberMaterial.active.is_(True)).order_by(FiberMaterial.name)
    ).all()
    return ok(
        [
            {
                "id": f.id,
                "name": f.name,
                "category": f.category,
                "micronRating": f.micron_rating,
                "origin": f.origin,
                "certification": f.certification,
            }
            for f in filas
        ]
    )


@router.get("/textile/colors", summary="Colores textiles")
def list_colors(db: DbSession):
    filas = db.scalars(
        select(TextileColor).where(TextileColor.active.is_(True)).order_by(TextileColor.name)
    ).all()
    return ok([{"id": c.id, "name": c.name, "hex": c.hex, "pantone": c.pantone} for c in filas])


@router.get("/textile/sizes", summary="Talles")
def list_sizes(db: DbSession):
    # Por `order` y no alfabetico: S, M, L tiene un orden que el abecedario
    # no respeta.
    filas = db.scalars(select(TextileSize).order_by(TextileSize.order)).all()
    return ok([{"id": t.id, "name": t.name, "category": t.category, "order": t.order} for t in filas])


@router.get("/textile/seasons", summary="Temporadas")
def list_seasons(db: DbSession):
    filas = db.scalars(
        select(Season).where(Season.active.is_(True)).order_by(Season.start_month)
    ).all()
    return ok(
        [
            {
                "id": s.id,
                "name": s.name,
                "startMonth": s.start_month,
                "endMonth": s.end_month,
            }
            for s in filas
        ]
    )
