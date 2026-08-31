"""Agregador de routers de la v1."""

from fastapi import APIRouter

from app.api.v1 import (
    auth,
    catalog,
    cms,
    customers,
    iam,
    inventory,
    orders,
    system,
    textile,
    uploads,
)

router = APIRouter()
router.include_router(auth.router)
router.include_router(catalog.router)
router.include_router(customers.router)
router.include_router(orders.router)
router.include_router(cms.router)
router.include_router(inventory.router)
router.include_router(iam.router)
router.include_router(system.router)
router.include_router(textile.router)
router.include_router(uploads.router)
