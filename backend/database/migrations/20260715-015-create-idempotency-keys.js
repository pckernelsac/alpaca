'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_idempotency_keys', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      customer_id: { type: Sequelize.UUID, allowNull: false },
      scope: { type: Sequelize.STRING(50), allowNull: false },
      idempotency_key: { type: Sequelize.STRING(255), allowNull: false },
      request_hash: { type: Sequelize.STRING(64), allowNull: false },
      status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'processing' },
      resource_id: { type: Sequelize.UUID, allowNull: true },
      response_status: { type: Sequelize.INTEGER, allowNull: true },
      response_body: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      expires_at: { type: Sequelize.DATE, allowNull: true },
    });

    // Unique constraint: one key per customer per scope
    await queryInterface.addConstraint('order_idempotency_keys', {
      fields: ['customer_id', 'scope', 'idempotency_key'],
      type: 'unique',
      name: 'uq_idempotency_customer_scope_key',
    });

    // Index for TTL cleanup
    await queryInterface.sequelize.query(
      `CREATE INDEX IF NOT EXISTS idx_idempotency_expires_at ON order_idempotency_keys(expires_at)`
    );

    // CHECK constraint for status
    await queryInterface.sequelize.query(
      `ALTER TABLE order_idempotency_keys ADD CONSTRAINT chk_idempotency_status CHECK (status IN ('processing','completed','failed'))`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('order_idempotency_keys');
  },
};
