'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash('Cliente2024!', 10);

    // ─── Customers (B2C) ─────────────────────────────────────────
    await queryInterface.bulkInsert('customers', [
      { id: 'b0000001-0000-0000-0000-000000000001', first_name: 'Camila', last_name: 'Gutiérrez', email: 'camila.g@email.com', password: hash, phone: '+51 987 654 321', language: 'es', currency: 'PEN', loyalty_tier: 'gold', loyalty_points: 1250, email_verified_at: new Date() },
      { id: 'b0000001-0000-0000-0000-000000000002', first_name: 'James', last_name: 'Mitchell', email: 'james.m@email.com', password: hash, phone: '+1 212 555 0199', language: 'en', currency: 'USD', loyalty_tier: 'silver', loyalty_points: 340, email_verified_at: new Date() },
      { id: 'b0000001-0000-0000-0000-000000000003', first_name: 'Marie', last_name: 'Dubois', email: 'marie.d@email.fr', password: hash, phone: '+33 6 12 34 56 78', language: 'en', currency: 'USD', loyalty_points: 0 },
      { id: 'b0000001-0000-0000-0000-000000000004', first_name: 'Hans', last_name: 'Schmidt', email: 'hans.s@email.de', password: hash, phone: '+49 170 123 4567', language: 'en', currency: 'USD', loyalty_tier: 'gold', loyalty_points: 2200, email_verified_at: new Date() },
      { id: 'b0000001-0000-0000-0000-000000000005', first_name: 'Aiko', last_name: 'Tanaka', email: 'aiko.t@email.jp', password: hash, language: 'en', currency: 'USD', loyalty_points: 75, email_verified_at: new Date() },
    ]);

    // ─── Customer Addresses ──────────────────────────────────────
    await queryInterface.bulkInsert('customer_addresses', [
      { customer_id: 'b0000001-0000-0000-0000-000000000001', name: 'Casa', street: 'Av. Larco 456, Dpto 301', city: 'Miraflores', state: 'Lima', zip: '15074', country: 'Perú', phone: '+51 987 654 321', is_default: true },
      { customer_id: 'b0000001-0000-0000-0000-000000000002', name: 'Home', street: '350 Fifth Avenue, Apt 12B', city: 'New York', state: 'NY', zip: '10118', country: 'United States', phone: '+1 212 555 0199', is_default: true },
      { customer_id: 'b0000001-0000-0000-0000-000000000004', name: 'Wohnung', street: 'Unter den Linden 78', city: 'Berlin', state: 'Berlin', zip: '10117', country: 'Germany', phone: '+49 170 123 4567', is_default: true },
    ]);

    // ─── Wishlist Items ──────────────────────────────────────────
    await queryInterface.bulkInsert('wishlist_items', [
      { customer_id: 'b0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000005' },
      { customer_id: 'b0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000002' },
      { customer_id: 'b0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000001' },
      { customer_id: 'b0000001-0000-0000-0000-000000000004', product_id: 'a0000001-0000-0000-0000-000000000004' },
      { customer_id: 'b0000001-0000-0000-0000-000000000004', product_id: 'a0000001-0000-0000-0000-000000000006' },
    ]);

    // ─── Carts + Cart Items ──────────────────────────────────────
    await queryInterface.bulkInsert('carts', [
      { id: 'c0000001-0000-0000-0000-000000000001', customer_id: 'b0000001-0000-0000-0000-000000000003', subtotal: 890, shipping_fee: 25, tax: 75, total: 990 },
      { id: 'c0000001-0000-0000-0000-000000000002', customer_id: 'b0000001-0000-0000-0000-000000000005', subtotal: 120, total: 120 },
    ]);
    await queryInterface.bulkInsert('cart_items', [
      { cart_id: 'c0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000006', name: 'Gorro Montana de Alpaca', sku: 'ALP-ACC-001', unit_price: 120, quantity: 2, total: 240 },
      { cart_id: 'c0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000007', name: 'Chalina de Alpaca Real', sku: 'ALP-CHL-001', unit_price: 320, quantity: 1, total: 320 },
      { cart_id: 'c0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000002', name: 'Bufanda de Vicuña', sku: 'ALP-INV-24-002', unit_price: 330, quantity: 1, total: 330 },
      { cart_id: 'c0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000006', name: 'Gorro Montana de Alpaca', sku: 'ALP-ACC-001', unit_price: 120, quantity: 1, total: 120 },
    ]);

    // ─── Product Media ───────────────────────────────────────────
    await queryInterface.bulkInsert('product_media', [
      { id: 'd0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000001', url: '/images/products/manta-imperial-gold-1.jpg', type: 'image', format: 'jpg', alt_text: 'Manta Imperial Gold vista frontal', is_principal: true },
      { id: 'd0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000001', url: '/images/products/manta-imperial-gold-2.jpg', type: 'image', format: 'jpg', alt_text: 'Manta Imperial Gold detalle textura' },
      { id: 'd0000001-0000-0000-0000-000000000003', product_id: 'a0000001-0000-0000-0000-000000000004', url: '/images/products/poncho-andino-bruma-1.jpg', type: 'image', format: 'jpg', alt_text: 'Poncho Andino Bruma', is_principal: true },
      { id: 'd0000001-0000-0000-0000-000000000004', product_id: 'a0000001-0000-0000-0000-000000000005', url: '/images/products/abrigo-heritage-1.jpg', type: 'image', format: 'jpg', alt_text: 'Abrigo Heritage vista frontal', is_principal: true },
      { id: 'd0000001-0000-0000-0000-000000000005', product_id: 'a0000001-0000-0000-0000-000000000005', url: '/images/products/abrigo-heritage-2.jpg', type: 'image', format: 'jpg', alt_text: 'Abrigo Heritage detalle' },
      { id: 'd0000001-0000-0000-0000-000000000006', product_id: 'a0000001-0000-0000-0000-000000000005', url: '/videos/products/abrigo-heritage.mp4', type: 'video', format: 'mp4', alt_text: 'Abrigo Heritage video 360' },
    ]);

    // ─── Client Notes ────────────────────────────────────────────
    await queryInterface.bulkInsert('client_notes', [
      { client_id: 'c0000001-0000-0000-0000-000000000001', user_id: '00000001-0000-0000-0000-000000000001', content: 'Cliente solicita muestras de tela para la nueva colección antes de realizar pedido grande.' },
      { client_id: 'c0000001-0000-0000-0000-000000000003', user_id: '00000001-0000-0000-0000-000000000002', content: 'VIP — Ofrecer descuento por volumen en próxima cotización. Historial de pagos impecable.' },
    ]);

    // ─── Client Payment Methods ──────────────────────────────────
    await queryInterface.bulkInsert('client_payment_methods', [
      { client_id: 'c0000001-0000-0000-0000-000000000001', brand: 'Visa', last4: '4532', exp_month: 8, exp_year: 2026, is_default: true },
      { client_id: 'c0000001-0000-0000-0000-000000000003', brand: 'Mastercard', last4: '8910', exp_month: 3, exp_year: 2027, is_default: true },
      { client_id: 'c0000001-0000-0000-0000-000000000004', brand: 'Amex', last4: '1005', exp_month: 11, exp_year: 2025, is_default: true },
    ]);

    // ─── Order Documents ─────────────────────────────────────────
    await queryInterface.bulkInsert('order_documents', [
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'invoice', name: 'INV-2024-0892.pdf', url: '/docs/invoices/INV-2024-0892.pdf' },
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'packing_list', name: 'PL-2024-0892.pdf', url: '/docs/packing/PL-2024-0892.pdf' },
      { order_id: 'd0000001-0000-0000-0000-000000000003', type: 'invoice', name: 'INV-2024-0890.pdf', url: '/docs/invoices/INV-2024-0890.pdf' },
      { order_id: 'd0000001-0000-0000-0000-000000000004', type: 'invoice', name: 'INV-2024-0889.pdf', url: '/docs/invoices/INV-2024-0889.pdf' },
    ]);

    // ─── Transaction Refunds ─────────────────────────────────────
    await queryInterface.bulkInsert('transaction_refunds', [
      { transaction_id: 'a0000001-0000-0000-0000-000000000001', amount: 425, reason: 'Devolución parcial por retraso en entrega', created_by: '00000001-0000-0000-0000-000000000001' },
    ]);

    // ─── Stock Movements ─────────────────────────────────────────
    await queryInterface.bulkInsert('stock_movements', [
      { movement_number: 'MOV-2024-001', product_id: 'a0000001-0000-0000-0000-000000000001', warehouse_id: 1, type: 'receipt', quantity: 500, balance: 500, reason: 'Recepción inicial de inventario', person_id: '00000001-0000-0000-0000-000000000001' },
      { movement_number: 'MOV-2024-002', product_id: 'a0000001-0000-0000-0000-000000000001', warehouse_id: 1, type: 'issue', quantity: -72, balance: 428, reason: 'Despacho parcial pedido ORD-2024-0892', person_id: '00000001-0000-0000-0000-000000000001' },
      { movement_number: 'MOV-2024-003', product_id: 'a0000001-0000-0000-0000-000000000004', warehouse_id: 2, type: 'receipt', quantity: 30, balance: 30, reason: 'Recepción de producción mensual', person_id: '00000001-0000-0000-0000-000000000002' },
      { movement_number: 'MOV-2024-004', product_id: 'a0000001-0000-0000-0000-000000000004', warehouse_id: 2, type: 'adjustment', quantity: -5, balance: 25, reason: 'Ajuste por control de calidad — prenda con defecto menor', person_id: '00000001-0000-0000-0000-000000000002' },
      { movement_number: 'MOV-2024-005', product_id: 'a0000001-0000-0000-0000-000000000005', warehouse_id: 1, type: 'receipt', quantity: 20, balance: 20, reason: 'Nuevo ingreso de Abrigo Heritage', person_id: '00000001-0000-0000-0000-000000000001' },
    ]);

    // ─── Warehouse Transfers ─────────────────────────────────────
    await queryInterface.bulkInsert('warehouse_transfers', [
      { id: 'e0000001-0000-0000-0000-000000000001', transfer_number: 'TRF-2024-001', origin_warehouse_id: 2, destination_warehouse_id: 1, status: 'completed', responsible_id: '00000001-0000-0000-0000-000000000001', notes: 'Traslado de producción Cusco → Lima' },
      { id: 'e0000001-0000-0000-0000-000000000002', transfer_number: 'TRF-2024-002', origin_warehouse_id: 3, destination_warehouse_id: 1, status: 'in_transit', responsible_id: '00000001-0000-0000-0000-000000000002', notes: 'Traslado de tintorería Arequipa → Lima' },
    ]);
    await queryInterface.bulkInsert('warehouse_transfer_items', [
      { transfer_id: 'e0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000003', quantity: 50 },
      { transfer_id: 'e0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000004', quantity: 10 },
      { transfer_id: 'e0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000006', quantity: 100 },
    ]);

    // ─── Shipment Events ─────────────────────────────────────────
    await queryInterface.bulkInsert('shipment_events', [
      { shipment_id: 'b0000001-0000-0000-0000-000000000001', status: 'picked_up', location: 'Lima, PE', description: 'Paquete recogido en almacén Lima', timestamp: new Date(Date.now() - 86400000 * 3) },
      { shipment_id: 'b0000001-0000-0000-0000-000000000001', status: 'in_transit', location: 'Miami, US', description: 'Paquete en centro de clasificación internacional', timestamp: new Date(Date.now() - 86400000 * 2) },
      { shipment_id: 'b0000001-0000-0000-0000-000000000001', status: 'customs', location: 'Paris, FR', description: 'Paquete en aduana francesa', timestamp: new Date(Date.now() - 86400000) },
      { shipment_id: 'b0000001-0000-0000-0000-000000000002', status: 'delivered', location: 'New York, US', description: 'Paquete entregado — firmado por J. Mitchell', timestamp: new Date(Date.now() - 86400000 * 8) },
      { shipment_id: 'b0000001-0000-0000-0000-000000000003', status: 'delivered', location: 'Lima, PE', description: 'Paquete entregado — firmado por recepción', timestamp: new Date(Date.now() - 86400000 * 11) },
    ]);

    // ─── Coupons ─────────────────────────────────────────────────
    await queryInterface.bulkInsert('coupons', [
      { code: 'ALPA10', type: 'percentage', value: 10, min_purchase: 200, max_uses: 100, used_count: 23, active: true, expires_at: new Date('2026-12-31') },
      { code: 'ALPA50', type: 'fixed', value: 50, min_purchase: 500, max_uses: 50, used_count: 7, active: true, expires_at: new Date('2026-12-31') },
      { code: 'VIP250', type: 'fixed', value: 250, min_purchase: 1000, max_uses: 20, used_count: 12, active: true, expires_at: new Date('2026-10-31') },
      { code: 'BIENVENIDO', type: 'percentage', value: 15, min_purchase: 100, max_uses: 500, used_count: 145, active: true, expires_at: new Date('2026-12-31') },
      { code: 'WINTERVIP', type: 'percentage', value: 25, min_purchase: 800, max_uses: 10, used_count: 10, active: false, expires_at: new Date('2025-09-30') },
    ]);

    // ─── Promotions ──────────────────────────────────────────────
    await queryInterface.bulkInsert('promotions', [
      { name: 'Descuento Colección Invierno', type: 'percentage', discount_value: 20, applies_to: 'collection', starts_at: new Date('2025-06-01'), ends_at: new Date('2025-09-30'), active: true },
      { name: '2x1 en Accesorios', type: 'bogo', discount_value: 100, applies_to: 'category', category_id: 6, starts_at: new Date('2025-07-01'), ends_at: new Date('2025-08-31'), active: true },
      { name: 'Envío Gratis > $200', type: 'fixed', discount_value: 25, applies_to: 'order', starts_at: new Date('2025-01-01'), ends_at: new Date('2026-12-31'), active: true },
    ]);

    // ─── Newsletter Subscribers ──────────────────────────────────
    await queryInterface.bulkInsert('newsletter_subscribers', [
      { email: 'newsletter@alpacart.com', source: 'footer', active: true },
      { email: 'camila.g@email.com', source: 'checkout', active: true },
      { email: 'james.m@email.com', source: 'checkout', active: true },
      { email: 'bounced@invalid.com', source: 'footer', active: false },
    ]);

    // ─── Contact Inquiries ───────────────────────────────────────
    await queryInterface.bulkInsert('contact_inquiries', [
      { name: 'Pedro Castillo', email: 'pedro.c@example.com', subject: 'Consulta sobre pedido mayorista', message: 'Hola, me gustaría recibir información sobre precios al por mayor para la temporada Primavera 2025. Gracias.', status: 'pending' },
      { name: 'Laura Méndez', email: 'laura.m@example.com', subject: 'Cambio de talla', message: 'Recibí mi pedido pero la talla M me queda grande. ¿Cómo puedo gestionar un cambio por talla S?', status: 'replied' },
      { name: 'Thomas Weber', email: 'thomas.w@example.de', subject: 'International Shipping', message: 'I would like to order several ponchos for my store in Munich. Do you offer wholesale pricing for international customers?', status: 'pending' },
    ]);

    // ─── Sessions (staff) ────────────────────────────────────────
    await queryInterface.bulkInsert('sessions', [
      { id: 'f0000001-0000-0000-0000-000000000001', user_id: '00000001-0000-0000-0000-000000000001', actor_type: 'user', refresh_token: 'rt_mock_001_' + require('crypto').randomUUID(), device_name: 'MacBook Pro 16', platform: 'macOS', browser: 'Chrome 120', ip_address: '192.168.1.45', last_activity_at: new Date(), expires_at: new Date(Date.now() + 86400000 * 7) },
      { id: 'f0000001-0000-0000-0000-000000000002', user_id: '00000001-0000-0000-0000-000000000002', actor_type: 'user', refresh_token: 'rt_mock_002_' + require('crypto').randomUUID(), device_name: 'Windows PC', platform: 'Windows 11', browser: 'Firefox 121', ip_address: '10.0.0.22', last_activity_at: new Date(), expires_at: new Date(Date.now() + 86400000 * 7) },
      { id: 'f0000001-0000-0000-0000-000000000003', user_id: '00000001-0000-0000-0000-000000000005', actor_type: 'user', refresh_token: 'rt_mock_003_' + require('crypto').randomUUID(), device_name: 'iPhone 15', platform: 'iOS 17', browser: 'Safari', ip_address: '192.168.1.100', last_activity_at: new Date(), expires_at: new Date(Date.now() + 86400000 * 30) },
    ]);

    // ─── Sessions (customers) ────────────────────────────────────
    await queryInterface.bulkInsert('sessions', [
      { id: 'f0000001-0000-0000-0000-000000000004', customer_id: 'b0000001-0000-0000-0000-000000000001', actor_type: 'customer', refresh_token: 'rt_mock_004_' + require('crypto').randomUUID(), device_name: 'Samsung Galaxy S24', platform: 'Android 14', browser: 'Chrome Mobile', ip_address: '190.42.100.55', last_activity_at: new Date(), expires_at: new Date(Date.now() + 86400000 * 7) },
      { id: 'f0000001-0000-0000-0000-000000000005', customer_id: 'b0000001-0000-0000-0000-000000000002', actor_type: 'customer', refresh_token: 'rt_mock_005_' + require('crypto').randomUUID(), device_name: 'iPad Air', platform: 'iPadOS 17', browser: 'Safari', ip_address: '74.125.200.100', last_activity_at: new Date(), expires_at: new Date(Date.now() + 86400000 * 30) },
    ]);

    // ─── Password Resets ─────────────────────────────────────────
    await queryInterface.bulkInsert('password_resets', [
      { email: 'r.paredes@alpacart.com', token: 'pr_mock_' + require('crypto').randomUUID(), actor_type: 'user', expires_at: new Date(Date.now() - 86400000) },
      { email: 'camila.g@email.com', token: 'pr_mock_' + require('crypto').randomUUID(), actor_type: 'customer', expires_at: new Date(Date.now() + 3600000) },
    ]);

    // ─── Hero Slides ─────────────────────────────────────────────
    await queryInterface.bulkInsert('hero_slides', [
      { title: 'Lujo Ancestral, Diseño Contemporáneo', subtitle: 'Descubre nuestra colección Otoño-Invierno 2025 tejida con fibras nobles de los Andes', cta_text: 'Explorar Colección', cta_link: '/collections/winter-25', image: '/images/hero/winter-25-main.jpg', order: 1 },
      { title: 'La Suavidad de la Vicuña', subtitle: 'La fibra más fina del mundo, ahora disponible en edición limitada', cta_text: 'Ver Productos', cta_link: '/category/vicuna', image: '/images/hero/vicuna-collection.jpg', order: 2 },
      { title: 'Hecho a Mano con Propósito', subtitle: 'Cada prenda cuenta una historia de tradición y artesanía peruana', cta_text: 'Conoce Más', cta_link: '/artisan-process', image: '/images/hero/artisan-story.jpg', order: 3 },
    ]);

    // ─── Gallery Images ──────────────────────────────────────────
    await queryInterface.bulkInsert('gallery_images', [
      { url: '/images/gallery/tejedora-cusco.jpg', alt_text: 'Tejedora artesanal en Cusco', caption: 'Tejedora en el Valle Sagrado', category: 'artisan', order: 1 },
      { url: '/images/gallery/alpacas-huacaya.jpg', alt_text: 'Alpacas Huacaya en pastizal', caption: 'Alpacas Huacaya en los Andes', category: 'process', order: 2 },
      { url: '/images/gallery/telar-andino.jpg', alt_text: 'Telar andino tradicional', caption: 'Telar andino tradicional', category: 'artisan', order: 3 },
      { url: '/images/gallery/showroom-lima.jpg', alt_text: 'Showroom Alpacart en Lima', caption: 'Showroom Lima — Miraflores', category: 'showroom', order: 4 },
      { url: '/images/gallery/cardado-manual.jpg', alt_text: 'Cardado manual de fibra', caption: 'Cardado manual de fibra de alpaca', category: 'process', order: 5 },
    ]);

    // ─── Testimonials ────────────────────────────────────────────
    await queryInterface.bulkInsert('testimonials', [
      { author: 'Isabella R.', role: 'Diseñadora de Moda', company: 'Isabella R. Studio', text: 'La calidad de las prendas Alpacart transformó mi percepción de la fibra de alpaca. El Abrigo Heritage es una obra maestra que recibe elogios dondequiera que lo uso.', rating: 5, featured: true, order: 1 },
      { author: 'Marcus W.', role: 'CEO', company: 'Luxury Retail GmbH', text: 'Como comprador para una cadena europea de lujo, Alpacart es nuestro proveedor preferido de alpaca. Consistencia, calidad y trazabilidad excepcionales.', rating: 5, featured: true, order: 2 },
      { author: 'Camila G.', role: 'Cliente Premium', text: 'La bufanda de vicuña que compré es la prenda más suave que he tenido. El servicio al cliente fue impecable, y el empaque refleja el lujo de la marca.', rating: 5, featured: false, order: 3 },
      { author: 'Jean-Pierre L.', role: 'Boutique Owner', company: 'Maison de Laine', text: 'Trabajar con Alpacart ha sido un placer. Sus colecciones estacionales traen frescura al mercado europeo y la relación calidad-precio es inmejorable.', rating: 4, featured: false, order: 4 },
    ]);

    // ─── Benefits ────────────────────────────────────────────────
    await queryInterface.bulkInsert('benefits', [
      { title: 'Fibra Premium', description: 'Seleccionamos las mejores fibras de alpaca, vicuña y lana de oveja de los Andes peruanos, garantizando suavidad, calidez y durabilidad excepcionales.', icon: 'eco', order: 1 },
      { title: 'Trazabilidad Total', description: 'Cada prenda incluye un código de trazabilidad que te permite conocer el origen de la fibra, el artesano que la tejió y el impacto social de tu compra.', icon: 'assignment', order: 2 },
      { title: 'Artesanía Ancestral', description: 'Colaboramos con cooperativas de tejedoras en Cusco, Puno y Arequipa, preservando técnicas textiles transmitidas por generaciones.', icon: 'groups', order: 3 },
      { title: 'Envío Global', description: 'Entregamos a más de 50 países con DHL Express. Empaque sostenible y carbono neutral certificado.', icon: 'public', order: 4 },
      { title: 'Garantía de Calidad', description: 'Todos nuestros productos pasan por rigurosos controles de calidad. Si no estás satisfecho, aceptamos devoluciones dentro de los 30 días.', icon: 'verified', order: 5 },
    ]);

    // ─── Artisan Processes ───────────────────────────────────────
    await queryInterface.bulkInsert('artisan_processes', [
      { title: 'Esquila', description: 'La fibra se recolecta manualmente durante la temporada de esquila, seleccionando solo las hebras más finas y largas.', icon: 'content_cut', image: '/images/process/shearing.jpg', step_order: 1 },
      { title: 'Clasificación', description: 'Cada mecha se clasifica por grosor, longitud y color. La fibra Baby Alpaca (&lt;23 micras) se separa para nuestras colecciones premium.', icon: 'sort', image: '/images/process/classification.jpg', step_order: 2 },
      { title: 'Lavado y Cardado', description: 'La fibra se lava con aguas de manantial y jabones neutros, luego se carda para alinear las hebras antes del hilado.', icon: 'water_drop', image: '/images/process/washing.jpg', step_order: 3 },
      { title: 'Hilado', description: 'El hilado artesanal en huso o rueca produce hilos de torsión perfecta, mientras que el hilado industrial garantiza consistencia para colecciones más grandes.', icon: 'rotate_right', image: '/images/process/spinning.jpg', step_order: 4 },
      { title: 'Teñido', description: 'Usamos tintes naturales (cochinilla, índigo, nogal) y certificados Oeko-Tex para lograr colores profundos y duraderos.', icon: 'palette', image: '/images/process/dyeing.jpg', step_order: 5 },
      { title: 'Tejido', description: 'En telares manuales e industriales, nuestros artesanos transforman el hilo en prendas siguiendo diseños contemporáneos y técnicas ancestrales.', icon: 'grid_view', image: '/images/process/weaving.jpg', step_order: 6 },
      { title: 'Control de Calidad', description: 'Cada prenda se inspecciona individualmente, verificando costuras, acabados y talla antes de recibir la etiqueta Alpacart.', icon: 'fact_check', image: '/images/process/quality.jpg', step_order: 7 },
      { title: 'Empaque y Envío', description: 'Empacamos cada prenda en materiales sostenibles con certificación FSC, lista para viajar a cualquier lugar del mundo.', icon: 'inventory_2', image: '/images/process/packaging.jpg', step_order: 8 },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('artisan_processes', null, {});
    await queryInterface.bulkDelete('benefits', null, {});
    await queryInterface.bulkDelete('testimonials', null, {});
    await queryInterface.bulkDelete('gallery_images', null, {});
    await queryInterface.bulkDelete('hero_slides', null, {});
    await queryInterface.bulkDelete('password_resets', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('contact_inquiries', null, {});
    await queryInterface.bulkDelete('newsletter_subscribers', null, {});
    await queryInterface.bulkDelete('promotions', null, {});
    await queryInterface.bulkDelete('coupons', null, {});
    await queryInterface.bulkDelete('shipment_events', null, {});
    await queryInterface.bulkDelete('warehouse_transfer_items', null, {});
    await queryInterface.bulkDelete('warehouse_transfers', null, {});
    await queryInterface.bulkDelete('stock_movements', null, {});
    await queryInterface.bulkDelete('transaction_refunds', null, {});
    await queryInterface.bulkDelete('order_documents', null, {});
    await queryInterface.bulkDelete('client_payment_methods', null, {});
    await queryInterface.bulkDelete('client_notes', null, {});
    await queryInterface.bulkDelete('product_media', null, {});
    await queryInterface.bulkDelete('cart_items', null, {});
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.bulkDelete('wishlist_items', null, {});
    await queryInterface.bulkDelete('customer_addresses', null, {});
    await queryInterface.bulkDelete('customers', null, {});
  },
};
