'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('webhook_events', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      provider: { type: Sequelize.STRING(50), allowNull: false },
      external_event_id: { type: Sequelize.STRING(255), allowNull: false },
      event_type: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'received' },
      order_id: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      processed_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addConstraint('webhook_events', {
      fields: ['provider', 'external_event_id'],
      type: 'unique',
      name: 'uq_webhook_provider_event',
    });

    await queryInterface.sequelize.query(
      `ALTER TABLE webhook_events ADD CONSTRAINT chk_webhook_status CHECK (status IN ('received','processing','completed','failed'))`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('webhook_events');
  },
};
