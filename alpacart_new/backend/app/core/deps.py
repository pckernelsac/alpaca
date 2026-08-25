"""Dependencias compartidas: autenticacion, actor y paginacion."""

from dataclasses import dataclass
from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException, Query, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.session import get_db
from app.models import Customer, User

# auto_error=False permite endpoints con auth opcional (p. ej. carrito invitado).
bearer = HTTPBearer(auto_error=False)


@dataclass
class CurrentActor:
    """Quien llama: staff o customer, ya resuelto contra la base."""

    id: UUID
    email: str
    name: str
    type: str
    role: str | None = None


def _unauthorized(detail: str = "No autenticado") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_actor(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
    db: Annotated[Session, Depends(get_db)],
) -> CurrentActor:
    if credentials is None:
        raise _unauthorized()

    payload = decode_token(credentials.credentials)
    if not payload:
        raise _unauthorized("Token invalido o expirado")

    subject, actor_type = payload.get("sub"), payload.get("type")
    if not subject or actor_type not in ("staff", "customer"):
        raise _unauthorized("Token invalido")

    if actor_type == "staff":
        user = db.get(User, UUID(subject))
        if not user or user.status != "active" or user.deleted_at is not None:
            raise _unauthorized("Usuario inactivo")
        return CurrentActor(
            id=user.id,
            email=user.email,
            name=user.name,
            type="staff",
            role=user.role.name if user.role else None,
        )

    customer = db.get(Customer, UUID(subject))
    if not customer or customer.deleted_at is not None:
        raise _unauthorized("Cliente no encontrado")
    return CurrentActor(
        id=customer.id, email=customer.email, name=customer.full_name, type="customer"
    )


def get_optional_actor(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
    db: Annotated[Session, Depends(get_db)],
) -> CurrentActor | None:
    """Igual que get_current_actor pero devuelve None en vez de 401."""
    if credentials is None:
        return None
    try:
        return get_current_actor(credentials, db)
    except HTTPException:
        return None


def require_staff(
    actor: Annotated[CurrentActor, Depends(get_current_actor)],
) -> CurrentActor:
    if actor.type != "staff":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Solo personal autorizado")
    return actor


def require_customer(
    actor: Annotated[CurrentActor, Depends(get_current_actor)],
) -> CurrentActor:
    if actor.type != "customer":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Solo clientes")
    return actor


@dataclass
class Pagination:
    page: int
    limit: int

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.limit


def get_pagination(
    page: Annotated[int, Query(ge=1)] = 1,
    limit: Annotated[int, Query(ge=1, le=100)] = 25,
) -> Pagination:
    return Pagination(page=page, limit=limit)


def client_ip(request: Request) -> str | None:
    fwd = request.headers.get("x-forwarded-for")
    return fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else None)


DbSession = Annotated[Session, Depends(get_db)]
Actor = Annotated[CurrentActor, Depends(get_current_actor)]
OptionalActor = Annotated[CurrentActor | None, Depends(get_optional_actor)]
StaffActor = Annotated[CurrentActor, Depends(require_staff)]
CustomerActor = Annotated[CurrentActor, Depends(require_customer)]
Page = Annotated[Pagination, Depends(get_pagination)]
