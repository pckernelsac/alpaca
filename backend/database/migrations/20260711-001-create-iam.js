'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    // 1. roles
    await queryInterface.createTable('roles', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      category: { type: Sequelize.STRING(30), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 2. permissions
    await queryInterface.createTable('permissions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      module: { type: Sequelize.STRING(100), allowNull: false },
      action: { type: Sequelize.STRING(100), allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      description: { type: Sequelize.STRING(500), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 3. role_permissions
    await queryInterface.createTable('role_permissions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      role_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' }, onDelete: 'CASCADE' },
      permission_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'permissions', key: 'id' }, onDelete: 'CASCADE' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addConstraint('role_permissions', { fields: ['role_id', 'permission_id'], type: 'unique', name: 'uq_role_permission' });

    // 4. departments
    await queryInterface.createTable('departments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 5. users
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      employee_id: { type: Sequelize.STRING(50), allowNull: true, unique: true },
      position: { type: Sequelize.STRING(255), allowNull: true },
      role_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' } },
      department_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'departments', key: 'id' } },
      avatar: { type: Sequelize.STRING(500), allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'active' },
      force_password_change: { type: Sequelize.BOOLEAN, defaultValue: false },
      last_access_at: { type: Sequelize.DATE, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' } },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    // 6. sessions
    await queryInterface.createTable('sessions', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      user_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      customer_id: { type: Sequelize.UUID, allowNull: true },
      actor_type: { type: Sequelize.STRING(20), allowNull: false },
      refresh_token: { type: Sequelize.STRING(500), allowNull: false, unique: true },
      device_name: { type: Sequelize.STRING(255), allowNull: true },
      platform: { type: Sequelize.STRING(50), allowNull: true },
      browser: { type: Sequelize.STRING(100), allowNull: true },
      ip_address: { type: Sequelize.STRING(45), allowNull: true },
      last_activity_at: { type: Sequelize.DATE, allowNull: true },
      expires_at: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 7. password_resets
    await queryInterface.createTable('password_resets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING(255), allowNull: false },
      token: { type: Sequelize.STRING(255), allowNull: false },
      actor_type: { type: Sequelize.STRING(20), allowNull: false },
      expires_at: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('password_resets');
    await queryInterface.dropTable('sessions');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('departments');
    await queryInterface.dropTable('role_permissions');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
  },
};
