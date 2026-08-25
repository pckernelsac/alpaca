'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hero_slides', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      subtitle: { type: Sequelize.STRING(500), allowNull: true },
      cta_text: { type: Sequelize.STRING(100), allowNull: true },
      cta_link: { type: Sequelize.STRING(500), allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('gallery_images', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      url: { type: Sequelize.STRING(500), allowNull: false },
      alt_text: { type: Sequelize.STRING(500), allowNull: true },
      caption: { type: Sequelize.STRING(500), allowNull: true },
      category: { type: Sequelize.STRING(50), allowNull: true },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      visible: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('testimonials', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      author: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.STRING(255), allowNull: true },
      company: { type: Sequelize.STRING(255), allowNull: true },
      avatar: { type: Sequelize.STRING(500), allowNull: true },
      text: { type: Sequelize.TEXT, allowNull: false },
      rating: { type: Sequelize.INTEGER, allowNull: true },
      featured: { type: Sequelize.BOOLEAN, defaultValue: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('benefits', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      icon: { type: Sequelize.STRING(50), allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('artisan_processes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      icon: { type: Sequelize.STRING(50), allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      step_order: { type: Sequelize.INTEGER, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('faq_categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      icon: { type: Sequelize.STRING(50), allowNull: true },
      order: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('faq_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'faq_categories', key: 'id' } },
      question: { type: Sequelize.TEXT, allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: false },
      order: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('faq_items');
    await queryInterface.dropTable('faq_categories');
    await queryInterface.dropTable('artisan_processes');
    await queryInterface.dropTable('benefits');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('gallery_images');
    await queryInterface.dropTable('hero_slides');
  },
};
