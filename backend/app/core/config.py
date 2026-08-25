from functools import lru_cache

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
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
