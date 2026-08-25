"""Dominio textil: fibras, colores, tallas, temporadas y procesos artesanales."""

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class FiberMaterial(Base, TimestampMixin):
    __tablename__ = "fiber_materials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    category: Mapped[str | None] = mapped_column(String(50))
    micron_rating: Mapped[str | None] = mapped_column(String(20))
    origin: Mapped[str | None] = mapped_column(String(100))
    certification: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")


class TextileColor(Base, TimestampMixin):
    __tablename__ = "textile_colors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    hex: Mapped[str] = mapped_column(String(7), nullable=False)
    pantone: Mapped[str | None] = mapped_column(String(30))
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")


class TextileSize(Base, TimestampMixin):
    __tablename__ = "textile_sizes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(20), nullable=False)
    category: Mapped[str | None] = mapped_column(String(30))
    # 'order' es palabra reservada en SQL: se cita en el nombre de columna.
    order: Mapped[int] = mapped_column("order", Integer, nullable=False)


class Season(Base, TimestampMixin):
    __tablename__ = "seasons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    start_month: Mapped[int | None] = mapped_column(Integer)
    end_month: Mapped[int | None] = mapped_column(Integer)
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")


class ArtisanProcess(Base, TimestampMixin):
    __tablename__ = "artisan_processes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    icon: Mapped[str | None] = mapped_column(String(50))
    image: Mapped[str | None] = mapped_column(String(500))
    step_order: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")
