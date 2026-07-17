'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      transaction_id: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      order_id: { type: Sequelize.UUID, allowNull: false },
      stripe_id: { type: Sequelize.STRING(100), allowNull: true },
      method: { type: Sequelize.STRING(30), allowNull: false },
      amount: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      currency: { type: Sequelize.STRING(5), defaultValue: 'USD' },
      status: { type: Sequelize.STRING(30), defaultValue: 'pending' },
      metadata: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('transaction_refunds', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      transaction_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'transactions', key: 'id' }, onDelete: 'CASCADE' },
      amount: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      reason: { type: Sequelize.STRING(500), allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transaction_refunds');
    await queryInterface.dropTable('transactions');
  },
};
