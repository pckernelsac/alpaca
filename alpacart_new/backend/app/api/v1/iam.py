"""IAM: usuarios internos, roles, permisos y clientes B2B."""

from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import func, or_, select

from app.core.deps import DbSession, Page, StaffActor
from app.core.security import hash_password
from app.models import Client, Customer, Department, Permission, Role, User
from app.schemas.common import ok, paginated
from app.schemas.iam import UserCreate, UserUpdate

router = APIRouter(tags=["IAM"])


def serialize_user(user: User) -> dict:
    return {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "employeeId": user.employee_id,
        "position": user.position,
        "roleId": user.role_id,
        "role": user.role.name if user.role else None,
        "departmentId": user.department_id,
        "department": user.department.name if user.department else None,
        "avatar": user.avatar,
        "status": user.status,
        "lastAccessAt": user.last_access_at.isoformat() if user.last_access_at else None,
        "createdAt": user.created_at.isoformat(),
    }


@router.get("/users", summary="Listar personal interno")
def list_users(db: DbSession, page: Page, actor: StaffActor, search: str | None = None):
    stmt = select(User).where(User.deleted_at.is_(None))
    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(or_(User.name.ilike(pattern), User.email.ilike(pattern)))

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    rows = db.scalars(stmt.order_by(User.name).offset(page.offset).limit(page.limit)).all()
    return paginated([serialize_user(r) for r in rows], total, page.page, page.limit)


@router.post("/users", status_code=status.HTTP_201_CREATED, summary="Crear usuario")
def create_user(payload: UserCreate, db: DbSession, actor: StaffActor):
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status.HTTP_409_CONFLICT, "El correo ya esta registrado")

    data = payload.model_dump()
    data["password"] = hash_password(data["password"])
    user = User(**data, created_by=actor.id)
    db.add(user)
    db.commit()
    db.refresh(user)
    return ok(serialize_user(user))


@router.put("/users/{user_id}", summary="Actualizar usuario")
def update_user(user_id: UUID, payload: UserUpdate, db: DbSession, actor: StaffActor):
    user = db.get(User, user_id)
    if not user or user.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Usuario no encontrado")

    data = payload.model_dump(exclude_unset=True)
    if "password" in data and data["password"]:
        data["password"] = hash_password(data["password"])
    else:
        data.pop("password", None)

    for field, value in data.items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return ok(serialize_user(user))


@router.delete("/users/{user_id}", summary="Desactivar usuario")
def delete_user(user_id: UUID, db: DbSession, actor: StaffActor):
    user = db.get(User, user_id)
    if not user or user.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Usuario no encontrado")
    if user.id == actor.id:
        raise HTTPException(status.HTTP_409_CONFLICT, "No podes desactivar tu propia cuenta")

    user.deleted_at = datetime.now(timezone.utc)
    user.status = "inactive"
    db.commit()
    return ok({"deleted": True, "id": str(user_id)})


@router.get("/roles", summary="Listar roles")
def list_roles(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Role).order_by(Role.name)).all()
    return ok(
        [
            {
                "id": r.id,
                "name": r.name,
                "category": r.category,
                "description": r.description,
                "status": r.status,
                "permissions": [rp.permission.name for rp in r.permissions],
            }
            for r in rows
        ]
    )


@router.get("/permissions", summary="Listar permisos")
def list_permissions(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Permission).order_by(Permission.module, Permission.action)).all()
    return ok(
        [
            {"id": r.id, "module": r.module, "action": r.action, "name": r.name,
             "description": r.description}
            for r in rows
        ]
    )


@router.get("/departments", summary="Listar departamentos")
def list_departments(db: DbSession, actor: StaffActor):
    rows = db.scalars(select(Department).order_by(Department.name)).all()
    return ok([{"id": r.id, "name": r.name} for r in rows])


@router.get("/customers", summary="Listar clientes de la tienda")
def list_customers(db: DbSession, page: Page, actor: StaffActor, search: str | None = None):
    stmt = select(Customer).where(Customer.deleted_at.is_(None))
    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(
            or_(
                Customer.first_name.ilike(pattern),
                Customer.last_name.ilike(pattern),
                Customer.email.ilike(pattern),
            )
        )

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    rows = db.scalars(
        stmt.order_by(Customer.created_at.desc()).offset(page.offset).limit(page.limit)
    ).all()
    items = [
        {
            "id": str(r.id),
            "firstName": r.first_name,
            "lastName": r.last_name,
            "name": r.full_name,
            "email": r.email,
            "phone": r.phone,
            "loyaltyTier": r.loyalty_tier,
            "loyaltyPoints": r.loyalty_points,
            "createdAt": r.created_at.isoformat(),
        }
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)


@router.get("/clients", summary="Listar clientes mayoristas")
def list_clients(db: DbSession, page: Page, actor: StaffActor, search: str | None = None):
    stmt = select(Client).where(Client.deleted_at.is_(None))
    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(or_(Client.name.ilike(pattern), Client.company.ilike(pattern)))

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    rows = db.scalars(stmt.order_by(Client.name).offset(page.offset).limit(page.limit)).all()
    items = [
        {
            "id": str(r.id),
            "name": r.name,
            "company": r.company,
            "email": r.email,
            "phone": r.phone,
            "type": r.type,
            "status": r.status,
            "creditLimit": float(r.credit_limit) if r.credit_limit else None,
        }
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)
