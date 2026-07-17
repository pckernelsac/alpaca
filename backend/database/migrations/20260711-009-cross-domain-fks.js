'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. sessions.customer_id → customers.id
    // sessions se creó en 001-iam, customers en 004-customers
    await queryInterface.addConstraint('sessions', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'fk_sessions_customer_id',
      references: { table: 'customers', field: 'id' },
      onDelete: 'CASCADE',
    });

    // 2. carts.coupon_id → coupons.id
    // carts se creó en 004-customers, coupons en 008-remaining
    await queryInterface.addConstraint('carts', {
      fields: ['coupon_id'],
      type: 'foreign key',
      name: 'fk_carts_coupon_id',
      references: { table: 'coupons', field: 'id' },
      onDelete: 'SET NULL',
    });

    // 3. orders.coupon_id → coupons.id
    // orders se creó en 005-orders, coupons en 008-remaining
    await queryInterface.addConstraint('orders', {
      fields: ['coupon_id'],
      type: 'foreign key',
      name: 'fk_orders_coupon_id',
      references: { table: 'coupons', field: 'id' },
      onDelete: 'SET NULL',
    });

    console.log('✅ Cross-domain FKs created: sessions.customer_id, carts.coupon_id, orders.coupon_id');
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('sessions', 'fk_sessions_customer_id');
    await queryInterface.removeConstraint('carts', 'fk_carts_coupon_id');
    await queryInterface.removeConstraint('orders', 'fk_orders_coupon_id');
  },
};
