"""Datos base de ALPACART.

Mantiene las mismas credenciales y registros que el proyecto anterior para que
las pruebas manuales sigan sirviendo.
"""

ROLES = [
    {"id": 1, "name": "Super Administrador", "category": "admin", "description": "Acceso total"},
    {"id": 2, "name": "Supervisor de Planta", "category": "operations", "description": "Producción e inventario"},
    {"id": 3, "name": "Logística", "category": "operations", "description": "Envíos y almacenes"},
    {"id": 4, "name": "Ventas", "category": "commercial", "description": "Clientes y pedidos"},
]

DEPARTMENTS = [
    {"id": 1, "name": "Dirección"},
    {"id": 2, "name": "Producción"},
    {"id": 3, "name": "Logística"},
    {"id": 4, "name": "Comercial"},
    {"id": 5, "name": "Marketing"},
    {"id": 6, "name": "Tecnología"},
    {"id": 7, "name": "Administración"},
]

PERMISSIONS = [
    {"id": 1, "module": "catalog", "action": "manage", "name": "Gestionar catálogo"},
    {"id": 2, "module": "orders", "action": "manage", "name": "Gestionar pedidos"},
    {"id": 3, "module": "inventory", "action": "manage", "name": "Gestionar inventario"},
    {"id": 4, "module": "customers", "action": "manage", "name": "Gestionar clientes"},
    {"id": 5, "module": "marketing", "action": "manage", "name": "Gestionar marketing"},
    {"id": 6, "module": "cms", "action": "manage", "name": "Gestionar contenido"},
    {"id": 7, "module": "iam", "action": "manage", "name": "Gestionar usuarios"},
]

# (role_id, permission_id)
ROLE_PERMISSIONS = [
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
    (2, 1), (2, 3),
    (3, 3),
    (4, 2),
]

STAFF = [
    {
        "id": "00000001-0000-0000-0000-000000000001",
        "name": "Mateo Quispe",
        "email": "mateo.q@alpacart.com",
        "password": "Admin123!",
        "phone": "+51 999 888 777",
        "employee_id": "ALP-001",
        "position": "Supervisor de Planta",
        "role_id": 1,
        "department_id": 2,
    },
    {
        "id": "00000001-0000-0000-0000-000000000002",
        "name": "Sofía Mendoza",
        "email": "sofia.m@alpacart.com",
        "password": "Admin123!",
        "phone": "+51 999 777 666",
        "employee_id": "ALP-002",
        "position": "Coordinadora de Logística",
        "role_id": 3,
        "department_id": 3,
    },
    {
        "id": "00000001-0000-0000-0000-000000000003",
        "name": "Diego Salazar",
        "email": "diego.s@alpacart.com",
        "password": "Admin123!",
        "employee_id": "ALP-003",
        "position": "Ejecutivo Comercial",
        "role_id": 4,
        "department_id": 4,
    },
]

CUSTOMERS = [
    {
        "id": "b0000001-0000-0000-0000-000000000001",
        "first_name": "Camila",
        "last_name": "García",
        "email": "camila.g@email.com",
        "password": "Cliente2024!",
        "phone": "+51 987 654 321",
        "loyalty_tier": "gold",
        "loyalty_points": 1250,
    },
    {
        "id": "b0000001-0000-0000-0000-000000000002",
        "first_name": "Lucas",
        "last_name": "Ferrari",
        "email": "lucas.f@email.com",
        "password": "Cliente2024!",
        "loyalty_tier": "silver",
        "loyalty_points": 480,
    },
]

FIBER_MATERIALS = [
    {"id": 1, "name": "Baby Alpaca", "category": "alpaca", "micron_rating": "21-22", "origin": "Puno"},
    {"id": 2, "name": "Alpaca Suri", "category": "alpaca", "micron_rating": "24-26", "origin": "Arequipa"},
    {"id": 3, "name": "Vicuña", "category": "vicuna", "micron_rating": "12-13", "origin": "Ayacucho"},
    {"id": 4, "name": "Lana Merino", "category": "lana", "micron_rating": "18-20", "origin": "Junín"},
    {"id": 5, "name": "Algodón Pima", "category": "algodon", "micron_rating": "-", "origin": "Piura"},
    {"id": 6, "name": "Alpaca Royal", "category": "alpaca", "micron_rating": "19-20", "origin": "Cusco"},
]

TEXTILE_COLORS = [
    {"id": 1, "name": "Dorado Inca", "hex": "#C9A227", "pantone": "7551 C"},
    {"id": 2, "name": "Marfil Andino", "hex": "#F5F0E6", "pantone": "11-0602"},
    {"id": 3, "name": "Gris Piedra", "hex": "#8A8A8A", "pantone": "Cool Gray 8"},
    {"id": 4, "name": "Negro Volcánico", "hex": "#1C1C1C", "pantone": "Black 6 C"},
    {"id": 5, "name": "Terracota", "hex": "#B4573B", "pantone": "7599 C"},
    {"id": 6, "name": "Azul Titicaca", "hex": "#2E5A78", "pantone": "5405 C"},
    {"id": 7, "name": "Camel", "hex": "#C19A6B", "pantone": "7508 C"},
    {"id": 8, "name": "Vino Andino", "hex": "#6B2737", "pantone": "7645 C"},
    {"id": 9, "name": "Verde Musgo", "hex": "#5A6B3B", "pantone": "5757 C"},
    {"id": 10, "name": "Blanco Nube", "hex": "#FAFAFA", "pantone": "11-0601"},
]

TEXTILE_SIZES = [
    {"id": 1, "name": "XS", "category": "prenda", "order": 1},
    {"id": 2, "name": "S", "category": "prenda", "order": 2},
    {"id": 3, "name": "M", "category": "prenda", "order": 3},
    {"id": 4, "name": "L", "category": "prenda", "order": 4},
    {"id": 5, "name": "XL", "category": "prenda", "order": 5},
    {"id": 6, "name": "XXL", "category": "prenda", "order": 6},
    {"id": 7, "name": "OS", "category": "accesorio", "order": 7},
    {"id": 8, "name": "ÚNICA", "category": "hogar", "order": 8},
]

SEASONS = [
    {"id": 1, "name": "Otoño-Invierno 2024", "start_month": 4, "end_month": 9},
    {"id": 2, "name": "Primavera-Verano 2024", "start_month": 10, "end_month": 3},
    {"id": 3, "name": "Otoño-Invierno 2025", "start_month": 4, "end_month": 9},
    {"id": 4, "name": "Atemporal", "start_month": 1, "end_month": 12},
]

ARTISAN_PROCESSES = [
    {"id": 1, "title": "Esquila responsable", "step_order": 1, "icon": "content_cut",
     "description": "La fibra se obtiene una vez al año, sin dañar al animal."},
    {"id": 2, "title": "Clasificación manual", "step_order": 2, "icon": "filter_alt",
     "description": "Cada vellón se separa por finura y color natural."},
    {"id": 3, "title": "Lavado artesanal", "step_order": 3, "icon": "water_drop",
     "description": "Agua de manantial y jabones neutros, sin químicos agresivos."},
    {"id": 4, "title": "Hilado", "step_order": 4, "icon": "line_weight",
     "description": "Hilado fino que preserva la elasticidad de la fibra."},
    {"id": 5, "title": "Teñido natural", "step_order": 5, "icon": "palette",
     "description": "Pigmentos de plantas y minerales andinos."},
    {"id": 6, "title": "Tejido a mano", "step_order": 6, "icon": "handyman",
     "description": "Maestros tejedores con técnicas heredadas por generaciones."},
    {"id": 7, "title": "Control de calidad", "step_order": 7, "icon": "verified",
     "description": "Revisión pieza por pieza antes del acabado final."},
    {"id": 8, "title": "Acabado y empaque", "step_order": 8, "icon": "inventory_2",
     "description": "Empaque libre de plástico, con materiales reciclados."},
]

# Los slug van sin tildes: forman parte de la URL.
CATEGORIES = [
    {"id": 1, "name": "Chompas", "slug": "chompas", "description": "Chompas de alpaca tejidas a mano."},
    {"id": 2, "name": "Abrigos", "slug": "abrigos", "description": "Abrigos y capas de fibra noble."},
    {"id": 3, "name": "Bufandas", "slug": "bufandas", "description": "Bufandas y chalinas."},
    {"id": 4, "name": "Ponchos", "slug": "ponchos", "description": "Ponchos tradicionales andinos."},
    {"id": 5, "name": "Accesorios", "slug": "accesorios", "description": "Gorros, guantes y medias."},
    {"id": 6, "name": "Mantas", "slug": "mantas", "description": "Mantas y throws para el hogar."},
    {"id": 7, "name": "Vestidos", "slug": "vestidos", "description": "Vestidos en fibras naturales."},
    {"id": 8, "name": "Cárdigans", "slug": "cardigans", "description": "Cárdigans de alpaca."},
    {"id": 9, "name": "Sacos", "slug": "sacos", "description": "Sacos estructurados."},
    {"id": 10, "name": "Chalinas", "slug": "chalinas", "description": "Chalinas finas de vicuña."},
    {"id": 11, "name": "Gorros", "slug": "gorros", "description": "Gorros y chullos."},
    {"id": 12, "name": "Guantes", "slug": "guantes", "description": "Guantes de alpaca."},
]

COLLECTIONS = [
    {"id": "AG-2024", "name": "Colección Dorada de los Andes", "season_id": 1, "piece_count": 24,
     "description": "Piezas en tonos dorados inspiradas en el altiplano.",
     "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"},
    {"id": "IN-2024", "name": "Invierno Ancestral", "season_id": 1, "piece_count": 18,
     "description": "Tejidos gruesos para el frío andino.",
     "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"},
    {"id": "VC-2025", "name": "Vicuña Colección Limitada", "season_id": 3, "piece_count": 8,
     "description": "Edición limitada en fibra de vicuña.",
     "image": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80"},
    {"id": "AT-000", "name": "Esenciales Atemporales", "season_id": 4, "piece_count": 32,
     "description": "Básicos que no pasan de moda.",
     "image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80"},
]

TAGS = [
    {"id": 1, "name": "nuevo"}, {"id": 2, "name": "destacado"}, {"id": 3, "name": "oferta"},
    {"id": 4, "name": "hecho-a-mano"}, {"id": 5, "name": "edicion-limitada"},
    {"id": 6, "name": "sostenible"}, {"id": 7, "name": "premium"}, {"id": 8, "name": "unisex"},
]

WAREHOUSES = [
    {"id": 1, "name": "Almacén Central Lima", "code": "ALM-LIM", "city": "Lima", "type": "principal"},
    {"id": 2, "name": "Almacén Arequipa", "code": "ALM-AQP", "city": "Arequipa", "type": "regional"},
    {"id": 3, "name": "Taller Puno", "code": "TAL-PUN", "city": "Puno", "type": "taller"},
    {"id": 4, "name": "Tienda Miraflores", "code": "TIE-MIR", "city": "Lima", "type": "tienda"},
]

CARRIERS = [
    {"id": 1, "name": "Olva Courier", "code": "OLVA"},
    {"id": 2, "name": "Shalom", "code": "SHALOM"},
    {"id": 3, "name": "DHL Express", "code": "DHL"},
]
