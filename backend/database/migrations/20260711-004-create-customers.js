'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      language: { type: Sequelize.STRING(5), defaultValue: 'es' },
      currency: { type: Sequelize.STRING(5), defaultValue: 'PEN' },
      comms: { type: Sequelize.BOOLEAN, defaultValue: true },
      loyalty_tier: { type: Sequelize.STRING(50), allowNull: true },
      loyalty_points: { type: Sequelize.INTEGER, defaultValue: 0 },
      email_verified_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.createTable('customer_addresses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customer_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'customers', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING(255), allowNull: false },
      street: { type: Sequelize.STRING(255), allowNull: false },
      city: { type: Sequelize.STRING(100), allowNull: false },
      state: { type: Sequelize.STRING(100), allowNull: true },
      zip: { type: Sequelize.STRING(20), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('wishlist_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customer_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'customers', key: 'id' }, onDelete: 'CASCADE' },
      product_id: { type: Sequelize.UUID, allowNull: false },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.UUID, allowNull: false },
      customer_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'customers', key: 'id' } },
      author: { type: Sequelize.STRING(255), allowNull: false },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      text: { type: Sequelize.TEXT, allowNull: false },
      tag: { type: Sequelize.STRING(100), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('carts', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      customer_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'customers', key: 'id' } },
      session_id: { type: Sequelize.STRING(255), allowNull: true },
      coupon_id: { type: Sequelize.INTEGER, allowNull: true },
      subtotal: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      shipping_fee: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      tax: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      discount: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      expires_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('cart_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      cart_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'carts', key: 'id' }, onDelete: 'CASCADE' },
      product_id: { type: Sequelize.UUID, allowNull: true },
      variant_id: { type: Sequelize.UUID, allowNull: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      sku: { type: Sequelize.STRING(50), allowNull: false },
      variant_label: { type: Sequelize.STRING(255), allowNull: true },
      image_url: { type: Sequelize.STRING(500), allowNull: true },
      unit_price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      total: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cart_items');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('reviews');
    await queryInterface.dropTable('wishlist_items');
    await queryInterface.dropTable('customer_addresses');
    await queryInterface.dropTable('customers');
  },
};
