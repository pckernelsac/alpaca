'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add missing columns to coupons (blueprint: campaign_id FK, created_by FK)
    await queryInterface.addColumn('coupons', 'campaign_id', { type: Sequelize.UUID, allowNull: true });
    await queryInterface.addColumn('coupons', 'created_by', { type: Sequelize.UUID, allowNull: true });

    // Add missing columns to promotions (blueprint: campaign_id FK, collection_id FK, created_by FK)
    await queryInterface.addColumn('promotions', 'campaign_id', { type: Sequelize.UUID, allowNull: true });
    await queryInterface.addColumn('promotions', 'collection_id', { type: Sequelize.STRING(20), allowNull: true });
    await queryInterface.addColumn('promotions', 'created_by', { type: Sequelize.UUID, allowNull: true });

    // Add missing type column to customer_addresses (blueprint: type IN principal/billing/shipping)
    await queryInterface.addColumn('customer_addresses', 'type', { type: Sequelize.STRING(20), defaultValue: 'principal' });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('customer_addresses', 'type');
    await queryInterface.removeColumn('promotions', 'created_by');
    await queryInterface.removeColumn('promotions', 'collection_id');
    await queryInterface.removeColumn('promotions', 'campaign_id');
    await queryInterface.removeColumn('coupons', 'created_by');
    await queryInterface.removeColumn('coupons', 'campaign_id');
  },
};
