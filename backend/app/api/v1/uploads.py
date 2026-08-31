"""Subida de imagenes.

El panel ya no pide URLs: el archivo se sube aca y el backend devuelve la ruta
publica con la que se guarda la foto (producto, hero, galeria...).

Lo que se guarda es una ruta relativa al origen de la API
—`/api/v1/files/<nombre>`— y no una URL absoluta, a proposito: en produccion
las tres apps y la API comparten dominio, y en desarrollo cada frontend
resuelve lo relativo contra su VITE_API_URL. Guardar `http://localhost:8010/...`
en la base dejaria el catalogo inservible apenas se despliegue.
"""

import secrets

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.core.deps import StaffActor
from app.schemas.common import ok

router = APIRouter(tags=["Uploads"])

# Mapa cerrado, y por tipo declarado: la extension del nombre original no se usa
# nunca, asi que un `.php` renombrado no llega a la carpeta.
#
# SVG queda fuera a proposito: es XML, admite <script> y se serviria desde el
# mismo dominio que el panel y la tienda.
EXTENSIONES = {
    "image/jpeg": ".jpg",
    "image/pjpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
}


# Sellos de los formatos aceptados, en hexadecimal para que no dependan de como
# sobreviven los escapes al pasar por un editor.
JPEG = bytes.fromhex("ffd8ff")
PNG = bytes.fromhex("89504e470d0a1a0a")


def _coincide_contenido(cabecera: bytes, extension: str) -> bool:
    """El content-type lo elige el navegador y se puede mentir; los primeros
    bytes del archivo no. Cada formato se reconoce por su sello propio."""
    if extension == ".jpg":
        return cabecera.startswith(JPEG)
    if extension == ".png":
        return cabecera.startswith(PNG)
    if extension == ".gif":
        return cabecera.startswith((b"GIF87a", b"GIF89a"))
    if extension == ".webp":
        # Contenedor RIFF: "RIFF" + tamanio (4 bytes) + "WEBP".
        return cabecera[:4] == b"RIFF" and cabecera[8:12] == b"WEBP"
    if extension == ".avif":
        # Caja ISO-BMFF: tamanio (4 bytes) + "ftyp" + marca.
        return cabecera[4:8] == b"ftyp" and cabecera[8:12] in (b"avif", b"avis")
    return False


@router.post("/uploads", status_code=status.HTTP_201_CREATED, summary="Subir una imagen")
async def upload_image(actor: StaffActor, file: UploadFile = File(...)):
    tipo = (file.content_type or "").split(";")[0].strip().lower()
    extension = EXTENSIONES.get(tipo)
    if not extension:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Formato no admitido: subi una imagen JPG, PNG, WEBP, AVIF o GIF",
        )

    # Se lee un byte de mas que el limite: si aparece, el archivo lo supera y no
    # hace falta cargarlo entero en memoria para saberlo.
    limite = settings.MAX_UPLOAD_MB * 1024 * 1024
    contenido = await file.read(limite + 1)
    if len(contenido) > limite:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            f"La imagen supera los {settings.MAX_UPLOAD_MB} MB",
        )
    if not contenido:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "El archivo esta vacio")

    if not _coincide_contenido(contenido, extension):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "El archivo no parece una imagen del formato que declara",
        )

    # Nombre nuevo y aleatorio: el original puede traer rutas, acentos o
    # repetirse, y ademas cuenta como se llamaba el archivo en la maquina.
    nombre = f"{secrets.token_hex(16)}{extension}"
    destino = settings.upload_path / nombre
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_bytes(contenido)

    return ok(
        {
            "url": f"{settings.API_PREFIX}/files/{nombre}",
            "filename": nombre,
            "size": len(contenido),
            "content_type": tipo,
        }
    )
