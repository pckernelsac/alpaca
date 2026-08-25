from pydantic import BaseModel, Field


class StockAdjust(BaseModel):
    stock_item_id: int
    # Positivo suma, negativo descuenta.
    quantity: int
    reason: str | None = Field(default=None, max_length=500)
