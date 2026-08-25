'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Roles
    await queryInterface.bulkInsert('roles', [
      { name: 'Super Administrador', category: 'critical', description: 'Acceso total a todos los módulos del sistema, configuraciones globales y auditoría de transacciones.', status: 'active' },
      { name: 'Gestor de Producción', category: 'operational', description: 'Gestión de órdenes de trabajo, control de calidad y asignación de maquinaria en planta.', status: 'active' },
      { name: 'Analista Financiero', category: 'administrative', description: 'Visualización de reportes de rentabilidad, costos operativos y proyecciones de ventas.', status: 'active' },
      { name: 'Consultor Temporal', category: 'external', description: 'Acceso restringido de solo lectura para auditorías externas de procesos textiles.', status: 'inactive' },
    ]);

    // Departments
    await queryInterface.bulkInsert('departments', [
      { name: 'IT & Sistemas' },
      { name: 'Operaciones' },
      { name: 'Finanzas' },
      { name: 'Recursos Humanos' },
      { name: 'Producción' },
      { name: 'Comercial' },
      { name: 'Almacén Central' },
    ]);

    // Permissions
    await queryInterface.bulkInsert('permissions', [
      { module: 'Inventory', action: 'view_stock', name: 'inventory.view_stock', description: 'Visualización global de existencias' },
      { module: 'Inventory', action: 'edit_stock', name: 'inventory.edit_stock', description: 'Ajustes manuales y auditoría física' },
      { module: 'Orders', action: 'approve', name: 'orders.approve', description: 'Validación de crédito y stock' },
      { module: 'Orders', action: 'modify_pricing', name: 'orders.modify_pricing', description: 'Aplicar descuentos y recargos manuales' },
      { module: 'Master Data', action: 'configure_sku', name: 'masterdata.configure_sku', description: 'Gestión de nomenclatura técnica' },
      { module: 'Master Data', action: 'define_fiber', name: 'masterdata.define_fiber', description: 'Parámetros de calidad de alpaca' },
      { module: 'Audit', action: 'access_logs', name: 'audit.access_logs', description: 'Trazabilidad de operaciones críticas' },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('departments', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
