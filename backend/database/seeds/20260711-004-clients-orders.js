'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clients (B2B)
    await queryInterface.bulkInsert('clients', [
      { id: 'c0000001-0000-0000-0000-000000000001', name: 'Andean Textiles Ltd.', company: 'Exportaciones Peruanas S.A.C.', email: 'contacto@andeantextiles.pe', phone: '+51 984 123 456', document_type: 'ruc', document_number: '20123456789', type: 'wholesale', status: 'active', payment_terms: 'Net 30' },
      { id: 'c0000001-0000-0000-0000-000000000002', name: 'Boutique Textiles Lima', company: 'Boutique Textiles E.I.R.L.', email: 'ventas@boutiquetextiles.pe', phone: '+51 999 888 777', document_type: 'ruc', document_number: '20987654321', type: 'retail', status: 'active' },
      { id: 'c0000001-0000-0000-0000-000000000003', name: 'Sartorial Design NY', company: 'Sartorial Design Inc.', email: 'info@sartorialdesign.com', phone: '+1 (212) 555-0198', document_type: 'passport', document_number: 'USA-123456', type: 'wholesale', status: 'vip', payment_terms: 'Net 15' },
      { id: 'c0000001-0000-0000-0000-000000000004', name: 'Luxe Modas Paris', company: 'Luxe Modas S.A.S.', email: 'contact@luxemodas.fr', phone: '+33 1 23 45 67 89', document_type: 'passport', document_number: 'FR-789012', type: 'corporate', status: 'active', payment_terms: 'Net 30' },
      { id: 'c0000001-0000-0000-0000-000000000005', name: 'Karl Völler Knitwear', company: 'Karl Völler GmbH', email: 'order@karlvoeller.de', phone: '+49 30 1234 5678', document_type: 'passport', document_number: 'DE-345678', type: 'wholesale', status: 'active', payment_terms: 'Net 45' },
    ]);

    // Orders
    const now = new Date();
    await queryInterface.bulkInsert('orders', [
      { id: 'd0000001-0000-0000-0000-000000000001', order_number: 'ORD-2024-0892', client_id: 'c0000001-0000-0000-0000-000000000004', status: 'shipped', channel: 'showroom', agent: 'Elena Rodriguez', subtotal: 4250, total: 4250, paid: true, paid_at: new Date(now.getTime() - 86400000 * 2), placed_at: new Date(now.getTime() - 86400000 * 5) },
      { id: 'd0000001-0000-0000-0000-000000000002', order_number: 'ORD-2024-0891', client_id: 'c0000001-0000-0000-0000-000000000002', status: 'confirmed', channel: 'online', agent: 'Carlos Mendoza', subtotal: 1840.50, total: 1840.50, paid: true, paid_at: new Date(now.getTime() - 86400000), placed_at: new Date(now.getTime() - 86400000 * 3) },
      { id: 'd0000001-0000-0000-0000-000000000003', order_number: 'ORD-2024-0890', client_id: 'c0000001-0000-0000-0000-000000000003', status: 'delivered', channel: 'wholesale', agent: 'Elena Rodriguez', subtotal: 12400, total: 12400, paid: true, paid_at: new Date(now.getTime() - 86400000 * 7), placed_at: new Date(now.getTime() - 86400000 * 14) },
      { id: 'd0000001-0000-0000-0000-000000000004', order_number: 'ORD-2024-0889', client_id: 'c0000001-0000-0000-0000-000000000001', status: 'delivered', channel: 'online', agent: 'Carlos Mendoza', subtotal: 3100, total: 3100, paid: true, paid_at: new Date(now.getTime() - 86400000 * 10), placed_at: new Date(now.getTime() - 86400000 * 20) },
      { id: 'd0000001-0000-0000-0000-000000000005', order_number: 'ORD-2024-0888', client_id: 'c0000001-0000-0000-0000-000000000005', status: 'confirmed', channel: 'wholesale', agent: 'Elena Rodriguez', subtotal: 890, total: 890, paid: true, paid_at: new Date(now.getTime() - 86400000 * 3), placed_at: new Date(now.getTime() - 86400000 * 4) },
      { id: 'd0000001-0000-0000-0000-000000000006', order_number: 'ORD-2024-0887', client_id: 'c0000001-0000-0000-0000-000000000002', status: 'pending', channel: 'online', agent: 'Carlos Mendoza', subtotal: 2150, total: 2150, paid: false, placed_at: new Date() },
    ]);

    // Order Items
    await queryInterface.bulkInsert('order_items', [
      { order_id: 'd0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000001', product_name: 'Manta Imperial Gold', sku: 'ALP-INV-24-001', unit_price: 450, quantity: 2, total: 900 },
      { order_id: 'd0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000004', product_name: 'Poncho Andino Bruma', sku: 'ALP-PNC-001', unit_price: 1250, quantity: 1, total: 1250 },
      { order_id: 'd0000001-0000-0000-0000-000000000001', product_id: 'a0000001-0000-0000-0000-000000000007', product_name: 'Chalina de Alpaca Real', sku: 'ALP-CHL-001', unit_price: 320, quantity: 3, total: 960 },
      { order_id: 'd0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000003', product_name: 'Chompa de Alpaca Real', sku: 'ALP-SWT-001', unit_price: 420, quantity: 2, total: 840 },
      { order_id: 'd0000001-0000-0000-0000-000000000002', product_id: 'a0000001-0000-0000-0000-000000000006', product_name: 'Gorro Montana de Alpaca', sku: 'ALP-ACC-001', unit_price: 120, quantity: 3, total: 360 },
      { order_id: 'd0000001-0000-0000-0000-000000000003', product_id: 'a0000001-0000-0000-0000-000000000005', product_name: 'Abrigo Heritage', sku: 'ALP-ABR-001', unit_price: 8450, quantity: 1, total: 8450 },
      { order_id: 'd0000001-0000-0000-0000-000000000004', product_id: 'a0000001-0000-0000-0000-000000000002', product_name: 'Bufanda de Vicuña', sku: 'ALP-INV-24-002', unit_price: 850, quantity: 2, total: 1700 },
      { order_id: 'd0000001-0000-0000-0000-000000000005', product_id: 'a0000001-0000-0000-0000-000000000006', product_name: 'Gorro Montana de Alpaca', sku: 'ALP-ACC-001', unit_price: 120, quantity: 1, total: 120 },
      { order_id: 'd0000001-0000-0000-0000-000000000006', product_id: 'a0000001-0000-0000-0000-000000000001', product_name: 'Manta Imperial Gold', sku: 'ALP-INV-24-001', unit_price: 450, quantity: 3, total: 1350 },
      { order_id: 'd0000001-0000-0000-0000-000000000006', product_id: 'a0000001-0000-0000-0000-000000000007', product_name: 'Chalina de Alpaca Real', sku: 'ALP-CHL-001', unit_price: 320, quantity: 2, total: 640 },
    ]);

    // Order Events
    await queryInterface.bulkInsert('order_events', [
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'created', title: 'Pedido Creado', description: 'Pedido registrado por Elena Rodriguez', created_at: new Date(now.getTime() - 86400000 * 5) },
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'confirmed', title: 'Pedido Confirmado', created_at: new Date(now.getTime() - 86400000 * 4) },
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'paid', title: 'Pago Recibido', created_at: new Date(now.getTime() - 86400000 * 2) },
      { order_id: 'd0000001-0000-0000-0000-000000000001', type: 'shipped', title: 'Pedido Enviado', created_at: new Date(now.getTime() - 86400000) },
      { order_id: 'd0000001-0000-0000-0000-000000000003', type: 'created', title: 'Pedido Creado', created_at: new Date(now.getTime() - 86400000 * 14) },
      { order_id: 'd0000001-0000-0000-0000-000000000003', type: 'paid', title: 'Pago Recibido', created_at: new Date(now.getTime() - 86400000 * 12) },
      { order_id: 'd0000001-0000-0000-0000-000000000003', type: 'shipped', title: 'Pedido Enviado', created_at: new Date(now.getTime() - 86400000 * 10) },
      { order_id: 'd0000001-0000-0000-0000-000000000003', type: 'delivered', title: 'Pedido Entregado', created_at: new Date(now.getTime() - 86400000 * 7) },
      { order_id: 'd0000001-0000-0000-0000-000000000004', type: 'created', title: 'Pedido Creado', created_at: new Date(now.getTime() - 86400000 * 20) },
      { order_id: 'd0000001-0000-0000-0000-000000000004', type: 'paid', title: 'Pago Recibido', created_at: new Date(now.getTime() - 86400000 * 18) },
      { order_id: 'd0000001-0000-0000-0000-000000000004', type: 'shipped', title: 'Pedido Enviado', created_at: new Date(now.getTime() - 86400000 * 15) },
      { order_id: 'd0000001-0000-0000-0000-000000000004', type: 'delivered', title: 'Pedido Entregado', created_at: new Date(now.getTime() - 86400000 * 10) },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('order_events', null, {});
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('clients', null, {});
  },
};
