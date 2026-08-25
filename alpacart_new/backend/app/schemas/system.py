from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class CouponCreate(BaseModel):
    code: str = Field(max_length=50)
    type: str = Field(pattern="^(percentage|fixed)$")
    value: Decimal
    min_purchase: Decimal | None = None
    max_uses: int | None = None
    active: bool = True
    expires_at: datetime | None = None


class CompanyUpdate(BaseModel):
    legal_name: str | None = Field(default=None, max_length=255)
    tax_id: str | None = Field(default=None, max_length=30)
    industry: str | None = Field(default=None, max_length=100)
    website: str | None = Field(default=None, max_length=500)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    address: str | None = None
    primary_currency: str | None = Field(default=None, max_length=5)


class CouponUpdate(BaseModel):
    type: str | None = Field(default=None, pattern="^(percentage|fixed)$")
    value: Decimal | None = Field(default=None, ge=0)
    min_purchase: Decimal | None = Field(default=None, ge=0)
    max_uses: int | None = Field(default=None, ge=1)
    active: bool | None = None
    expires_at: datetime | None = None


class CouponValidate(BaseModel):
    code: str = Field(max_length=50)
    # Opcional: sin subtotal no se puede juzgar la compra minima, y se avisa.
    subtotal: Decimal | None = Field(default=None, ge=0)


class CampaignCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    type: str | None = Field(default=None, max_length=50)
    channel: str | None = Field(default=None, max_length=50)
    budget: Decimal | None = Field(default=None, ge=0)
    spent: Decimal | None = Field(default=None, ge=0)
    conversions: int | None = Field(default=None, ge=0)
    status: str = Field(default="draft", max_length=30)
    image: str | None = Field(default=None, max_length=500)
    start_date: datetime | None = None
    end_date: datetime | None = None


class CampaignUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    type: str | None = Field(default=None, max_length=50)
    channel: str | None = Field(default=None, max_length=50)
    budget: Decimal | None = Field(default=None, ge=0)
    spent: Decimal | None = Field(default=None, ge=0)
    conversions: int | None = Field(default=None, ge=0)
    status: str | None = Field(default=None, max_length=30)
    image: str | None = Field(default=None, max_length=500)
    start_date: datetime | None = None
    end_date: datetime | None = None


class PromotionCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    type: str = Field(max_length=30)
    discount_value: Decimal = Field(ge=0)
    applies_to: str = Field(pattern="^(all|category|collection|products)$")
    product_ids: list[str] | None = None
    category_id: int | None = None
    collection_id: str | None = None
    starts_at: datetime
    ends_at: datetime
    active: bool = True
    campaign_id: UUID | None = None


class PromotionUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    type: str | None = Field(default=None, max_length=30)
    discount_value: Decimal | None = Field(default=None, ge=0)
    applies_to: str | None = Field(default=None, pattern="^(all|category|collection|products)$")
    product_ids: list[str] | None = None
    category_id: int | None = None
    collection_id: str | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    active: bool | None = None
    campaign_id: UUID | None = None
