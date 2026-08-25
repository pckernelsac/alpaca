'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('transactions', 'order_id', {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn('transactions', 'order_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
