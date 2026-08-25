'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const q = (sql) => queryInterface.sequelize.query(sql);

    // ─── IAM ───────────────────────────────────────────────────────
    await q(`ALTER TABLE users ADD CONSTRAINT chk_users_status CHECK (status IN ('active','inactive','suspended'))`);
    await q(`ALTER TABLE roles ADD CONSTRAINT chk_roles_status CHECK (status IN ('active','inactive'))`);
    await q(`ALTER TABLE roles ADD CONSTRAINT chk_roles_category CHECK (category IS NULL OR category IN ('critical','operational','administrative','external'))`);
    await q(`ALTER TABLE sessions ADD CONSTRAINT chk_sessions_actor_type CHECK (actor_type IN ('user','customer'))`);
    await q(`ALTER TABLE password_resets ADD CONSTRAINT chk_password_resets_actor_type CHECK (actor_type IN ('user','customer'))`);

    // ─── Catalog ───────────────────────────────────────────────────
    await q(`ALTER TABLE products ADD CONSTRAINT chk_products_status CHECK (status IN ('draft','active','hidden','discontinued'))`);
    await q(`ALTER TABLE product_variants ADD CONSTRAINT chk_variants_status CHECK (status IN ('active','hidden','out_of_stock','discontinued','coming_soon'))`);
    await q(`ALTER TABLE product_media ADD CONSTRAINT chk_media_type CHECK (type IN ('image','video'))`);
    await q(`ALTER TABLE product_media ADD CONSTRAINT chk_media_format CHECK (format IS NULL OR format IN ('jpg','png','mp4','webp','svg'))`);

    // ─── CRM ───────────────────────────────────────────────────────
    await q(`ALTER TABLE clients ADD CONSTRAINT chk_clients_status CHECK (status IN ('active','inactive','vip'))`);
    await q(`ALTER TABLE clients ADD CONSTRAINT chk_clients_type CHECK (type IN ('wholesale','retail','corporate'))`);
    await q(`ALTER TABLE clients ADD CONSTRAINT chk_clients_document_type CHECK (document_type IS NULL OR document_type IN ('ruc','dni','passport','foreigner_card'))`);
    await q(`ALTER TABLE client_addresses ADD CONSTRAINT chk_client_addresses_type CHECK (type IN ('principal','billing','shipping'))`);

    // ─── Customers / B2C ───────────────────────────────────────────
    await q(`ALTER TABLE customers ADD CONSTRAINT chk_customers_language CHECK (language IN ('es','en'))`);
    await q(`ALTER TABLE customers ADD CONSTRAINT chk_customers_currency CHECK (currency IN ('PEN','USD'))`);
    await q(`ALTER TABLE reviews ADD CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 5)`);
    await q(`ALTER TABLE cart_items ADD CONSTRAINT chk_cart_items_quantity CHECK (quantity > 0)`);

    // ─── Orders ────────────────────────────────────────────────────
    await q(`ALTER TABLE orders ADD CONSTRAINT chk_orders_status CHECK (status IN ('pending','confirmed','paid','preparing','shipped','in_transit','delivered','cancelled','returned'))`);
    await q(`ALTER TABLE order_items ADD CONSTRAINT chk_order_items_quantity CHECK (quantity > 0)`);
    await q(`ALTER TABLE order_events ADD CONSTRAINT chk_order_events_type CHECK (type IN ('created','confirmed','paid','preparing','shipped','transit','delivered','returned','cancelled'))`);
    await q(`ALTER TABLE order_documents ADD CONSTRAINT chk_order_documents_type CHECK (type IN ('invoice','packing_list','label','other'))`);

    // ─── Payments ──────────────────────────────────────────────────
    await q(`ALTER TABLE transactions ADD CONSTRAINT chk_transactions_method CHECK (method IN ('visa','mastercard','amex','paypal','bank_transfer','cash'))`);
    await q(`ALTER TABLE transactions ADD CONSTRAINT chk_transactions_status CHECK (status IN ('pending','processing','succeeded','failed','refunded'))`);
    await q(`ALTER TABLE transactions ADD CONSTRAINT chk_transactions_currency CHECK (currency IN ('USD','PEN','EUR'))`);
    await q(`ALTER TABLE transaction_refunds ADD CONSTRAINT chk_refunds_amount CHECK (amount > 0)`);

    // ─── Inventory ─────────────────────────────────────────────────
    await q(`ALTER TABLE warehouses ADD CONSTRAINT chk_warehouses_type CHECK (type IN ('principal','secondary','production'))`);
    await q(`ALTER TABLE stock_items ADD CONSTRAINT chk_stock_items_quantity CHECK (quantity >= 0)`);
    await q(`ALTER TABLE stock_items ADD CONSTRAINT chk_stock_items_reserved CHECK (reserved >= 0 AND reserved <= quantity)`);
    await q(`ALTER TABLE stock_movements ADD CONSTRAINT chk_stock_movements_type CHECK (type IN ('receipt','issue','transfer','adjustment','reservation'))`);
    await q(`ALTER TABLE warehouse_transfers ADD CONSTRAINT chk_transfers_status CHECK (status IN ('requested','authorized','in_transit','received','completed','cancelled','archived'))`);
    await q(`ALTER TABLE warehouse_transfer_items ADD CONSTRAINT chk_transfer_items_quantity CHECK (quantity > 0)`);

    // ─── Logistics ─────────────────────────────────────────────────
    await q(`ALTER TABLE shipments ADD CONSTRAINT chk_shipments_status CHECK (status IN ('pending','preparing','ready','transit','delayed','delivered','returned'))`);

    // ─── Marketing ─────────────────────────────────────────────────
    await q(`ALTER TABLE campaigns ADD CONSTRAINT chk_campaigns_status CHECK (status IN ('draft','scheduled','active','paused','closing','finished'))`);
    await q(`ALTER TABLE campaigns ADD CONSTRAINT chk_campaigns_type CHECK (type IS NULL OR type IN ('seasonal','promotional','recurring','professional'))`);
    await q(`ALTER TABLE coupons ADD CONSTRAINT chk_coupons_type CHECK (type IN ('percentage','fixed'))`);
    await q(`ALTER TABLE promotions ADD CONSTRAINT chk_promotions_type CHECK (type IN ('percentage','fixed','bogo'))`);
    await q(`ALTER TABLE promotions ADD CONSTRAINT chk_promotions_applies_to CHECK (applies_to IN ('product','category','collection','order'))`);

    // ─── CMS ────────────────────────────────────────────────────────
    await q(`ALTER TABLE contents ADD CONSTRAINT chk_contents_status CHECK (status IN ('draft','review','scheduled','published'))`);
    await q(`ALTER TABLE contents ADD CONSTRAINT chk_contents_type CHECK (type IN ('page','blog','banner','collection','promo','faq'))`);

    // ─── Audit ─────────────────────────────────────────────────────
    await q(`ALTER TABLE audit_logs ADD CONSTRAINT chk_audit_severity CHECK (severity IN ('success','info','warning','error','critical'))`);
    await q(`ALTER TABLE audit_logs ADD CONSTRAINT chk_audit_action CHECK (action IN ('create','update','delete','login'))`);

    // ─── Contact ───────────────────────────────────────────────────
    await q(`ALTER TABLE contact_inquiries ADD CONSTRAINT chk_contact_status CHECK (status IN ('pending','read','replied','archived'))`);
  },

  down: async (queryInterface) => {
    const q = (sql) => queryInterface.sequelize.query(sql);
    const pairs = [
      ['users','chk_users_status'], ['roles','chk_roles_status'], ['roles','chk_roles_category'],
      ['sessions','chk_sessions_actor_type'], ['password_resets','chk_password_resets_actor_type'],
      ['products','chk_products_status'], ['product_variants','chk_variants_status'],
      ['product_media','chk_media_type'], ['product_media','chk_media_format'],
      ['clients','chk_clients_status'], ['clients','chk_clients_type'], ['clients','chk_clients_document_type'],
      ['client_addresses','chk_client_addresses_type'],
      ['customers','chk_customers_language'], ['customers','chk_customers_currency'],
      ['reviews','chk_reviews_rating'], ['cart_items','chk_cart_items_quantity'],
      ['orders','chk_orders_status'], ['order_items','chk_order_items_quantity'],
      ['order_events','chk_order_events_type'], ['order_documents','chk_order_documents_type'],
      ['transactions','chk_transactions_method'], ['transactions','chk_transactions_status'],
      ['transactions','chk_transactions_currency'], ['transaction_refunds','chk_refunds_amount'],
      ['warehouses','chk_warehouses_type'], ['stock_items','chk_stock_items_quantity'],
      ['stock_items','chk_stock_items_reserved'], ['stock_movements','chk_stock_movements_type'],
      ['warehouse_transfers','chk_transfers_status'], ['warehouse_transfer_items','chk_transfer_items_quantity'],
      ['shipments','chk_shipments_status'],
      ['campaigns','chk_campaigns_status'], ['campaigns','chk_campaigns_type'],
      ['coupons','chk_coupons_type'], ['promotions','chk_promotions_type'],
      ['promotions','chk_promotions_applies_to'], ['contents','chk_contents_status'],
      ['contents','chk_contents_type'], ['audit_logs','chk_audit_severity'],
      ['audit_logs','chk_audit_action'], ['contact_inquiries','chk_contact_status'],
    ];
    for (const [table, constraint] of pairs.reverse()) {
      try { await q(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "${constraint}"`); } catch (_) {}
    }
  },
};
