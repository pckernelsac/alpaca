'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('warehouses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      code: { type: Sequelize.STRING(20), allowNull: true, unique: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      city: { type: Sequelize.STRING(100), allowNull: true },
      type: { type: Sequelize.STRING(30), defaultValue: 'principal' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('stock_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.UUID, allowNull: true },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      warehouse_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'warehouses', key: 'id' } },
      quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      reserved: { type: Sequelize.INTEGER, defaultValue: 0 },
      min_stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      max_stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      last_movement_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('stock_movements', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      movement_number: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      product_id: { type: Sequelize.UUID, allowNull: true },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      warehouse_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'warehouses', key: 'id' } },
      type: { type: Sequelize.STRING(30), allowNull: false },
      quantity: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      balance: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      reference: { type: Sequelize.STRING(100), allowNull: true },
      reason: { type: Sequelize.TEXT, allowNull: true },
      person_id: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('warehouse_transfers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      transfer_number: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      origin_warehouse_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'warehouses', key: 'id' } },
      destination_warehouse_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'warehouses', key: 'id' } },
      status: { type: Sequelize.STRING(30), defaultValue: 'requested' },
      responsible_id: { type: Sequelize.UUID, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('warehouse_transfer_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      transfer_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'warehouse_transfers', key: 'id' }, onDelete: 'CASCADE' },
      product_id: { type: Sequelize.UUID, allowNull: true },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      lot_number: { type: Sequelize.STRING(100), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('warehouse_transfer_items');
    await queryInterface.dropTable('warehouse_transfers');
    await queryInterface.dropTable('stock_movements');
    await queryInterface.dropTable('stock_items');
    await queryInterface.dropTable('warehouses');
  },
};
