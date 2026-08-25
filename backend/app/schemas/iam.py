from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    phone: str | None = Field(default=None, max_length=50)
    employee_id: str | None = Field(default=None, max_length=50)
    position: str | None = Field(default=None, max_length=255)
    role_id: int
    department_id: int | None = None
    status: str = "active"


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=128)
    phone: str | None = Field(default=None, max_length=50)
    position: str | None = Field(default=None, max_length=255)
    role_id: int | None = None
    department_id: int | None = None
    status: str | None = None
