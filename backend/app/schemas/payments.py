"""Lo que el navegador puede mandar para cobrar un pedido.

Notese lo que **no** esta: el importe. El `formData` del Payment Brick trae un
`transaction_amount` y aca se ignora a proposito; el total sale del pedido, del
lado del servidor. Aceptarlo seria dejar que el navegador elija cuanto paga.
"""

from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

# Medios que no tokenizan tarjeta: el cupon se emite y se paga despues.
SIN_TOKEN = {"ticket", "atm", "bank_transfer"}


class MercadoPagoCharge(BaseModel):
    order_id: UUID
    # Tarjeta: el token del Brick. Yape: el de `mp.yape({otp, phoneNumber})`.
    token: str | None = Field(default=None, max_length=255)
    payment_method_id: str = Field(max_length=40)
    payment_type_id: str | None = Field(default=None, max_length=40)
    issuer_id: str | None = Field(default=None, max_length=40)
    installments: int = Field(default=1, ge=1, le=36)

    payer_email: EmailStr
    payer_first_name: str | None = Field(default=None, max_length=80)
    payer_last_name: str | None = Field(default=None, max_length=80)
    identification_type: str | None = Field(default=None, max_length=10)
    identification_number: str | None = Field(default=None, max_length=20)

    @field_validator("payment_method_id")
    @classmethod
    def _limpiar_medio(cls, valor: str) -> str:
        limpio = valor.strip().lower()
        if not limpio:
            raise ValueError("Falta el medio de pago")
        return limpio

    @model_validator(mode="after")
    def _token_cuando_corresponde(self) -> "MercadoPagoCharge":
        if (self.payment_type_id or "") not in SIN_TOKEN and not self.token:
            raise ValueError("Falta el token del medio de pago")
        return self
