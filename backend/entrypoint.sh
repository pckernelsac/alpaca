#!/bin/sh
# Arranque del backend en un servidor.
#
# Tres pasos antes de servir: esperar a que la base conteste, aplicar las
# migraciones y —solo si se pide— sembrar. La espera no asume un host llamado
# `db`: sale de la misma configuracion que usa la app, asi que funciona igual
# con DATABASE_URL completa que con las piezas sueltas.
set -e

espera_base() {
  python - <<'PY'
import socket
import sys
import time
from urllib.parse import urlsplit

from app.core.config import settings

partes = urlsplit(settings.database_url)
host = partes.hostname or "localhost"
puerto = partes.port or 5432

print(f"[entrypoint] esperando a {host}:{puerto}", flush=True)
limite = time.monotonic() + 90
while True:
    try:
        with socket.create_connection((host, puerto), timeout=3):
            print("[entrypoint] la base responde", flush=True)
            sys.exit(0)
    except OSError as error:
        if time.monotonic() >= limite:
            print(f"[entrypoint] la base no respondio en 90s: {error}", flush=True)
            sys.exit(1)
        time.sleep(2)
PY
}

espera_base

echo "[entrypoint] aplicando migraciones"
alembic upgrade head

# Sembrar borra y reescribe datos: nunca por defecto. Se enciende a mano la
# primera vez y se vuelve a apagar, o la proxima release se lleva puesto el
# catalogo real.
if [ "${RUN_SEED:-false}" = "true" ]; then
  echo "[entrypoint] sembrando datos (RUN_SEED=true)"
  python -m app.seeds.run --reset
else
  echo "[entrypoint] sin sembrar (RUN_SEED=${RUN_SEED:-false})"
fi

echo "[entrypoint] levantando uvicorn"
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --proxy-headers --forwarded-allow-ips='*'
