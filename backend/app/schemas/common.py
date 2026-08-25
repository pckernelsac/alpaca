"""Sobre de respuesta compartido: { success, data, meta }.

Replica el contrato del backend NestJS para que el frontend no tenga que
desempaquetar de dos formas distintas.
"""

from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T


class PageMeta(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int


class PaginatedResponse(BaseModel, Generic[T]):
    success: bool = True
    data: list[T]
    meta: PageMeta


class ORMModel(BaseModel):
    """Base para schemas de salida leidos desde SQLAlchemy."""

    model_config = ConfigDict(from_attributes=True)


def ok(data: T) -> dict:
    return {"success": True, "data": data}


def paginated(items: list, total: int, page: int, limit: int) -> dict:
    total_pages = (total + limit - 1) // limit if limit else 1
    return {
        "success": True,
        "data": items,
        "meta": {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": max(total_pages, 1),
        },
    }
