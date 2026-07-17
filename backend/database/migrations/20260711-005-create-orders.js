'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      order_number: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      customer_id: { type: Sequelize.UUID, allowNull: true },
      client_id: { type: Sequelize.UUID, allowNull: true },
      user_id: { type: Sequelize.UUID, allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'pending' },
      channel: { type: Sequelize.STRING(50), allowNull: true },
      agent: { type: Sequelize.STRING(100), allowNull: true },
      subtotal: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      tax: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      shipping_fee: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      discount: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      paid: { type: Sequelize.BOOLEAN, defaultValue: false },
      paid_at: { type: Sequelize.DATE, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      placed_at: { type: Sequelize.DATE, allowNull: true },
      coupon_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('order_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'orders', key: 'id' }, onDelete: 'CASCADE' },
      product_id: { type: Sequelize.UUID, allowNull: true },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      product_name: { type: Sequelize.STRING(255), allowNull: false },
      sku: { type: Sequelize.STRING(50), allowNull: false },
      variant_label: { type: Sequelize.STRING(255), allowNull: true },
      image_url: { type: Sequelize.STRING(500), allowNull: true },
      unit_price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      discount_amount: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      tax_amount: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      currency: { type: Sequelize.STRING(5), defaultValue: 'USD' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('order_events', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'orders', key: 'id' }, onDelete: 'CASCADE' },
      type: { type: Sequelize.STRING(30), allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      actor_id: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('order_documents', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'orders', key: 'id' }, onDelete: 'CASCADE' },
      type: { type: Sequelize.STRING(30), allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false },
      url: { type: Sequelize.STRING(500), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('order_documents');
    await queryInterface.dropTable('order_events');
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
  },
};
