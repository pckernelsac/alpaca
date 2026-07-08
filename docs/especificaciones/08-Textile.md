# Especificación Funcional

# Volumen V

# Parte IX

# Textile

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Textile administra las características técnicas propias de los productos textiles comercializados por la empresa.

Su propósito es desacoplar la información técnica del producto respecto al catálogo comercial, permitiendo administrar atributos específicos del sector textil sin afectar otros módulos del ERP.

---

# 2. Alcance

Administra

- Materiales
- Composición
- Colores
- Tallas
- Temporadas
- Colecciones textiles
- Género objetivo
- Tipo de prenda
- Ajuste (Fit)
- Instrucciones de lavado
- País de fabricación
- Peso
- Dimensiones
- Variantes textiles

---

# 3. Actores

Administrador.

Compras.

Ventas.

Marketing.

---

# 4. Interfaces Funcionales

Materiales

Tallas

Colores

Composición

Temporadas

Tipos de prenda

---

# 5. Funcionalidades

Registrar material.

Registrar color.

Registrar talla.

Registrar composición.

Administrar temporadas.

Administrar variantes textiles.

Administrar instrucciones de cuidado.

---

# 6. Reglas de Negocio

RN-TXT-001

Todo producto deberá poseer al menos una variante textil.

RN-TXT-002

Toda variante deberá tener una talla.

RN-TXT-003

Toda variante deberá tener un color.

RN-TXT-004

Los materiales deberán obtenerse desde Master Data cuando corresponda.

RN-TXT-005

Las instrucciones de cuidado serán reutilizables.

---

# 7. Validaciones

Color obligatorio.

Talla obligatoria.

Material obligatorio.

Composición válida.

---

# 8. Estados

Activo

Inactivo

---

# 9. Flujo General

Producto

↓

Variante Textil

↓

Color

↓

Talla

↓

Material

↓

Disponible para Inventario

---

# 10. Casos de Uso

Registrar variante.

Editar variante.

Administrar tallas.

Administrar colores.

Administrar materiales.

---

# 11. APIs

/api/v1/textile

/api/v1/textile/colors

/api/v1/textile/sizes

/api/v1/textile/materials

/api/v1/textile/seasons

---

# 12. Tablas

textile_material

textile_color

textile_size

textile_season

textile_variant

textile_care_instruction

---

# 13. Permisos

TEXTILE.READ

TEXTILE.CREATE

TEXTILE.UPDATE

TEXTILE.DELETE

---

# 14. Mensajes

Variante registrada.

Material actualizado.

Color registrado.

Talla creada.

---

# 15. Criterios de Aceptación

Toda variante deberá poder ser utilizada por Inventory.

---

# 16. Casos de Prueba

Registrar variante.

Registrar talla.

Registrar color.

Editar composición.

---

# 17. Dependencias

Consume

Catalog

Master Data

Produce

Inventory

Store

---

# 18. Observaciones

Textile no administra precios, stock ni imágenes.

Únicamente administra información técnica del producto textil.