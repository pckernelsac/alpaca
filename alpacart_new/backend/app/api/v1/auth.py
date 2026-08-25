"""Autenticacion dual: staff y customer emiten el mismo tipo de token,
diferenciado por el campo `type`.
"""

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.core.deps import Actor, DbSession
from app.core.security import create_access_token, hash_password, verify_password
from app.models import Customer, User
from app.schemas.auth import LoginRequest, RegisterRequest
from app.schemas.common import ok

router = APIRouter(prefix="/auth", tags=["Auth"])

INVALID = "Credenciales invalidas"


@router.post("/login", summary="Login de personal interno")
def staff_login(payload: LoginRequest, db: DbSession):
    user = db.scalar(select(User).where(User.email == payload.email))
    if not user or user.deleted_at is not None or not verify_password(
        payload.password, user.password
    ):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, INVALID)
    if user.status != "active":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Usuario inactivo")

    user.last_access_at = datetime.now(timezone.utc)
    db.commit()

    token = create_access_token(
        str(user.id), "staff", {"email": user.email, "role": user.role.name if user.role else None}
    )
    return ok(
        {
            "accessToken": token,
            "tokenType": "bearer",
            "actor": "staff",
            "user": {
                "id": str(user.id),
                "name": user.name,
                "email": user.email,
                "role": user.role.name if user.role else None,
                "position": user.position,
                "avatar": user.avatar,
            },
        }
    )


@router.post("/customer-login", summary="Login de cliente de la tienda")
def customer_login(payload: LoginRequest, db: DbSession):
    customer = db.scalar(select(Customer).where(Customer.email == payload.email))
    if not customer or customer.deleted_at is not None or not verify_password(
        payload.password, customer.password
    ):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, INVALID)

    token = create_access_token(str(customer.id), "customer", {"email": customer.email})
    return ok(
        {
            "accessToken": token,
            "tokenType": "bearer",
            "actor": "customer",
            "user": {
                "id": str(customer.id),
                "firstName": customer.first_name,
                "lastName": customer.last_name,
                "email": customer.email,
            },
        }
    )


@router.post("/register", status_code=status.HTTP_201_CREATED, summary="Registro de cliente")
def register(payload: RegisterRequest, db: DbSession):
    exists = db.scalar(select(Customer).where(Customer.email == payload.email))
    if exists:
        raise HTTPException(status.HTTP_409_CONFLICT, "El correo ya esta registrado")

    customer = Customer(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        password=hash_password(payload.password),
        phone=payload.phone,
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)

    token = create_access_token(str(customer.id), "customer", {"email": customer.email})
    return ok(
        {
            "accessToken": token,
            "tokenType": "bearer",
            "actor": "customer",
            "user": {
                "id": str(customer.id),
                "firstName": customer.first_name,
                "lastName": customer.last_name,
                "email": customer.email,
            },
        }
    )


@router.get("/me", summary="Perfil del actor autenticado")
def me(actor: Actor, db: DbSession):
    if actor.type == "staff":
        user = db.get(User, actor.id)
        return ok(
            {
                "id": str(user.id),
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "employeeId": user.employee_id,
                "position": user.position,
                "avatar": user.avatar,
                "status": user.status,
                "role": user.role.name if user.role else None,
                "type": "staff",
            }
        )

    customer = db.get(Customer, actor.id)
    return ok(
        {
            "id": str(customer.id),
            "firstName": customer.first_name,
            "lastName": customer.last_name,
            "name": customer.full_name,
            "email": customer.email,
            "phone": customer.phone,
            "language": customer.language,
            "currency": customer.currency,
            "loyaltyTier": customer.loyalty_tier,
            "loyaltyPoints": customer.loyalty_points,
            "type": "customer",
        }
    )
