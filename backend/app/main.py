"""Punto de entrada de la API ALPACART."""

import logging

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.v1 import router as api_router
from app.core.config import settings
from app.db.session import engine
from app.services import mercadopago_client as mp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("alpacart")

app = FastAPI(
    title="ALPACART API",
    description="API de Alpacart — marca premium de alpaca peruana",
    version="2.0.0",
    docs_url=f"{settings.API_PREFIX}/docs",
    openapi_url=f"{settings.API_PREFIX}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Todos los errores salen con la misma forma que los exitos."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": {"message": exc.detail, "status": exc.status_code}},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "message": "Datos invalidos",
                "status": 422,
                "details": [
                    {"field": ".".join(str(p) for p in e["loc"][1:]), "message": e["msg"]}
                    for e in exc.errors()
                ],
            },
        },
    )


@app.get(f"{settings.API_PREFIX}/health", tags=["Health"])
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        db_status = "up"
    except Exception as exc:  # noqa: BLE001
        logger.warning("Health check DB fallo: %s", exc)
        db_status = "down"

    return {
        "success": True,
        "data": {
            "status": "ok" if db_status == "up" else "degraded",
            "info": {"database": {"status": db_status}},
            "env": settings.APP_ENV,
        },
    }


app.include_router(api_router, prefix=settings.API_PREFIX)

# Las imagenes que se suben desde el panel se sirven desde el propio backend,
# bajo el prefijo de la API. Es lo que hace que funcionen sin tocar nada mas:
# en produccion el nginx del frontend ya proxea /api/ al backend, y en
# desarrollo cada app las pide al mismo origen al que le pide todo lo demas.
#
# La ruta es /files/ y no /media/ porque el catalogo ya usa /media/{id} para
# editar y borrar fotos; dos cosas distintas en la misma ruta terminan mal.
settings.upload_path.mkdir(parents=True, exist_ok=True)
app.mount(
    f"{settings.API_PREFIX}/files",
    StaticFiles(directory=settings.upload_path),
    name="files",
)


@app.on_event("startup")
def on_startup() -> None:
    logger.info("ALPACART API — %s", settings.APP_ENV)
    logger.info("Base:    %s", f"http://localhost:{settings.PORT}{settings.API_PREFIX}")
    logger.info("Swagger: %s", f"http://localhost:{settings.PORT}{settings.API_PREFIX}/docs")

    # La pasarela se apaga sola si le faltan las credenciales, y hasta aca lo
    # hacia sin decir nada: el backend arrancaba igual y el unico sintoma
    # aparecia tres pantallas mas adentro, cuando el cliente iba a pagar y leia
    # «el pago en linea no esta disponible». Un despliegue al que se le
    # olvidaron las variables tiene que notarse en la primera linea del log.
    pasarela = mp.configuracion()
    if not pasarela["enabled"]:
        logger.warning(
            "Mercado Pago APAGADO — falta %s. El checkout registra pedidos pero no cobra.",
            ", ".join(pasarela["missing"]),
        )
    else:
        logger.info("Pagos:   Mercado Pago en modo %s", pasarela["mode"])
        logger.info("Webhook: %s", pasarela["notificationUrl"] or "sin publicar (PUBLIC_BASE_URL)")
    for aviso in pasarela["warnings"]:
        logger.warning("Mercado Pago: %s", aviso)
