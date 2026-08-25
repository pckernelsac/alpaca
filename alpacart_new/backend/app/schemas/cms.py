"""Schemas del CMS: lo que llega de la web y lo que edita el panel.

Cada recurso tiene un par Create/Update. El Update es todo opcional y se
aplica con `exclude_unset`, para que guardar un campo no borre los demas.
"""

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=255)
    message: str = Field(min_length=5)


class NewsletterCreate(BaseModel):
    email: EmailStr
    source: str | None = Field(default="web", max_length=100)


# ---------------------------------------------------------------------------
# Hero
# ---------------------------------------------------------------------------
class HeroSlideCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    subtitle: str | None = Field(default=None, max_length=500)
    cta_text: str | None = Field(default=None, max_length=100)
    cta_link: str | None = Field(default=None, max_length=500)
    image: str | None = Field(default=None, max_length=500)
    order: int = 0
    active: bool = True


class HeroSlideUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    subtitle: str | None = Field(default=None, max_length=500)
    cta_text: str | None = Field(default=None, max_length=100)
    cta_link: str | None = Field(default=None, max_length=500)
    image: str | None = Field(default=None, max_length=500)
    order: int | None = None
    active: bool | None = None


# ---------------------------------------------------------------------------
# Beneficios
# ---------------------------------------------------------------------------
class BenefitCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = None
    icon: str | None = Field(default=None, max_length=50)
    image: str | None = Field(default=None, max_length=500)
    order: int = 0
    active: bool = True


class BenefitUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    icon: str | None = Field(default=None, max_length=50)
    image: str | None = Field(default=None, max_length=500)
    order: int | None = None
    active: bool | None = None


# ---------------------------------------------------------------------------
# Testimonios
# ---------------------------------------------------------------------------
class TestimonialCreate(BaseModel):
    author: str = Field(min_length=1, max_length=255)
    role: str | None = Field(default=None, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    avatar: str | None = Field(default=None, max_length=500)
    text: str = Field(min_length=1)
    rating: int | None = Field(default=None, ge=1, le=5)
    featured: bool = False
    order: int = 0
    active: bool = True


class TestimonialUpdate(BaseModel):
    author: str | None = Field(default=None, min_length=1, max_length=255)
    role: str | None = Field(default=None, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    avatar: str | None = Field(default=None, max_length=500)
    text: str | None = Field(default=None, min_length=1)
    rating: int | None = Field(default=None, ge=1, le=5)
    featured: bool | None = None
    order: int | None = None
    active: bool | None = None


# ---------------------------------------------------------------------------
# Galeria
# ---------------------------------------------------------------------------
class GalleryImageCreate(BaseModel):
    url: str = Field(min_length=1, max_length=500)
    alt_text: str | None = Field(default=None, max_length=500)
    caption: str | None = Field(default=None, max_length=500)
    category: str | None = Field(default=None, max_length=50)
    order: int = 0
    visible: bool = True


class GalleryImageUpdate(BaseModel):
    url: str | None = Field(default=None, min_length=1, max_length=500)
    alt_text: str | None = Field(default=None, max_length=500)
    caption: str | None = Field(default=None, max_length=500)
    category: str | None = Field(default=None, max_length=50)
    order: int | None = None
    visible: bool | None = None


# ---------------------------------------------------------------------------
# Procesos artesanales
# ---------------------------------------------------------------------------
class ArtisanProcessCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = None
    icon: str | None = Field(default=None, max_length=50)
    image: str | None = Field(default=None, max_length=500)
    step_order: int = 0
    active: bool = True


class ArtisanProcessUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    icon: str | None = Field(default=None, max_length=50)
    image: str | None = Field(default=None, max_length=500)
    step_order: int | None = None
    active: bool | None = None
