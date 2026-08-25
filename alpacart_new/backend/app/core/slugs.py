"""Slugs para URLs legibles.

Un producto se comparte por link: `/producto/manta-imperial-gold` dice de que
se trata y `/producto/a0000001-0000-0000-0000-000000000006` no. El id sigue
sirviendo como identificador interno; el slug es la cara publica.
"""

import re
import unicodedata

MAX_LEN = 160


def slugify(text: str) -> str:
    """'Chalina Vicuña Edición Limitada' -> 'chalina-vicuna-edicion-limitada'."""
    # NFKD separa la tilde de la letra y el filtro ASCII la descarta: asi la
    # 'ñ' queda 'n' en vez de desaparecer la palabra entera.
    normal = unicodedata.normalize("NFKD", text)
    ascii_only = normal.encode("ascii", "ignore").decode("ascii")
    limpio = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_only).strip("-").lower()
    return limpio[:MAX_LEN].strip("-")


def unique_slug(base: str, tomados: set[str], fallback: str = "producto") -> str:
    """Agrega -2, -3... hasta que no choque con `tomados`."""
    raiz = slugify(base) or fallback
    if raiz not in tomados:
        return raiz

    n = 2
    while True:
        sufijo = f"-{n}"
        candidato = f"{raiz[: MAX_LEN - len(sufijo)]}{sufijo}"
        if candidato not in tomados:
            return candidato
        n += 1
