"""Schemas de catalogo.

Decision de contrato: el producto expone `price` e `image` ya resueltos en la
raiz. En el backend anterior el precio vivia solo en variants[] y como string,
y el frontend terminaba mostrando "S/ NaN"; resolverlo aca deja una sola
fuente de verdad.
"""

from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field, computed_field

from app.schemas.common import ORMModel


class CategoryOut(ORMModel):
    id: int
    name: str
    slug: str
    description: str | None = None
    image: str | None = None
    parent_id: int | None = None


class CollectionOut(ORMModel):
    id: str
    name: str
    description: str | None = None
    image: str | None = None
    piece_count: int | None = None
    active: bool


class TagOut(ORMModel):
    id: int
    name: str


class SizeOut(ORMModel):
    id: int
    name: str


class VariantOut(ORMModel):
    id: UUID
    sku: str
    color_name: str | None = None
    color_hex: str | None = None
    size_id: int | None = None
    size: SizeOut | None = None
    price: float
    stock: int
    status: str

    @computed_field
    @property
    def label(self) -> str:
        """Etiqueta para el selector.

        Dos variantes pueden compartir color y diferir solo en talla; sin el
        nombre de la talla el cliente ve dos opciones identicas.
        """
        parts = [p for p in (self.color_name, self.size.name if self.size else None) if p]
        return " · ".join(parts) if parts else self.sku


class MediaOut(ORMModel):
    id: UUID
    url: str
    alt_text: str | None = None
    is_principal: bool
    visible: bool = True
    type: str


class ProductOut(ORMModel):
    id: UUID
    sku: str
    slug: str
    name: str
    description: str | None = None
    material: str | None = None
    status: str
    category: CategoryOut | None = None
    collection: CollectionOut | None = None
    variants: list[VariantOut] = Field(default_factory=list)
    media: list[MediaOut] = Field(default_factory=list)
    created_at: datetime | None = None

    @computed_field
    @property
    def price(self) -> float:
        """Precio 'desde': el menor entre las variantes activas."""
        prices = [float(v.price) for v in self.variants if v.status == "active"]
        return min(prices) if prices else 0.0

    @computed_field
    @property
    def stock(self) -> int:
        return sum(v.stock or 0 for v in self.variants)

    @computed_field
    @property
    def image(self) -> str | None:
        if not self.media:
            return None
        principal = next((m for m in self.media if m.is_principal), None)
        return (principal or self.media[0]).url

    @computed_field
    @property
    def images(self) -> list[str]:
        return [m.url for m in self.media if m.visible] if self.media else []


class ProductCreate(BaseModel):
    sku: str = Field(max_length=50)
    name: str = Field(max_length=255)
    description: str | None = None
    material: str | None = Field(default=None, max_length=255)
    category_id: int | None = None
    collection_id: str | None = None
    weight: Decimal | None = None
    status: str = "draft"


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    # Se manda solo cuando se quiere cambiar la URL a proposito: renombrar un
    # producto no deberia romper los links que ya circulan.
    slug: str | None = Field(default=None, max_length=160)
    description: str | None = None
    material: str | None = Field(default=None, max_length=255)
    category_id: int | None = None
    collection_id: str | None = None
    weight: Decimal | None = None
    status: str | None = None


class VariantCreate(BaseModel):
    product_id: UUID
    sku: str = Field(max_length=50)
    color_name: str | None = Field(default=None, max_length=100)
    color_hex: str | None = Field(default=None, max_length=7)
    size_id: int | None = None
    material_id: int | None = None
    color_id: int | None = None
    price: Decimal = Field(ge=0)
    stock: int = Field(default=0, ge=0)
    status: str = Field(default="active", pattern="^(active|inactive)$")
    # Donde nace el stock inicial. Vacio = almacen principal.
    warehouse_id: int | None = None
    min_stock: int = Field(default=0, ge=0)


class VariantUpdate(BaseModel):
    """El stock no se toca por aca a proposito.

    Las existencias se mueven con `POST /stock/adjust`, que ademas deja el
    movimiento en el historial. Si esta ruta tambien las escribiera, el saldo
    y la bitacora se separarian sin que nadie lo note.
    """

    sku: str | None = Field(default=None, max_length=50)
    color_name: str | None = Field(default=None, max_length=100)
    color_hex: str | None = Field(default=None, max_length=7)
    size_id: int | None = None
    material_id: int | None = None
    color_id: int | None = None
    price: Decimal | None = Field(default=None, ge=0)
    status: str | None = Field(default=None, pattern="^(active|inactive)$")


class MediaCreate(BaseModel):
    url: str = Field(max_length=500)
    alt_text: str | None = Field(default=None, max_length=500)
    type: str = Field(default="image", pattern="^(image|video)$")
    is_principal: bool = False
    visible: bool = True
    variant_id: UUID | None = None


class MediaUpdate(BaseModel):
    alt_text: str | None = Field(default=None, max_length=500)
    is_principal: bool | None = None
    visible: bool | None = None


class CategoryCreate(BaseModel):
    name: str = Field(max_length=100)
    slug: str = Field(max_length=100)
    description: str | None = None
    image: str | None = None
    parent_id: int | None = None
