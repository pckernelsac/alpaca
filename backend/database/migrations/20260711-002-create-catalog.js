'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Categories
    await queryInterface.createTable('categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      slug: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      parent_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    // Collections
    await queryInterface.createTable('collections', {
      id: { type: Sequelize.STRING(20), primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      piece_count: { type: Sequelize.INTEGER, allowNull: true },
      season_id: { type: Sequelize.INTEGER, allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    // Tags
    await queryInterface.createTable('tags', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Products
    await queryInterface.createTable('products', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      sku: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      material: { type: Sequelize.STRING(255), allowNull: true },
      category_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'categories', key: 'id' } },
      collection_id: { type: Sequelize.STRING(20), allowNull: true, references: { model: 'collections', key: 'id' } },
      weight: { type: Sequelize.NUMERIC(8, 2), allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'draft' },
      created_by: { type: Sequelize.UUID, allowNull: true },
      published_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    // Product Variants
    await queryInterface.createTable('product_variants', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      product_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      sku: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      code: { type: Sequelize.STRING(50), allowNull: true },
      color_hex: { type: Sequelize.STRING(7), allowNull: true },
      color_name: { type: Sequelize.STRING(100), allowNull: true },
      size_id: { type: Sequelize.INTEGER, allowNull: true },
      material_id: { type: Sequelize.INTEGER, allowNull: true },
      color_id: { type: Sequelize.INTEGER, allowNull: true },
      price: { type: Sequelize.NUMERIC(12, 2), allowNull: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.STRING(30), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Product Media
    await queryInterface.createTable('product_media', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      product_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      variant_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'product_variants', key: 'id' }, onDelete: 'SET NULL' },
      url: { type: Sequelize.STRING(500), allowNull: false },
      type: { type: Sequelize.STRING(10), defaultValue: 'image' },
      format: { type: Sequelize.STRING(10), allowNull: true },
      file_size: { type: Sequelize.STRING(20), allowNull: true },
      dimensions: { type: Sequelize.STRING(30), allowNull: true },
      alt_text: { type: Sequelize.STRING(500), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      is_principal: { type: Sequelize.BOOLEAN, defaultValue: false },
      visible: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Product Tags (join table)
    await queryInterface.createTable('product_tags', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      tag_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'tags', key: 'id' }, onDelete: 'CASCADE' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addConstraint('product_tags', { fields: ['product_id', 'tag_id'], type: 'unique', name: 'uq_product_tag' });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('product_tags');
    await queryInterface.dropTable('product_media');
    await queryInterface.dropTable('product_variants');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('tags');
    await queryInterface.dropTable('collections');
    await queryInterface.dropTable('categories');
  },
};
