from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_ENV: str = "development"
    API_PREFIX: str = "/api/v1"
    PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:3200,http://localhost:3300,http://localhost:3101"

    # En local se arma con las piezas de abajo. En un servidor —Dokploy y
    # compania— lo que se tiene a mano es la cadena entera que da el servicio de
    # base de datos, asi que si DATABASE_URL viene puesta, gana.
    DATABASE_URL: str = ""

    DB_HOST: str = "localhost"
    DB_PORT: int = 5448
    DB_USER: str = "alpacart"
    DB_PASSWORD: str = "alpacart"
    DB_NAME: str = "alpacart_new"

    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6389

    JWT_SECRET: str = "alpacart-dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 720

    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # Mercado Pago — Checkout API (pago embebido, sin redireccion).
    #   MP_PUBLIC_KEY     viaja al navegador; la sirve GET /payments/config.
    #   MP_ACCESS_TOKEN   solo servidor: permite cobrar en nombre de la cuenta.
    #   MP_WEBHOOK_SECRET la clave secreta del webhook, que NO es el access
    #                     token y ademas es distinta en prueba y en produccion.
    # Sin las dos primeras la pasarela queda apagada y el checkout registra el
    # pedido sin cobrar, como hasta ahora.
    MP_PUBLIC_KEY: str = ""
    MP_ACCESS_TOKEN: str = ""
    MP_WEBHOOK_SECRET: str = ""
    MP_STATEMENT_DESCRIPTOR: str = "ALPACART"
    # Tope de seguridad del cobro: el importe lo fija el servidor desde el
    # pedido, pero un total absurdo no deberia llegar a Mercado Pago.
    MP_MAX_AMOUNT: float = 20000.0

    # Dominio publico, con esquema y sin barra final: https://alpacart.com
    # De aca sale la notification_url del webhook. Mercado Pago rechaza hosts
    # locales, asi que en desarrollo se deja vacia y el pago va sin ella.
    PUBLIC_BASE_URL: str = ""

    # Carpeta donde aterrizan las imagenes que se suben desde el panel. Relativa
    # se resuelve contra la raiz del backend, para que valga igual corriendo
    # uvicorn a mano o dentro del contenedor. En un servidor tiene que ser un
    # volumen: si no, cada redeploy se lleva las fotos.
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_MB: int = 8

    @property
    def database_url(self) -> str:
        if self.DATABASE_URL:
            # El driver hay que forzarlo: las cadenas que reparten los paneles
            # vienen como postgresql:// y SQLAlchemy con eso busca psycopg2,
            # que no esta instalado. El que usamos es psycopg 3.
            url = self.DATABASE_URL
            if url.startswith("postgres://"):
                url = "postgresql://" + url[len("postgres://") :]
            if url.startswith("postgresql://"):
                url = "postgresql+psycopg://" + url[len("postgresql://") :]
            return url

        return (
            f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    @property
    def upload_path(self) -> Path:
        ruta = Path(self.UPLOAD_DIR)
        if not ruta.is_absolute():
            # config.py vive en app/core/: dos niveles arriba esta backend/.
            ruta = Path(__file__).resolve().parents[2] / ruta
        return ruta

    @property
    def mercadopago_enabled(self) -> bool:
        return bool(self.MP_ACCESS_TOKEN and self.MP_PUBLIC_KEY)

    @property
    def mp_notification_url(self) -> str | None:
        """URL completa del webhook, o None si no se puede publicar.

        Tiene que llevar la ruta entera: con solo el dominio, Mercado Pago
        recibe el index.html de la SPA, se lo cobra como un 200 y ningun pago
        se concilia jamas. Y en localhost va sin ella: MP valida el host y
        responde `notificaction_url attribute must be url valid` (la errata es
        suya).
        """
        base = self.PUBLIC_BASE_URL.strip().rstrip("/")
        if not base.startswith("https://"):
            return None
        return f"{base}{self.API_PREFIX}/payments/mercadopago/webhook"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
