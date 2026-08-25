from pydantic import BaseModel, EmailStr, Field

from app.schemas.common import ORMModel


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class RegisterRequest(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    phone: str | None = Field(default=None, max_length=50)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    actor: str


class StaffProfile(ORMModel):
    id: str
    name: str
    email: str
    phone: str | None = None
    employee_id: str | None = None
    position: str | None = None
    avatar: str | None = None
    status: str
    role: str | None = None
    type: str = "staff"


class CustomerProfile(ORMModel):
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str | None = None
    language: str
    currency: str
    loyalty_tier: str | None = None
    loyalty_points: int
    type: str = "customer"
