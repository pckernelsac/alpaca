# Backend ALPACART — FastAPI + SQLAlchemy sobre PostgreSQL 18.
#
# 3.11-slim porque es la version con la que se desarrollo (el .venv local es
# 3.11.8) y psycopg[binary] trae su propia libpq: no hace falta compilar nada
# ni instalar postgresql-client.
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Las dependencias en una capa aparte: cambian mucho menos seguido que el
# codigo, asi un commit normal reusa esta capa entera.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Sin privilegios: el contenedor no escribe nada fuera de /tmp.
RUN useradd --create-home --uid 10001 alpacart \
    && chown -R alpacart:alpacart /app
USER alpacart

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
