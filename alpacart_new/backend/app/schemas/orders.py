from pydantic import BaseModel, Field


class OrderStatusUpdate(BaseModel):
    status: str = Field(max_length=30)
    note: str | None = None
