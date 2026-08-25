'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash('Admin123!', 10);

    // Users (staff) — Mateo already created in seed 005, update password
    await queryInterface.bulkInsert('users', [
      { id: '00000001-0000-0000-0000-000000000002', name: 'Sofía Mendoza', email: 'sofia.m@alpacart.com', password: hash, phone: '+51 999 888 778', employee_id: 'ALP-002', position: 'Coordinadora Logística', role_id: 1, department_id: 2, status: 'active' },
      { id: '00000001-0000-0000-0000-000000000003', name: 'Carlos Huamán', email: 'carlos.h@alpacart.com', password: hash, phone: '+51 999 888 779', employee_id: 'ALP-003', position: 'Ejecutivo de Ventas', role_id: 3, department_id: 3, status: 'suspended' },
      { id: '00000001-0000-0000-0000-000000000004', name: 'Elena Arrieta', email: 'elena.a@alpacart.com', password: hash, phone: '+51 999 888 780', employee_id: 'ALP-004', position: 'Editora de Contenido', role_id: 1, department_id: 5, status: 'inactive' },
      { id: '00000001-0000-0000-0000-000000000005', name: 'Roberto Paredes', email: 'r.paredes@alpacart.com', password: hash, phone: '+51 999 888 781', employee_id: 'ALP-005', position: 'Analista Financiero', role_id: 3, department_id: 3, status: 'active' },
    ]);
    // Update Mateo's password to the real hash
    await queryInterface.sequelize.query("UPDATE users SET password = '" + hash + "' WHERE id = '00000001-0000-0000-0000-000000000001'");

    // Role-Permission relationships
    await queryInterface.bulkInsert('role_permissions', [
      // Super Admin gets ALL permissions
      { role_id: 1, permission_id: 1 }, { role_id: 1, permission_id: 2 }, { role_id: 1, permission_id: 3 },
      { role_id: 1, permission_id: 4 }, { role_id: 1, permission_id: 5 }, { role_id: 1, permission_id: 6 }, { role_id: 1, permission_id: 7 },
      // Production Manager gets inventory + orders
      { role_id: 2, permission_id: 1 }, { role_id: 2, permission_id: 3 },
      // Financial Analyst gets audit only
      { role_id: 3, permission_id: 7 },
      // External Consultant gets view-only
      { role_id: 4, permission_id: 1 },
    ]);

    // Tags
    await queryInterface.bulkInsert('tags', [
      { name: 'Premium' }, { name: 'Edición Limitada' }, { name: 'Nuevo' }, { name: 'Más Vendido' },
      { name: 'Hecho a Mano' }, { name: 'Sostenible' }, { name: 'Lujo' }, { name: 'Trazable' },
    ]);

    // Product Tags
    await queryInterface.bulkInsert('product_tags', [
      { product_id: 'a0000001-0000-0000-0000-000000000001', tag_id: 1 },
      { product_id: 'a0000001-0000-0000-0000-000000000001', tag_id: 4 },
      { product_id: 'a0000001-0000-0000-0000-000000000002', tag_id: 1 },
      { product_id: 'a0000001-0000-0000-0000-000000000002', tag_id: 2 },
      { product_id: 'a0000001-0000-0000-0000-000000000004', tag_id: 5 },
      { product_id: 'a0000001-0000-0000-0000-000000000005', tag_id: 1 },
      { product_id: 'a0000001-0000-0000-0000-000000000005', tag_id: 2 },
      { product_id: 'a0000001-0000-0000-0000-000000000008', tag_id: 6 },
    ]);

    // Client Addresses
    await queryInterface.bulkInsert('client_addresses', [
      { client_id: 'c0000001-0000-0000-0000-000000000001', type: 'principal', street: 'Av. Principal 123', city: 'Lima', country: 'Perú', is_default: true },
      { client_id: 'c0000001-0000-0000-0000-000000000001', type: 'billing', street: 'Jr. Comercio 456', city: 'Lima', country: 'Perú' },
      { client_id: 'c0000001-0000-0000-0000-000000000004', type: 'principal', street: '45 Rue de la Paix', city: 'Paris', country: 'Francia', is_default: true },
    ]);

    // Reviews
    await queryInterface.bulkInsert('reviews', [
      { product_id: 'a0000001-0000-0000-0000-000000000005', author: 'Julian V., Ginebra', rating: 5, text: 'El Abrigo Heritage es más que un abrigo; es una experiencia sensorial. La suavidad y calidez son verdaderamente notables.', tag: 'Compra verificada' },
      { product_id: 'a0000001-0000-0000-0000-000000000002', author: 'Alexander K., New York', rating: 5, text: 'Rara vez un producto supera las expectativas. Esta bufanda de vicuña es impresionante con luz natural.', tag: 'Compra verificada' },
    ]);

    // Transactions
    await queryInterface.bulkInsert('transactions', [
      { id: 'a0000001-0000-0000-0000-000000000001', transaction_id: 'PAY-9921', order_id: 'd0000001-0000-0000-0000-000000000001', method: 'bank_transfer', amount: 4250, currency: 'USD', status: 'succeeded' },
      { id: 'a0000001-0000-0000-0000-000000000002', transaction_id: 'PAY-9920', order_id: 'd0000001-0000-0000-0000-000000000002', method: 'visa', amount: 1840.50, currency: 'USD', status: 'succeeded' },
      { id: 'a0000001-0000-0000-0000-000000000003', transaction_id: 'PAY-9919', order_id: 'd0000001-0000-0000-0000-000000000003', method: 'bank_transfer', amount: 12400, currency: 'USD', status: 'succeeded' },
      { id: 'a0000001-0000-0000-0000-000000000004', transaction_id: 'PAY-9918', order_id: 'd0000001-0000-0000-0000-000000000004', method: 'visa', amount: 3100, currency: 'USD', status: 'succeeded' },
      { id: 'a0000001-0000-0000-0000-000000000005', transaction_id: 'PAY-9917', order_id: 'd0000001-0000-0000-0000-000000000005', method: 'paypal', amount: 890, currency: 'USD', status: 'succeeded' },
    ]);

    // Shipments
    await queryInterface.bulkInsert('shipments', [
      { id: 'b0000001-0000-0000-0000-000000000001', waybill: 'DHL-88492-ALP', order_id: 'd0000001-0000-0000-0000-000000000001', carrier: 'DHL Express', status: 'transit', origin_city: 'Lima, PE', destination_city: 'Paris, FR' },
      { id: 'b0000001-0000-0000-0000-000000000002', waybill: 'FEDEX-77123-ALP', order_id: 'd0000001-0000-0000-0000-000000000003', carrier: 'FedEx International', status: 'delivered', origin_city: 'Cusco, PE', destination_city: 'New York, US' },
      { id: 'b0000001-0000-0000-0000-000000000003', waybill: 'OLVA-66234-ALP', order_id: 'd0000001-0000-0000-0000-000000000004', carrier: 'Olva Courier', status: 'delivered', origin_city: 'Lima, PE', destination_city: 'Lima, PE' },
    ]);

    // Audit Logs
    await queryInterface.bulkInsert('audit_logs', [
      { user_id: '00000001-0000-0000-0000-000000000001', action: 'create', module: 'iam', description: 'Creó nuevo usuario: Elena Arrieta', severity: 'success', ip_address: '192.168.1.45', device: 'Chrome / macOS' },
      { user_id: '00000001-0000-0000-0000-000000000001', action: 'update', module: 'inventory', description: 'Actualizó stock de Manta Imperial Gold (#ALP-INV-24-001): 400 → 428', severity: 'info', ip_address: '192.168.1.45', device: 'Chrome / macOS' },
      { user_id: '00000001-0000-0000-0000-000000000002', action: 'login', module: 'iam', description: 'Inicio de sesión exitoso', severity: 'success', ip_address: '10.0.0.22', device: 'Firefox / Windows' },
      { user_id: '00000001-0000-0000-0000-000000000005', action: 'update', module: 'finance', description: 'Generó reporte financiero Q3 2024', severity: 'info', ip_address: '192.168.1.100', device: 'Safari / macOS' },
      { user_id: '00000001-0000-0000-0000-000000000003', action: 'delete', module: 'catalog', description: 'Intentó eliminar producto #ALP-ACC-001 — BLOQUEADO por permisos', severity: 'warning', ip_address: '10.0.0.50', device: 'Chrome / Windows' },
      { user_id: null, action: 'login', module: 'iam', description: 'Intento de acceso fallido — usuario inexistente', severity: 'error', ip_address: '203.0.113.42', device: 'Unknown' },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('audit_logs', null, {});
    await queryInterface.bulkDelete('shipments', null, {});
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('reviews', null, {});
    await queryInterface.bulkDelete('client_addresses', null, {});
    await queryInterface.bulkDelete('product_tags', null, {});
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
