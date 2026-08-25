"""CMS y contenido publico: hero, beneficios, testimonios, FAQ, contacto."""

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.core.deps import DbSession, OptionalActor, Page, StaffActor
from app.models import (
    ArtisanProcess,
    Benefit,
    ContactInquiry,
    Content,
    FaqCategory,
    GalleryImage,
    HeroSlide,
    NewsletterSubscriber,
    Review,
    Testimonial,
)
from app.schemas.cms import (
    ArtisanProcessCreate,
    ArtisanProcessUpdate,
    BenefitCreate,
    BenefitUpdate,
    ContactCreate,
    GalleryImageCreate,
    GalleryImageUpdate,
    HeroSlideCreate,
    HeroSlideUpdate,
    NewsletterCreate,
    TestimonialCreate,
    TestimonialUpdate,
)
from app.schemas.common import ok, paginated

router = APIRouter(tags=["CMS"])


# ---------------------------------------------------------------------------
# Serializadores
#
# Los usa tanto la lectura publica como el panel: una sola forma por recurso
# evita que la web y el back office muestren campos distintos del mismo dato.
# ---------------------------------------------------------------------------
def serialize_slide(r: HeroSlide) -> dict:
    return {
        "id": r.id,
        "title": r.title,
        "subtitle": r.subtitle,
        "ctaText": r.cta_text,
        "ctaLink": r.cta_link,
        "image": r.image,
        "order": r.order,
        "active": r.active,
    }


def serialize_benefit(r: Benefit) -> dict:
    return {
        "id": r.id,
        "title": r.title,
        "description": r.description,
        "icon": r.icon,
        "image": r.image,
        "order": r.order,
        "active": r.active,
    }


def serialize_testimonial(r: Testimonial) -> dict:
    return {
        "id": r.id,
        "author": r.author,
        "role": r.role,
        "company": r.company,
        "avatar": r.avatar,
        "text": r.text,
        "rating": r.rating,
        "featured": r.featured,
        "order": r.order,
        "active": r.active,
    }


def serialize_gallery(r: GalleryImage) -> dict:
    return {
        "id": r.id,
        "url": r.url,
        "altText": r.alt_text,
        "caption": r.caption,
        "category": r.category,
        "order": r.order,
        "visible": r.visible,
    }


def serialize_process(r: ArtisanProcess) -> dict:
    return {
        "id": r.id,
        "title": r.title,
        "description": r.description,
        "icon": r.icon,
        "image": r.image,
        "stepOrder": r.step_order,
        "active": r.active,
    }


def puede_ver_ocultos(actor, include_hidden: bool) -> bool:
    """Solo el staff ve lo despublicado.

    Sin esta guarda, cualquiera podria pedir `?include_hidden=true` y leer los
    slides que el equipo dejo preparados pero todavia no quiere mostrar.
    """
    return include_hidden and actor is not None and actor.type == "staff"


@router.get("/cms/hero", summary="Slides del hero")
def hero_slides(db: DbSession, actor: OptionalActor, include_hidden: bool = False):
    stmt = select(HeroSlide)
    if not puede_ver_ocultos(actor, include_hidden):
        stmt = stmt.where(HeroSlide.active.is_(True))
    rows = db.scalars(stmt.order_by(HeroSlide.order)).all()
    return ok([serialize_slide(r) for r in rows])


@router.get("/cms/benefits", summary="Beneficios")
def benefits(db: DbSession, actor: OptionalActor, include_hidden: bool = False):
    stmt = select(Benefit)
    if not puede_ver_ocultos(actor, include_hidden):
        stmt = stmt.where(Benefit.active.is_(True))
    rows = db.scalars(stmt.order_by(Benefit.order)).all()
    return ok([serialize_benefit(r) for r in rows])


@router.get("/cms/testimonials", summary="Testimonios")
def testimonials(
    db: DbSession,
    actor: OptionalActor,
    featured: bool | None = None,
    include_hidden: bool = False,
):
    stmt = select(Testimonial)
    if not puede_ver_ocultos(actor, include_hidden):
        stmt = stmt.where(Testimonial.active.is_(True))
    if featured is not None:
        stmt = stmt.where(Testimonial.featured.is_(featured))
    rows = db.scalars(stmt.order_by(Testimonial.order)).all()
    return ok([serialize_testimonial(r) for r in rows])


@router.get("/cms/gallery", summary="Galeria")
def gallery(
    db: DbSession,
    actor: OptionalActor,
    category: str | None = None,
    include_hidden: bool = False,
):
    stmt = select(GalleryImage)
    if not puede_ver_ocultos(actor, include_hidden):
        stmt = stmt.where(GalleryImage.visible.is_(True))
    if category:
        stmt = stmt.where(GalleryImage.category == category)
    rows = db.scalars(stmt.order_by(GalleryImage.order)).all()
    return ok([serialize_gallery(r) for r in rows])


@router.get("/cms/processes", summary="Procesos artesanales")
def processes(db: DbSession, actor: OptionalActor, include_hidden: bool = False):
    stmt = select(ArtisanProcess)
    if not puede_ver_ocultos(actor, include_hidden):
        stmt = stmt.where(ArtisanProcess.active.is_(True))
    rows = db.scalars(stmt.order_by(ArtisanProcess.step_order)).all()
    return ok([serialize_process(r) for r in rows])


@router.get("/faq", summary="Preguntas frecuentes agrupadas por categoria")
def faq(db: DbSession):
    categories = db.scalars(select(FaqCategory).order_by(FaqCategory.order)).all()
    return ok(
        [
            {
                "id": c.id,
                "name": c.name,
                "slug": c.slug,
                "icon": c.icon,
                "items": [
                    {"id": i.id, "question": i.question, "answer": i.answer, "order": i.order}
                    for i in sorted(c.items, key=lambda i: i.order)
                ],
            }
            for c in categories
        ]
    )


@router.get("/contents", summary="Listar contenidos publicados")
def list_contents(db: DbSession, type: str | None = None):
    stmt = select(Content).where(Content.status == "published")
    if type:
        stmt = stmt.where(Content.type == type)
    rows = db.scalars(stmt.order_by(Content.title)).all()
    return ok(
        [
            {"id": str(r.id), "title": r.title, "slug": r.slug, "type": r.type,
             "image": r.image, "publishedAt": r.published_at.isoformat() if r.published_at else None}
            for r in rows
        ]
    )


@router.get("/contents/{slug}", summary="Contenido por slug")
def get_content(slug: str, db: DbSession):
    content = db.scalar(select(Content).where(Content.slug == slug))
    if not content or content.status != "published":
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Contenido no encontrado")
    return ok(
        {
            "id": str(content.id),
            "title": content.title,
            "slug": content.slug,
            "type": content.type,
            "body": content.body,
            "image": content.image,
            "publishedAt": content.published_at.isoformat() if content.published_at else None,
        }
    )


@router.get("/products/{product_id}/reviews", summary="Resenias de un producto")
def product_reviews(product_id: str, db: DbSession):
    rows = db.scalars(
        select(Review).where(Review.product_id == product_id).order_by(Review.created_at.desc())
    ).all()
    average = round(sum(r.rating for r in rows) / len(rows), 2) if rows else 0
    return ok(
        {
            "average": average,
            "count": len(rows),
            "items": [
                {"id": r.id, "author": r.author, "rating": r.rating, "text": r.text,
                 "tag": r.tag, "createdAt": r.created_at.isoformat()}
                for r in rows
            ],
        }
    )


@router.post("/contact", status_code=status.HTTP_201_CREATED, summary="Enviar consulta")
def contact(payload: ContactCreate, db: DbSession):
    inquiry = ContactInquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return ok({"id": inquiry.id, "status": inquiry.status, "message": "Consulta recibida"})


@router.get("/contact", summary="Listar consultas (staff)")
def list_contact(db: DbSession, page: Page, actor: StaffActor):
    from sqlalchemy import func

    total = db.scalar(select(func.count()).select_from(ContactInquiry)) or 0
    rows = db.scalars(
        select(ContactInquiry)
        .order_by(ContactInquiry.created_at.desc())
        .offset(page.offset)
        .limit(page.limit)
    ).all()
    items = [
        {"id": r.id, "name": r.name, "email": r.email, "subject": r.subject,
         "message": r.message, "status": r.status, "createdAt": r.created_at.isoformat()}
        for r in rows
    ]
    return paginated(items, total, page.page, page.limit)


@router.post("/newsletter/subscribe", summary="Suscribirse al newsletter")
def subscribe(payload: NewsletterCreate, db: DbSession):
    existing = db.scalar(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == payload.email)
    )
    if existing:
        if not existing.active:
            existing.active = True
            db.commit()
        return ok({"subscribed": True, "alreadyRegistered": True})

    db.add(NewsletterSubscriber(email=payload.email, source=payload.source))
    db.commit()
    return ok({"subscribed": True, "alreadyRegistered": False})


# ---------------------------------------------------------------------------
# Edicion del CMS (staff)
#
# Cinco recursos con la misma coreografia: crear, editar por partes y borrar.
# Los tres helpers de abajo son esa coreografia; los endpoints quedan cortos y
# cada uno dice a que tabla y a que schema pertenece, que es lo que uno quiere
# ver en el Swagger.
# ---------------------------------------------------------------------------
def crear(db, modelo, payload) -> object:
    fila = modelo(**payload.model_dump())
    db.add(fila)
    db.commit()
    db.refresh(fila)
    return fila


def editar(db, modelo, fila_id: int, payload, nombre: str) -> object:
    fila = db.get(modelo, fila_id)
    if not fila:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"{nombre} no encontrado")
    # exclude_unset: mandar solo `active` no debe vaciar el resto de los campos.
    for campo, valor in payload.model_dump(exclude_unset=True).items():
        setattr(fila, campo, valor)
    db.commit()
    db.refresh(fila)
    return fila


def borrar(db, modelo, fila_id: int, nombre: str) -> dict:
    fila = db.get(modelo, fila_id)
    if not fila:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"{nombre} no encontrado")
    db.delete(fila)
    db.commit()
    return {"deleted": True, "id": fila_id}


# --- Hero ------------------------------------------------------------------
@router.post("/cms/hero", status_code=status.HTTP_201_CREATED, summary="Crear slide")
def create_slide(payload: HeroSlideCreate, db: DbSession, actor: StaffActor):
    return ok(serialize_slide(crear(db, HeroSlide, payload)))


@router.put("/cms/hero/{slide_id}", summary="Actualizar slide")
def update_slide(slide_id: int, payload: HeroSlideUpdate, db: DbSession, actor: StaffActor):
    return ok(serialize_slide(editar(db, HeroSlide, slide_id, payload, "Slide")))


@router.delete("/cms/hero/{slide_id}", summary="Eliminar slide")
def delete_slide(slide_id: int, db: DbSession, actor: StaffActor):
    return ok(borrar(db, HeroSlide, slide_id, "Slide"))


# --- Beneficios ------------------------------------------------------------
@router.post("/cms/benefits", status_code=status.HTTP_201_CREATED, summary="Crear beneficio")
def create_benefit(payload: BenefitCreate, db: DbSession, actor: StaffActor):
    return ok(serialize_benefit(crear(db, Benefit, payload)))


@router.put("/cms/benefits/{benefit_id}", summary="Actualizar beneficio")
def update_benefit(benefit_id: int, payload: BenefitUpdate, db: DbSession, actor: StaffActor):
    return ok(serialize_benefit(editar(db, Benefit, benefit_id, payload, "Beneficio")))


@router.delete("/cms/benefits/{benefit_id}", summary="Eliminar beneficio")
def delete_benefit(benefit_id: int, db: DbSession, actor: StaffActor):
    return ok(borrar(db, Benefit, benefit_id, "Beneficio"))


# --- Testimonios -----------------------------------------------------------
@router.post(
    "/cms/testimonials", status_code=status.HTTP_201_CREATED, summary="Crear testimonio"
)
def create_testimonial(payload: TestimonialCreate, db: DbSession, actor: StaffActor):
    return ok(serialize_testimonial(crear(db, Testimonial, payload)))


@router.put("/cms/testimonials/{testimonial_id}", summary="Actualizar testimonio")
def update_testimonial(
    testimonial_id: int, payload: TestimonialUpdate, db: DbSession, actor: StaffActor
):
    return ok(
        serialize_testimonial(editar(db, Testimonial, testimonial_id, payload, "Testimonio"))
    )


@router.delete("/cms/testimonials/{testimonial_id}", summary="Eliminar testimonio")
def delete_testimonial(testimonial_id: int, db: DbSession, actor: StaffActor):
    return ok(borrar(db, Testimonial, testimonial_id, "Testimonio"))


# --- Galeria ---------------------------------------------------------------
@router.post("/cms/gallery", status_code=status.HTTP_201_CREATED, summary="Agregar imagen")
def create_gallery_image(payload: GalleryImageCreate, db: DbSession, actor: StaffActor):
    return ok(serialize_gallery(crear(db, GalleryImage, payload)))


@router.put("/cms/gallery/{image_id}", summary="Actualizar imagen")
def update_gallery_image(
    image_id: int, payload: GalleryImageUpdate, db: DbSession, actor: StaffActor
):
    return ok(serialize_gallery(editar(db, GalleryImage, image_id, payload, "Imagen")))


@router.delete("/cms/gallery/{image_id}", summary="Eliminar imagen")
def delete_gallery_image(image_id: int, db: DbSession, actor: StaffActor):
    return ok(borrar(db, GalleryImage, image_id, "Imagen"))


# --- Procesos artesanales --------------------------------------------------
@router.post("/cms/processes", status_code=status.HTTP_201_CREATED, summary="Crear proceso")
def create_process(payload: ArtisanProcessCreate, db: DbSession, actor: StaffActor):
    return ok(serialize_process(crear(db, ArtisanProcess, payload)))


@router.put("/cms/processes/{process_id}", summary="Actualizar proceso")
def update_process(
    process_id: int, payload: ArtisanProcessUpdate, db: DbSession, actor: StaffActor
):
    return ok(serialize_process(editar(db, ArtisanProcess, process_id, payload, "Proceso")))


@router.delete("/cms/processes/{process_id}", summary="Eliminar proceso")
def delete_process(process_id: int, db: DbSession, actor: StaffActor):
    return ok(borrar(db, ArtisanProcess, process_id, "Proceso"))
