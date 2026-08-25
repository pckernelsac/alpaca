'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Logistics
    await queryInterface.createTable('carriers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      code: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('shipments', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      waybill: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      order_id: { type: Sequelize.UUID, allowNull: false },
      carrier: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.STRING(30), defaultValue: 'pending' },
      origin_city: { type: Sequelize.STRING(100), allowNull: true },
      destination_city: { type: Sequelize.STRING(100), allowNull: true },
      dispatched_at: { type: Sequelize.DATE, allowNull: true },
      estimated_at: { type: Sequelize.DATE, allowNull: true },
      delivered_at: { type: Sequelize.DATE, allowNull: true },
      tracking_data: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('shipment_events', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      shipment_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'shipments', key: 'id' }, onDelete: 'CASCADE' },
      status: { type: Sequelize.STRING(30), allowNull: false },
      location: { type: Sequelize.STRING(255), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      timestamp: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Marketing
    await queryInterface.createTable('campaigns', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      type: { type: Sequelize.STRING(50), allowNull: true },
      channel: { type: Sequelize.STRING(50), allowNull: true },
      budget: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      spent: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      roi: { type: Sequelize.STRING(20), allowNull: true },
      conversions: { type: Sequelize.INTEGER, allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'draft' },
      image: { type: Sequelize.STRING(500), allowNull: true },
      start_date: { type: Sequelize.DATE, allowNull: true },
      end_date: { type: Sequelize.DATE, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('coupons', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING(50), unique: true, allowNull: false },
      type: { type: Sequelize.STRING(20), allowNull: false },
      value: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
      min_purchase: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      max_uses: { type: Sequelize.INTEGER, allowNull: true },
      used_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      expires_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('promotions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      type: { type: Sequelize.STRING(30), allowNull: false },
      discount_value: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
      applies_to: { type: Sequelize.STRING(30), allowNull: false },
      product_ids: { type: Sequelize.JSONB, allowNull: true },
      category_id: { type: Sequelize.INTEGER, allowNull: true },
      starts_at: { type: Sequelize.DATE, allowNull: false },
      ends_at: { type: Sequelize.DATE, allowNull: false },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('newsletter_subscribers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      source: { type: Sequelize.STRING(100), allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // CMS
    await queryInterface.createTable('contents', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('gen_random_uuid()'), primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      type: { type: Sequelize.STRING(30), allowNull: false },
      body: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      author_id: { type: Sequelize.UUID, allowNull: true },
      status: { type: Sequelize.STRING(30), defaultValue: 'draft' },
      published_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('faq_categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(100), unique: true, allowNull: false },
      icon: { type: Sequelize.STRING(50), allowNull: true },
      order: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('faq_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'faq_categories', key: 'id' }, onDelete: 'CASCADE' },
      question: { type: Sequelize.TEXT, allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: false },
      order: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Audit + Settings + Contact
    await queryInterface.createTable('audit_logs', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.UUID, allowNull: true },
      action: { type: Sequelize.STRING(100), allowNull: false },
      module: { type: Sequelize.STRING(50), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      ip_address: { type: Sequelize.STRING(45), allowNull: true },
      device: { type: Sequelize.STRING(100), allowNull: true },
      severity: { type: Sequelize.STRING(20), defaultValue: 'info' },
      metadata: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('company_settings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      logo: { type: Sequelize.STRING(500), allowNull: true },
      legal_name: { type: Sequelize.STRING(255), allowNull: false },
      tax_id: { type: Sequelize.STRING(30), allowNull: false },
      industry: { type: Sequelize.STRING(100), allowNull: true },
      website: { type: Sequelize.STRING(500), allowNull: true },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      primary_currency: { type: Sequelize.STRING(5), defaultValue: 'PEN' },
      default_timezone: { type: Sequelize.STRING(50), defaultValue: 'America/Lima' },
      system_language: { type: Sequelize.STRING(5), defaultValue: 'es' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.createTable('contact_inquiries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      subject: { type: Sequelize.STRING(255), allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      status: { type: Sequelize.STRING(30), defaultValue: 'pending' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('contact_inquiries');
    await queryInterface.dropTable('company_settings');
    await queryInterface.dropTable('audit_logs');
    await queryInterface.dropTable('faq_items');
    await queryInterface.dropTable('faq_categories');
    await queryInterface.dropTable('contents');
    await queryInterface.dropTable('newsletter_subscribers');
    await queryInterface.dropTable('promotions');
    await queryInterface.dropTable('coupons');
    await queryInterface.dropTable('campaigns');
    await queryInterface.dropTable('shipment_events');
    await queryInterface.dropTable('shipments');
    await queryInterface.dropTable('carriers');
  },
};
