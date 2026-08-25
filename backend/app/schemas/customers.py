from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.schemas.common import ORMModel


class ProfileUpdate(BaseModel):
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=50)
    language: str | None = Field(default=None, max_length=5)
    currency: str | None = Field(default=None, max_length=5)
    comms: bool | None = None


class AddressCreate(BaseModel):
    name: str = Field(max_length=255)
    street: str = Field(max_length=255)
    city: str = Field(max_length=100)
    state: str | None = Field(default=None, max_length=100)
    zip: str | None = Field(default=None, max_length=20)
    country: str = Field(default="Peru", max_length=100)
    phone: str | None = Field(default=None, max_length=50)
    is_default: bool = False
    type: str = Field(default="principal", max_length=20)


class AddressOut(ORMModel):
    id: int
    name: str
    street: str
    city: str
    state: str | None = None
    zip: str | None = None
    country: str
    phone: str | None = None
    is_default: bool
    type: str


class CartItemCreate(BaseModel):
    product_id: UUID
    variant_id: UUID | None = None
    quantity: int = Field(default=1, ge=1, le=99)


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=0, le=99)


class WishlistToggle(BaseModel):
    product_id: UUID
    variant_id: UUID | None = None


class CheckoutRequest(BaseModel):
    address_id: int | None = None
    email: EmailStr | None = None
    payment_method: str = Field(default="card", max_length=30)
    notes: str | None = None
