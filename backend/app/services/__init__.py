"""Servicios: la logica que no es ni modelo ni endpoint.

`mercadopago_client` habla con la pasarela; `payments` orquesta los pasos
comunes de un cobro (fila en `transactions` -> llamada -> fila actualizada).
"""
