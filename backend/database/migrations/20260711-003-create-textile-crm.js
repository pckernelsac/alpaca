'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Textile tables
    await queryInterface.createTable('fiber_materials', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      category: { type: Sequelize.STRING(50), allowNull: true },
      micron_rating: { type: Sequelize.STRING(20), allowNull: true },
      origin: { type: Sequelize.STRING(100), allowNull: true },
      certification: { type: Sequelize.STRING(100), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('textile_colors', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      hex: { type: Sequelize.STRING(7), allowNull: false },
      pantone: { type: Sequelize.STRING(30), allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('textile_sizes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      category: { type: Sequelize.STRING(30), allowNull: true },
      order: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('seasons', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      start_month: { type: Sequelize.INTEGER, allowNull: true },
      end_month: { type: Sequelize.INTEGER, allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // CRM tables
    await queryInterface.createTable('clients', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      company: { type: Sequelize.STRING(255), allowNull: true },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      website: { type: Sequelize.STRING(500), allowNull: true },
      document_type: { type: Sequelize.STRING(30), allowNull: true },
      document_number: { type: Sequelize.STRING(30), allowNull: true, unique: true },
      type: { type: Sequelize.STRING(30), defaultValue: 'wholesale' },
      status: { type: Sequelize.STRING(30), defaultValue: 'active' },
      assigned_seller_id: { type: Sequelize.UUID, allowNull: true },
      credit_limit: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      payment_terms: { type: Sequelize.STRING(100), allowNull: true },
      internal_notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.createTable('client_addresses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      client_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'clients', key: 'id' }, onDelete: 'CASCADE' },
      type: { type: Sequelize.STRING(20), defaultValue: 'principal' },
      street: { type: Sequelize.STRING(255), allowNull: false },
      city: { type: Sequelize.STRING(100), allowNull: false },
      state: { type: Sequelize.STRING(100), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: false },
      postal_code: { type: Sequelize.STRING(20), allowNull: true },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('client_payment_methods', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      client_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'clients', key: 'id' }, onDelete: 'CASCADE' },
      brand: { type: Sequelize.STRING(50), allowNull: false },
      last4: { type: Sequelize.STRING(4), allowNull: false },
      exp_month: { type: Sequelize.INTEGER, allowNull: false },
      exp_year: { type: Sequelize.INTEGER, allowNull: false },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('client_notes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      client_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'clients', key: 'id' }, onDelete: 'CASCADE' },
      user_id: { type: Sequelize.UUID, allowNull: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('client_notes');
    await queryInterface.dropTable('client_payment_methods');
    await queryInterface.dropTable('client_addresses');
    await queryInterface.dropTable('clients');
    await queryInterface.dropTable('seasons');
    await queryInterface.dropTable('textile_sizes');
    await queryInterface.dropTable('textile_colors');
    await queryInterface.dropTable('fiber_materials');
  },
};
