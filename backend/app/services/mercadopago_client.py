"""Cliente de Mercado Pago (Checkout API).

Todo lo que toca la red de Mercado Pago pasa por aca: crear el pago, releerlo
y validar la firma del webhook. El resto del backend no importa el SDK.

Tres cosas que la documentacion de Mercado Pago no dice y cuestan un despliegue:

- **La idempotencia hay que fijarla.** El SDK manda un `X-Idempotency-Key`
  aleatorio por llamada, que no protege de nada: dos reintentos del navegador
  son dos cobros. Se fuerza con `RequestOptions.custom_headers` usando la
  referencia del intento.
- **El SDK de Python no valida la firma del webhook** (solo el de Node). Hay
  que escribir el HMAC a mano.
- **Los errores vienen en ingles y redactados para quien integra.** Al cliente
  se le traduce; en el log queda siempre el `code` numerico de `cause[0]`, que
  es lo unico que identifica el error sin ambiguedad en su documentacion.
"""

from __future__ import annotations

import hashlib
import hmac
import logging
from functools import lru_cache
from typing import Any

import mercadopago
from mercadopago.config import RequestOptions

from app.core.config import settings

logger = logging.getLogger("alpacart.mercadopago")


class MercadoPagoError(Exception):
    """Fallo de la pasarela ya traducido: `message` es apto para el cliente."""

    def __init__(self, message: str, status: int = 502, code: str | None = None):
        super().__init__(message)
        self.message = message
        self.status = status
        self.code = code


@lru_cache
def get_sdk() -> mercadopago.SDK:
    if not settings.MP_ACCESS_TOKEN:
        raise MercadoPagoError("La pasarela de pago no esta configurada", status=503)
    return mercadopago.SDK(settings.MP_ACCESS_TOKEN)


# ---------------------------------------------------------------------------
# Cobro
# ---------------------------------------------------------------------------
def create_payment(body: dict[str, Any], idempotency_key: str) -> dict[str, Any]:
    """Crea el pago y devuelve la respuesta de Mercado Pago.

    Lanza MercadoPagoError con un mensaje ya en castellano si la pasarela
    rechaza la peticion (datos invalidos, token vencido, credenciales...).
    """
    options = RequestOptions()
    options.custom_headers = {"x-idempotency-key": idempotency_key}

    try:
        result = get_sdk().payment().create(body, options)
    except MercadoPagoError:
        raise
    except Exception as exc:  # noqa: BLE001 — la red, o el propio SDK
        logger.exception("Mercado Pago no respondio: %s", exc)
        raise MercadoPagoError("No pudimos contactar con la pasarela de pago", status=502) from exc

    http_status = result.get("status", 500)
    response = result.get("response") or {}

    if http_status not in (200, 201):
        mensaje, code = translate_api_error(response)
        logger.warning(
            "Mercado Pago rechazo el cobro (http %s, code %s, ref %s): %s",
            http_status,
            code,
            idempotency_key,
            response.get("message") or response,
        )
        raise MercadoPagoError(mensaje, status=400 if http_status < 500 else 502, code=code)

    return response


def get_payment(payment_id: str) -> dict[str, Any] | None:
    """Relee un pago. El webhook nunca se fia del cuerpo que le llega."""
    try:
        result = get_sdk().payment().get(payment_id)
    except Exception as exc:  # noqa: BLE001
        logger.warning("No se pudo releer el pago %s: %s", payment_id, exc)
        return None

    if result.get("status") not in (200, 201):
        logger.warning(
            "Mercado Pago no devolvio el pago %s: %s", payment_id, result.get("response")
        )
        return None
    return result.get("response") or None


# ---------------------------------------------------------------------------
# Firma del webhook
# ---------------------------------------------------------------------------
def verify_signature(
    x_signature: str | None, x_request_id: str | None, data_id: str | None
) -> bool:
    """Valida la cabecera `x-signature`, que llega como `ts=1704908010,v1=618c85...`.

    El manifiesto se arma con las tres piezas separadas por `;`, y los tramos
    cuyo valor no llega se omiten. El `data.id` va en minusculas si es
    alfanumerico.
    """
    secreto = settings.MP_WEBHOOK_SECRET
    if not secreto:
        # Sin clave no hay forma de distinguir un aviso real de uno inventado.
        logger.error("Llego un webhook de Mercado Pago y MP_WEBHOOK_SECRET no esta configurada")
        return False
    if not x_signature:
        return False

    partes: dict[str, str] = {}
    for tramo in x_signature.split(","):
        clave, _, valor = tramo.partition("=")
        partes[clave.strip()] = valor.strip()

    ts, v1 = partes.get("ts"), partes.get("v1")
    if not ts or not v1:
        return False

    manifiesto = ""
    if data_id:
        manifiesto += f"id:{data_id.lower()};"
    if x_request_id:
        manifiesto += f"request-id:{x_request_id};"
    manifiesto += f"ts:{ts};"

    esperado = hmac.new(secreto.encode(), manifiesto.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(esperado, v1)


# ---------------------------------------------------------------------------
# Traduccion de errores
# ---------------------------------------------------------------------------
# Lo que devuelve la API cuando ni siquiera acepta la peticion.
_ERRORES_API = {
    "card_token_id": "El formulario de pago expiro. Volve a cargar la pagina e intenta de nuevo.",
    "invalid users involved": "No se puede pagar con una cuenta de Mercado Pago del mismo vendedor.",
    "transaction_amount": "El importe del pedido no es valido.",
    "payment_method_id": "Ese medio de pago no esta disponible.",
    "payer.email": "El correo del pagador no es valido.",
    "identification": "El documento de identidad no es valido.",
    "collector user without key enabled": "La cuenta de cobro no tiene ese medio de pago habilitado.",
    "unauthorized": "La pasarela rechazo las credenciales de la tienda.",
}

# `status_detail` de un pago que si se creo pero no quedo aprobado. Yape reusa
# los codigos de tarjeta, asi que el mensaje se elige tambien por medio de pago:
# un OTP vencido llega como cc_rejected_bad_filled_security_code, y hablarle al
# usuario del CVV de una tarjeta que no uso es absurdo.
_RECHAZOS = {
    "cc_rejected_bad_filled_card_number": "Revisa el numero de la tarjeta.",
    "cc_rejected_bad_filled_date": "Revisa la fecha de vencimiento de la tarjeta.",
    "cc_rejected_bad_filled_security_code": "Revisa el codigo de seguridad de la tarjeta.",
    "cc_rejected_bad_filled_other": "Revisa los datos de la tarjeta.",
    "cc_rejected_blacklist": "El pago fue rechazado. Proba con otro medio de pago.",
    "cc_rejected_call_for_authorize": "Tu banco tiene que autorizar el pago. Llamalos y volve a intentar.",
    "cc_rejected_card_disabled": "La tarjeta esta inhabilitada. Llama a tu banco o usa otra.",
    "cc_rejected_card_error": "No pudimos procesar la tarjeta. Proba de nuevo.",
    "cc_rejected_duplicated_payment": "Ya hiciste un pago igual. Si el anterior no se acredito, espera unos minutos.",
    "cc_rejected_high_risk": "El pago fue rechazado por seguridad. Proba con otro medio de pago.",
    "cc_rejected_insufficient_amount": "Fondos insuficientes.",
    "cc_rejected_invalid_installments": "La tarjeta no admite esa cantidad de cuotas.",
    "cc_rejected_max_attempts": "Alcanzaste el limite de intentos. Proba con otra tarjeta.",
    "cc_rejected_other_reason": "El banco rechazo el pago. Proba con otro medio de pago.",
    "cc_rejected_card_type_not_allowed": "Ese tipo de tarjeta no esta habilitado.",
    "rejected_insufficient_data": "Faltan datos del pagador para completar el cobro.",
    "pending_contingency": "El pago quedo en revision. Te avisamos apenas se acredite.",
    "pending_review_manual": "El pago quedo en revision manual. Te avisamos apenas se acredite.",
    "pending_waiting_transfer": "Falta que completes la transferencia.",
    "pending_waiting_payment": "Generamos el codigo de pago. Te avisamos apenas lo abones.",
}

_RECHAZOS_YAPE = {
    "cc_rejected_bad_filled_security_code": "El codigo de aprobacion no es valido o ya vencio. Pedi uno nuevo en tu app de Yape.",
    "cc_rejected_bad_filled_other": "Revisa el numero de celular y el codigo de aprobacion.",
    "cc_rejected_card_disabled": "Activa «Aprobar compras por internet» en tu app de Yape.",
    "cc_rejected_insufficient_amount": "Tu cuenta de Yape no tiene saldo suficiente.",
    "cc_rejected_max_attempts": "Alcanzaste el limite de intentos con Yape. Proba mas tarde.",
    "cc_rejected_other_reason": "Yape rechazo el pago. Proba con otro medio de pago.",
}


def translate_api_error(response: dict[str, Any]) -> tuple[str, str | None]:
    """Traduce el error de la API y rescata el `code` numerico de `cause[0]`."""
    causas = response.get("cause") or []
    code: str | None = None
    descripcion = ""
    if isinstance(causas, list) and causas and isinstance(causas[0], dict):
        primera = causas[0]
        if primera.get("code") is not None:
            code = str(primera["code"])
        descripcion = str(primera.get("description") or "")

    textos = " | ".join(
        [descripcion, str(response.get("message") or ""), str(response.get("error") or "")]
    ).lower()
    for patron, mensaje in _ERRORES_API.items():
        if patron in textos:
            return mensaje, code

    return "No pudimos procesar el pago. Revisa los datos e intenta de nuevo.", code


def message_for_status(
    estado: str, detalle: str | None, payment_method_id: str | None = None
) -> str:
    """Mensaje para el cliente a partir del estado de un pago ya creado."""
    if estado == "approved":
        return "Pago aprobado."
    if estado in ("pending", "in_process", "authorized"):
        return _RECHAZOS.get(
            detalle or "", "El pago quedo pendiente. Te avisamos apenas se acredite."
        )
    if estado == "refunded":
        return "El pago fue devuelto."
    if estado == "charged_back":
        return "El pago fue desconocido por el banco."
    if estado == "cancelled":
        return "El pago se cancelo."

    if (payment_method_id or "").lower() == "yape":
        mensaje = _RECHAZOS_YAPE.get(detalle or "")
        if mensaje:
            return mensaje
    return _RECHAZOS.get(detalle or "", "El pago fue rechazado. Proba con otro medio de pago.")
