"""Productos, variantes, media y contenido del CMS.

Las imágenes apuntan a Unsplash porque el stack local no levanta MinIO; así el
catálogo se ve real en el navegador sin depender de un bucket.
"""

IMG = "https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=900&q=80"

PRODUCTS = [
    {
        "id": "a0000001-0000-0000-0000-000000000001",
        "sku": "ALP-INV-24-001",
        "name": "Manta Imperial Gold",
        "description": "Manta tejida a mano en baby alpaca con hilos dorados. Una pieza de abrigo "
                       "que funciona igual sobre un sillón que sobre los hombros.",
        "material": "100% Baby Alpaca",
        "category_id": 6,
        "collection_id": "AG-2024",
        "weight": "1.20",
        "status": "active",
        "image": "1600369672770-985fd30004eb",
        "tags": [2, 4, 7],
        "variants": [
            {"sku": "ALP-INV-24-001-DOR-OS", "color_name": "Dorado Inca", "color_hex": "#C9A227",
             "size_id": 8, "material_id": 1, "color_id": 1, "price": "450.00", "stock": 42},
            {"sku": "ALP-INV-24-001-MAR-OS", "color_name": "Marfil Andino", "color_hex": "#F5F0E6",
             "size_id": 8, "material_id": 1, "color_id": 2, "price": "450.00", "stock": 18},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000002",
        "sku": "ALP-INV-24-002",
        "name": "Chompa Cuello Alto Andes",
        "description": "Chompa de cuello alto en alpaca royal. Punto cerrado que aísla del frío "
                       "sin volumen extra.",
        "material": "100% Alpaca Royal",
        "category_id": 1,
        "collection_id": "AG-2024",
        "weight": "0.65",
        "status": "active",
        "image": "1576871337622-98d48d1cf531",
        "tags": [1, 2, 8],
        "variants": [
            {"sku": "ALP-INV-24-002-CAM-S", "color_name": "Camel", "color_hex": "#C19A6B",
             "size_id": 2, "material_id": 6, "color_id": 7, "price": "320.00", "stock": 24},
            {"sku": "ALP-INV-24-002-CAM-M", "color_name": "Camel", "color_hex": "#C19A6B",
             "size_id": 3, "material_id": 6, "color_id": 7, "price": "320.00", "stock": 31},
            {"sku": "ALP-INV-24-002-NEG-M", "color_name": "Negro Volcánico", "color_hex": "#1C1C1C",
             "size_id": 3, "material_id": 6, "color_id": 4, "price": "340.00", "stock": 12},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000003",
        "sku": "ALP-VIC-25-001",
        "name": "Chalina Vicuña Edición Limitada",
        "description": "Chalina en fibra de vicuña, la más fina del mundo. Producción limitada a "
                       "80 piezas por temporada.",
        "material": "100% Vicuña",
        "category_id": 10,
        "collection_id": "VC-2025",
        "weight": "0.18",
        "status": "active",
        "image": None,  # sin fotografia: se usa el respaldo de marca
        "tags": [5, 7],
        "variants": [
            {"sku": "ALP-VIC-25-001-MAR-OS", "color_name": "Marfil Andino", "color_hex": "#F5F0E6",
             "size_id": 7, "material_id": 3, "color_id": 2, "price": "1850.00", "stock": 6},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000004",
        "sku": "ALP-INV-24-003",
        "name": "Poncho Tradicional Cusco",
        "description": "Poncho tejido en telar por artesanos de Cusco, con iconografía andina "
                       "en los bordes.",
        "material": "80% Alpaca / 20% Lana Merino",
        "category_id": 4,
        "collection_id": "IN-2024",
        "weight": "0.95",
        "status": "active",
        "image": "1591047139829-d91aecb6caea",
        "tags": [4, 6],
        "variants": [
            {"sku": "ALP-INV-24-003-TER-OS", "color_name": "Terracota", "color_hex": "#B4573B",
             "size_id": 7, "material_id": 2, "color_id": 5, "price": "580.00", "stock": 15},
            {"sku": "ALP-INV-24-003-GRI-OS", "color_name": "Gris Piedra", "color_hex": "#8A8A8A",
             "size_id": 7, "material_id": 2, "color_id": 3, "price": "580.00", "stock": 9},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000005",
        "sku": "ALP-ATM-000-001",
        "name": "Bufanda Esencial Baby Alpaca",
        "description": "La bufanda de todos los días. Suave, liviana y sin picazón.",
        "material": "100% Baby Alpaca",
        "category_id": 3,
        "collection_id": "AT-000",
        "weight": "0.22",
        "status": "active",
        "image": None,  # sin fotografia: se usa el respaldo de marca
        "tags": [6, 8],
        "variants": [
            {"sku": "ALP-ATM-000-001-GRI-OS", "color_name": "Gris Piedra", "color_hex": "#8A8A8A",
             "size_id": 7, "material_id": 1, "color_id": 3, "price": "180.00", "stock": 64},
            {"sku": "ALP-ATM-000-001-VIN-OS", "color_name": "Vino Andino", "color_hex": "#6B2737",
             "size_id": 7, "material_id": 1, "color_id": 8, "price": "180.00", "stock": 38},
            {"sku": "ALP-ATM-000-001-AZU-OS", "color_name": "Azul Titicaca", "color_hex": "#2E5A78",
             "size_id": 7, "material_id": 1, "color_id": 6, "price": "195.00", "stock": 27},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000006",
        "sku": "ALP-INV-24-004",
        "name": "Abrigo Largo Altiplano",
        "description": "Abrigo largo de corte recto en mezcla de alpaca. Forro interior en "
                       "algodón pima.",
        "material": "70% Alpaca / 30% Algodón Pima",
        "category_id": 2,
        "collection_id": "IN-2024",
        "weight": "1.60",
        "status": "active",
        "image": "1539533018447-63fcce2678e3",
        "tags": [2, 7],
        "variants": [
            {"sku": "ALP-INV-24-004-NEG-M", "color_name": "Negro Volcánico", "color_hex": "#1C1C1C",
             "size_id": 3, "material_id": 2, "color_id": 4, "price": "890.00", "stock": 8},
            {"sku": "ALP-INV-24-004-NEG-L", "color_name": "Negro Volcánico", "color_hex": "#1C1C1C",
             "size_id": 4, "material_id": 2, "color_id": 4, "price": "890.00", "stock": 5},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000007",
        "sku": "ALP-ATM-000-002",
        "name": "Gorro Chullo Contemporáneo",
        "description": "Relectura del chullo tradicional en paleta sobria.",
        "material": "100% Baby Alpaca",
        "category_id": 11,
        "collection_id": "AT-000",
        "weight": "0.12",
        "status": "active",
        "image": "1576871337632-b9aef4c17ab9",
        "tags": [1, 4, 8],
        "variants": [
            {"sku": "ALP-ATM-000-002-VER-OS", "color_name": "Verde Musgo", "color_hex": "#5A6B3B",
             "size_id": 7, "material_id": 1, "color_id": 9, "price": "120.00", "stock": 52},
            {"sku": "ALP-ATM-000-002-BLA-OS", "color_name": "Blanco Nube", "color_hex": "#FAFAFA",
             "size_id": 7, "material_id": 1, "color_id": 10, "price": "120.00", "stock": 44},
        ],
    },
    {
        "id": "a0000001-0000-0000-0000-000000000008",
        "sku": "ALP-AG-24-005",
        "name": "Cárdigan Oversize Dorado",
        "description": "Cárdigan de silueta amplia con botones de tagua.",
        "material": "100% Alpaca Suri",
        "category_id": 8,
        "collection_id": "AG-2024",
        "weight": "0.78",
        "status": "active",
        "image": "1434389677669-e08b4cac3105",
        "tags": [1, 3],
        "variants": [
            {"sku": "ALP-AG-24-005-DOR-S", "color_name": "Dorado Inca", "color_hex": "#C9A227",
             "size_id": 2, "material_id": 2, "color_id": 1, "price": "420.00", "stock": 16},
            {"sku": "ALP-AG-24-005-DOR-L", "color_name": "Dorado Inca", "color_hex": "#C9A227",
             "size_id": 4, "material_id": 2, "color_id": 1, "price": "420.00", "stock": 11},
        ],
    },
]

HERO_SLIDES = [
    {"id": 1, "title": "Lujo ancestral, diseño contemporáneo",
     "subtitle": "Descubrí nuestra colección Otoño-Invierno, tejida con fibras nobles de los Andes",
     "cta_text": "Explorar colección", "cta_link": "/tienda", "order": 1,
     "image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80"},
    {"id": 2, "title": "Colección Dorada de los Andes",
     "subtitle": "La suavidad más pura, envuelta en artesanía peruana que trasciende generaciones",
     "cta_text": "Ver la colección", "cta_link": "/tienda?collection_id=AG-2024", "order": 2,
     "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"},
    {"id": 3, "title": "Vicuña: edición limitada",
     "subtitle": "Solo 80 piezas por temporada de la fibra más fina del mundo",
     "cta_text": "Conocer más", "cta_link": "/tienda?collection_id=VC-2025", "order": 3,
     "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"},
]

BENEFITS = [
    {"id": 1, "title": "Envío gratis", "description": "En pedidos mayores a S/500 a todo el Perú.",
     "icon": "local_shipping", "order": 1},
    {"id": 2, "title": "Cambios sin costo", "description": "30 días para cambiar talla o color.",
     "icon": "swap_horiz", "order": 2},
    {"id": 3, "title": "Hecho a mano", "description": "Cada pieza tejida por artesanos peruanos.",
     "icon": "handyman", "order": 3},
    {"id": 4, "title": "Comercio justo", "description": "Pagamos por encima del precio de mercado.",
     "icon": "volunteer_activism", "order": 4},
    {"id": 5, "title": "Empaque sostenible", "description": "Sin plástico, 100% reciclable.",
     "icon": "eco", "order": 5},
]

TESTIMONIALS = [
    {"id": 1, "author": "Valeria Ortiz", "role": "Arquitecta", "company": "Lima",
     "text": "La manta llegó impecable. Es la primera vez que compro alpaca de verdad y se nota "
             "la diferencia con cualquier tejido industrial.", "rating": 5, "featured": True, "order": 1},
    {"id": 2, "author": "Martín Escobar", "role": "Fotógrafo", "company": "Buenos Aires",
     "text": "Pedí el poncho para un viaje a la Patagonia y aguantó todo. Abriga sin pesar.",
     "rating": 5, "featured": True, "order": 2},
    {"id": 3, "author": "Ana Lucía Rivas", "role": "Diseñadora", "company": "Bogotá",
     "text": "El acabado de la chalina de vicuña es de otro nivel. Vale cada sol.",
     "rating": 5, "featured": False, "order": 3},
    {"id": 4, "author": "Joaquín Duarte", "role": "Chef", "company": "Santiago",
     "text": "Compré dos chompas de regalo y ambas llegaron antes de lo estimado.",
     "rating": 4, "featured": False, "order": 4},
]

FAQ_CATEGORIES = [
    {"id": 1, "name": "Pedidos y envíos", "slug": "pedidos-envios", "icon": "local_shipping", "order": 1},
    {"id": 2, "name": "Producto y cuidado", "slug": "producto-cuidado", "icon": "checkroom", "order": 2},
    {"id": 3, "name": "Pagos", "slug": "pagos", "icon": "payments", "order": 3},
    {"id": 4, "name": "Cambios y devoluciones", "slug": "cambios-devoluciones", "icon": "swap_horiz", "order": 4},
]

FAQ_ITEMS = [
    {"category_id": 1, "order": 1, "question": "¿Cuánto demora el envío?",
     "answer": "Lima entre 1 y 2 días hábiles; provincias entre 3 y 5. Los envíos internacionales "
               "toman entre 7 y 14 días."},
    {"category_id": 1, "order": 2, "question": "¿Hacen envíos internacionales?",
     "answer": "Sí, enviamos a toda América y Europa mediante DHL Express."},
    {"category_id": 1, "order": 3, "question": "¿Cómo sigo mi pedido?",
     "answer": "Al despachar tu pedido te enviamos el número de guía por correo, y podés seguirlo "
               "desde tu cuenta en la sección Mis pedidos."},
    {"category_id": 2, "order": 1, "question": "¿Cómo lavo una prenda de alpaca?",
     "answer": "Lavado a mano en agua fría con jabón neutro. No retorcer: presionar para quitar el "
               "agua y secar en plano a la sombra."},
    {"category_id": 2, "order": 2, "question": "¿La alpaca pica?",
     "answer": "No. La baby alpaca tiene entre 21 y 22 micrones, por debajo del umbral que genera "
               "picazón en la piel."},
    {"category_id": 2, "order": 3, "question": "¿Qué diferencia hay entre alpaca y vicuña?",
     "answer": "La vicuña es más fina (12-13 micrones frente a 21-22) y su esquila está regulada, "
               "lo que la vuelve considerablemente más escasa."},
    {"category_id": 3, "order": 1, "question": "¿Qué medios de pago aceptan?",
     "answer": "Tarjetas de crédito y débito Visa, Mastercard y American Express mediante Stripe."},
    {"category_id": 3, "order": 2, "question": "¿Es seguro pagar en el sitio?",
     "answer": "Sí. No almacenamos datos de tarjeta: el pago se procesa íntegramente en Stripe."},
    {"category_id": 3, "order": 3, "question": "¿Emiten factura?",
     "answer": "Sí, podés solicitarla durante el checkout indicando tu RUC."},
    {"category_id": 4, "order": 1, "question": "¿Puedo cambiar la talla?",
     "answer": "Sí, tenés 30 días desde la recepción. La prenda debe estar sin uso y con su etiqueta."},
    {"category_id": 4, "order": 2, "question": "¿Cómo devuelvo un producto?",
     "answer": "Escribinos a hola@alpacart.com con tu número de pedido y coordinamos el recojo."},
    {"category_id": 4, "order": 3, "question": "¿Cuánto demora el reembolso?",
     "answer": "Entre 5 y 10 días hábiles una vez recibida y revisada la prenda."},
]

GALLERY_IMAGES = [
    {"id": 1, "url": "https://images.unsplash.com/photo-1528732263440-4d1a1a0a4e8f?auto=format&fit=crop&w=900&q=80",
     "caption": "Taller de tejido en Puno", "category": "taller", "order": 1},
    {"id": 2, "url": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=900&q=80",
     "caption": "Alpacas en el altiplano", "category": "origen", "order": 2},
    {"id": 3, "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
     "caption": "Colección Otoño-Invierno", "category": "coleccion", "order": 3},
    {"id": 4, "url": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
     "caption": "Detalle de tejido a mano", "category": "taller", "order": 4},
    {"id": 5, "url": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
     "caption": "Tienda Miraflores", "category": "tienda", "order": 5},
]

CONTENTS = [
    {"slug": "nosotros", "title": "Nosotros", "type": "page", "status": "published",
     "body": "Alpacart nace en 2018 en Arequipa con una idea simple: que la fibra de alpaca "
             "peruana llegue al mundo sin intermediarios que diluyan ni el precio justo para el "
             "artesano ni la calidad para quien la compra.\n\n"
             "Trabajamos directamente con las comunidades que crían los rebaños, compramos el "
             "vellón en el altiplano y tejemos en talleres propios en Puno, Cusco y Arequipa. "
             "Ninguna etapa se terceriza fuera del país."},
    {"slug": "sostenibilidad", "title": "Sostenibilidad", "type": "page", "status": "published",
     "body": "Trabajamos con 140 familias de tejedores en Puno, Cusco y Arequipa bajo contratos "
             "de comercio justo. La esquila es anual y no invasiva.\n\n"
             "Los tintes son de origen vegetal y mineral, el agua del lavado se filtra y reutiliza, "
             "y el empaque no lleva plástico: cajas de cartón reciclado y cintas de algodón."},
    {"slug": "envios", "title": "Envíos", "type": "page", "status": "published",
     "body": "Envío gratuito en compras superiores a S/500 dentro del Perú. Despachamos de lunes "
             "a viernes dentro de las 24 horas de confirmado el pago.\n\n"
             "Lima: 1 a 2 días hábiles. Provincias: 3 a 5 días hábiles. Internacional: 7 a 14 días "
             "mediante DHL Express, con seguimiento incluido."},
    {"slug": "devoluciones", "title": "Devoluciones", "type": "page", "status": "published",
     "body": "Tenés 30 días corridos desde la recepción para solicitar un cambio o devolución, "
             "siempre que la prenda no haya sido usada y conserve su etiqueta.\n\n"
             "Escribinos a hola@alpacart.com con tu número de pedido y coordinamos el recojo sin "
             "costo dentro del Perú."},
    {"slug": "terminos", "title": "Términos y condiciones", "type": "page", "status": "published",
     "body": "El uso de este sitio implica la aceptación de los presentes términos.\n\n"
             "Los precios se expresan en soles peruanos e incluyen IGV. Las imágenes son "
             "referenciales: al tratarse de piezas tejidas a mano, pueden existir variaciones "
             "mínimas de tono y textura entre unidades."},
    {"slug": "privacidad", "title": "Política de privacidad", "type": "page", "status": "published",
     "body": "Tratamos tus datos personales conforme a la Ley 29733 de Protección de Datos "
             "Personales del Perú.\n\n"
             "Usamos tus datos únicamente para procesar pedidos y, si lo autorizás, enviarte "
             "novedades. No los compartimos con terceros salvo lo necesario para el envío y el "
             "procesamiento del pago."},
    {"slug": "cuidado-alpaca", "title": "Cómo cuidar tu prenda de alpaca", "type": "post",
     "status": "published",
     "body": "La alpaca es una fibra resistente pero agradece el trato suave: lavado a mano, agua "
             "fría y secado en plano.\n\n"
             "Evitá la secadora y el colgado en percha, que deforman el punto. Entre usos, airear "
             "la prenda alcanza: la fibra repele el olor por sí sola."},
]

COUPONS = [
    {"id": 1, "code": "BIENVENIDO10", "type": "percentage", "value": "10.00",
     "min_purchase": "150.00", "max_uses": 500, "used_count": 37},
    {"id": 2, "code": "ANDES20", "type": "percentage", "value": "20.00",
     "min_purchase": "400.00", "max_uses": 200, "used_count": 12},
    {"id": 3, "code": "ENVIOGRATIS", "type": "fixed", "value": "25.00",
     "min_purchase": "200.00", "max_uses": 1000, "used_count": 145},
    {"id": 4, "code": "VICUNA15", "type": "percentage", "value": "15.00",
     "min_purchase": "1000.00", "max_uses": 50, "used_count": 3},
    {"id": 5, "code": "INVIERNO25", "type": "percentage", "value": "25.00",
     "min_purchase": "600.00", "max_uses": 100, "used_count": 0},
]

COMPANY = {
    "legal_name": "Alpacart Textiles S.A.C.",
    "tax_id": "20601234567",
    "industry": "Textil y confecciones",
    "website": "https://alpacart.com",
    "email": "hola@alpacart.com",
    "phone": "+51 999 888 777",
    "address": "Av. Ejército 1010, Yanahuara, Arequipa, Perú",
}
