'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Warehouses
    await queryInterface.bulkInsert('warehouses', [
      { name: 'Lima (Sede Central)', code: 'LIM', city: 'Lima', type: 'principal' },
      { name: 'Cusco (Hilados)', code: 'CUZ', city: 'Cusco', type: 'production' },
      { name: 'Arequipa (Tintorería)', code: 'AQP', city: 'Arequipa', type: 'secondary' },
      { name: 'Puno (Acopio)', code: 'PUN', city: 'Puno', type: 'secondary' },
    ]);

    // Carriers
    await queryInterface.bulkInsert('carriers', [
      { name: 'DHL Express', code: 'DHL', active: true },
      { name: 'FedEx International', code: 'FEDEX', active: true },
      { name: 'Olva Courier', code: 'OLVA', active: true },
    ]);

    // Stock Items
    await queryInterface.bulkInsert('stock_items', [
      { product_id: 'a0000001-0000-0000-0000-000000000001', warehouse_id: 1, quantity: 428, min_stock: 50, max_stock: 600 },
      { product_id: 'a0000001-0000-0000-0000-000000000002', warehouse_id: 1, quantity: 50, min_stock: 20, max_stock: 100 },
      { product_id: 'a0000001-0000-0000-0000-000000000003', warehouse_id: 2, quantity: 120, min_stock: 30, max_stock: 200 },
      { product_id: 'a0000001-0000-0000-0000-000000000004', warehouse_id: 2, quantity: 25, min_stock: 10, max_stock: 50 },
      { product_id: 'a0000001-0000-0000-0000-000000000005', warehouse_id: 1, quantity: 15, min_stock: 5, max_stock: 30 },
      { product_id: 'a0000001-0000-0000-0000-000000000006', warehouse_id: 3, quantity: 200, min_stock: 50, max_stock: 300 },
    ]);

    // Admin user needed by campaigns FK (must exist before campaigns)
    await queryInterface.bulkInsert('users', [
      { id: '00000001-0000-0000-0000-000000000001', name: 'Mateo Quispe', email: 'mateo.q@alpacart.com', password: '$2b$10$placeholder', phone: '+51 999 888 777', employee_id: 'ALP-001', position: 'Supervisor de Planta', role_id: 1, department_id: 1, status: 'active', force_password_change: false },
    ]);

    // Campaigns
    const adminId = '00000001-0000-0000-0000-000000000001';
    await queryInterface.bulkInsert('campaigns', [
      { id: 'e0000001-0000-0000-0000-000000000001', name: 'Lanzamiento Invierno \'24', type: 'seasonal', channel: 'EMAIL + WEB', budget: 12400, spent: 8400, roi: '4.2x', conversions: 248, status: 'active', created_by: adminId },
      { id: 'e0000001-0000-0000-0000-000000000002', name: 'Campaña de Retención', type: 'recurring', channel: 'SOCIAL ADS', budget: 6500, spent: 3200, roi: '2.8x', conversions: 156, status: 'active', created_by: adminId },
      { id: 'e0000001-0000-0000-0000-000000000003', name: 'Lanzamiento Colección Primavera', type: 'seasonal', channel: 'EMAIL + WEB', budget: 8900, spent: 2100, roi: '1.5x', conversions: 42, status: 'scheduled', created_by: adminId },
      { id: 'e0000001-0000-0000-0000-000000000004', name: 'Reactivación Outonoño', type: 'promotional', channel: 'AUTOMATIZACIÓN', budget: 3200, spent: 3200, roi: '1.1x', conversions: 28, status: 'finished', created_by: adminId },
      { id: 'e0000001-0000-0000-0000-000000000005', name: 'Black Friday Textil', type: 'promotional', channel: 'SOCIAL ADS', budget: 15000, spent: 0, roi: '—', conversions: 0, status: 'draft', created_by: adminId },
    ]);

    // Contents (CMS)
    await queryInterface.bulkInsert('contents', [
      { id: 'f0000001-0000-0000-0000-000000000001', title: 'Winter Alpaca Essentials 2024', slug: '/collections/winter-24', type: 'collection', status: 'published', published_at: new Date() },
      { id: 'f0000001-0000-0000-0000-000000000002', title: 'Historia de la Fibra de Alpaca', slug: '/blog/alpaca-fiber-history', type: 'blog', status: 'published', published_at: new Date() },
      { id: 'f0000001-0000-0000-0000-000000000003', title: 'Cuidado de Prendas Premium', slug: '/care/premium-garments', type: 'page', status: 'published', published_at: new Date() },
      { id: 'f0000001-0000-0000-0000-000000000004', title: 'Banner Inicio Invierno 2024', slug: '/banners/winter-24-home', type: 'banner', status: 'published', published_at: new Date() },
      { id: 'f0000001-0000-0000-0000-000000000005', title: 'Promoción Lanzamiento Colección', slug: '/promos/collection-launch', type: 'promo', status: 'scheduled' },
      { id: 'f0000001-0000-0000-0000-000000000006', title: 'Guía de Tallas de Alpaca', slug: '/faq/sizing-guide', type: 'faq', status: 'draft' },
      { id: 'f0000001-0000-0000-0000-000000000007', title: 'Sobre Nosotros', slug: '/about', type: 'page', status: 'draft' },
    ]);

    // FAQ
    await queryInterface.bulkInsert('faq_categories', [
      { name: 'Productos', slug: 'productos', icon: 'checkroom', order: 1 },
      { name: 'Materiales & Cuidado', slug: 'materiales', icon: 'wash', order: 2 },
      { name: 'Envíos & Rastreo', slug: 'envios', icon: 'local_shipping', order: 3 },
      { name: 'Cambios, Devoluciones & Garantía', slug: 'cambios', icon: 'replay', order: 4 },
    ]);

    await queryInterface.bulkInsert('faq_items', [
      { category_id: 1, question: '¿Cómo debo elegir mi talla?', answer: 'Recomendamos seguir nuestra guía de tallas disponible en cada producto. Si tienes dudas, nuestro equipo de atención puede ayudarte.', order: 1 },
      { category_id: 1, question: '¿Las prendas son ediciones limitadas?', answer: 'Algunas colecciones especiales tienen tirajes limitados. Cada producto indica si es de edición limitada.', order: 2 },
      { category_id: 1, question: '¿Puedo personalizar una prenda?', answer: 'Sí, ofrecemos personalización para pedidos corporativos y mayoristas. Contáctanos para más información.', order: 3 },
      { category_id: 2, question: '¿Cómo debo lavar mi prenda Alpacart?', answer: 'Recomendamos lavado a mano con agua fría y jabón neutro. No retorcer, secar en superficie plana a la sombra.', order: 1 },
      { category_id: 2, question: '¿Qué diferencia hay entre Baby Alpaca y Alpaca?', answer: 'La Baby Alpaca es más fina y suave, proveniente de la primera esquila. Es ideal para prendas en contacto directo con la piel.', order: 2 },
      { category_id: 2, question: '¿Cómo almacenar prendas de alpaca?', answer: 'Guarda en un lugar seco y fresco. Usa bolsas de tela transpirables, no de plástico. Añade bloques de cedro para proteger.', order: 3 },
      { category_id: 3, question: '¿Hacen envíos internacionales?', answer: 'Sí, realizamos envíos a más de 50 países a través de DHL y FedEx. Los tiempos de entrega varían entre 5 y 12 días hábiles.', order: 1 },
      { category_id: 3, question: '¿Cómo rastreo mi pedido?', answer: 'Recibirás un número de seguimiento por correo electrónico una vez que el pedido sea despachado.', order: 2 },
      { category_id: 3, question: '¿El envío tiene costo?', answer: 'Ofrecemos envío gratuito para pedidos mayores a $200 USD.', order: 3 },
      { category_id: 4, question: '¿Cuál es la política de devoluciones?', answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido. Las prendas deben estar sin usar y con sus etiquetas originales.', order: 1 },
      { category_id: 4, question: '¿Cómo gestionar un cambio de talla?', answer: 'Contáctanos dentro de los primeros 7 días de recibido el pedido. Gestionamos el cambio sin costo adicional.', order: 2 },
      { category_id: 4, question: '¿Las prendas tienen garantía?', answer: 'Todos los productos ALPACART cuentan con garantía de 6 meses contra defectos de fabricación.', order: 3 },
    ]);

    // Company Settings
    await queryInterface.bulkInsert('company_settings', [
      { legal_name: 'Alpacart Textiles S.A.C.', tax_id: '20601234567', industry: 'Textil - Confecciones', email: 'info@alpacart.com', phone: '+51 84 123 456', address: 'Av. El Sol 123, Cusco, Perú', primary_currency: 'PEN', default_timezone: 'America/Lima', system_language: 'es' },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('company_settings', null, {});
    await queryInterface.bulkDelete('faq_items', null, {});
    await queryInterface.bulkDelete('faq_categories', null, {});
    await queryInterface.bulkDelete('contents', null, {});
    await queryInterface.bulkDelete('campaigns', null, {});
    await queryInterface.bulkDelete('stock_items', null, {});
    await queryInterface.bulkDelete('carriers', null, {});
    await queryInterface.bulkDelete('warehouses', null, {});
  },
};
