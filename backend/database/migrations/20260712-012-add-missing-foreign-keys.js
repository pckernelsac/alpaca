'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ─── IAM and Auth ───────────────────────────────────────────────
    // users.created_by → users (self-ref)
    await queryInterface.addConstraint('users', { fields: ['created_by'], type: 'foreign key', name: 'fk_users_created_by', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── Catalog ────────────────────────────────────────────────────
    // products.created_by → users
    await queryInterface.addConstraint('products', { fields: ['created_by'], type: 'foreign key', name: 'fk_products_created_by', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // product_variants.material_id → fiber_materials
    await queryInterface.addConstraint('product_variants', { fields: ['material_id'], type: 'foreign key', name: 'fk_variants_material_id', references: { table: 'fiber_materials', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // product_variants.size_id → textile_sizes
    await queryInterface.addConstraint('product_variants', { fields: ['size_id'], type: 'foreign key', name: 'fk_variants_size_id', references: { table: 'textile_sizes', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // product_variants.color_id → textile_colors
    await queryInterface.addConstraint('product_variants', { fields: ['color_id'], type: 'foreign key', name: 'fk_variants_color_id', references: { table: 'textile_colors', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // categories.parent_id → categories (self-ref)
    await queryInterface.addConstraint('categories', { fields: ['parent_id'], type: 'foreign key', name: 'fk_categories_parent_id', references: { table: 'categories', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // collections.season_id → seasons
    await queryInterface.addConstraint('collections', { fields: ['season_id'], type: 'foreign key', name: 'fk_collections_season_id', references: { table: 'seasons', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── CRM ────────────────────────────────────────────────────────
    // clients.assigned_seller_id → users
    await queryInterface.addConstraint('clients', { fields: ['assigned_seller_id'], type: 'foreign key', name: 'fk_clients_assigned_seller', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // client_notes.user_id → users
    await queryInterface.addConstraint('client_notes', { fields: ['user_id'], type: 'foreign key', name: 'fk_client_notes_user_id', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── Customers / B2C ───────────────────────────────────────────
    // wishlist_items.product_id → products
    await queryInterface.addConstraint('wishlist_items', { fields: ['product_id'], type: 'foreign key', name: 'fk_wishlist_product_id', references: { table: 'products', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // wishlist_items.variant_id → product_variants
    await queryInterface.addConstraint('wishlist_items', { fields: ['variant_id'], type: 'foreign key', name: 'fk_wishlist_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // reviews.product_id → products ON DELETE CASCADE
    await queryInterface.addConstraint('reviews', { fields: ['product_id'], type: 'foreign key', name: 'fk_reviews_product_id', references: { table: 'products', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // cart_items.product_id → products
    await queryInterface.addConstraint('cart_items', { fields: ['product_id'], type: 'foreign key', name: 'fk_cart_items_product_id', references: { table: 'products', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // cart_items.variant_id → product_variants
    await queryInterface.addConstraint('cart_items', { fields: ['variant_id'], type: 'foreign key', name: 'fk_cart_items_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── Orders ─────────────────────────────────────────────────────
    // orders.customer_id → customers
    await queryInterface.addConstraint('orders', { fields: ['customer_id'], type: 'foreign key', name: 'fk_orders_customer_id', references: { table: 'customers', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // orders.client_id → clients
    await queryInterface.addConstraint('orders', { fields: ['client_id'], type: 'foreign key', name: 'fk_orders_client_id', references: { table: 'clients', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // orders.user_id → users
    await queryInterface.addConstraint('orders', { fields: ['user_id'], type: 'foreign key', name: 'fk_orders_user_id', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // order_items.product_id → products ON DELETE SET NULL
    await queryInterface.addConstraint('order_items', { fields: ['product_id'], type: 'foreign key', name: 'fk_order_items_product_id', references: { table: 'products', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // order_items.variant_id → product_variants ON DELETE SET NULL
    await queryInterface.addConstraint('order_items', { fields: ['variant_id'], type: 'foreign key', name: 'fk_order_items_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // order_events.actor_id → users
    await queryInterface.addConstraint('order_events', { fields: ['actor_id'], type: 'foreign key', name: 'fk_order_events_actor_id', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── Payments ───────────────────────────────────────────────────
    // transactions.order_id → orders
    await queryInterface.addConstraint('transactions', { fields: ['order_id'], type: 'foreign key', name: 'fk_transactions_order_id', references: { table: 'orders', field: 'id' }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

    // ─── Inventory ─────────────────────────────────────────────────
    // stock_items.product_id → products
    await queryInterface.addConstraint('stock_items', { fields: ['product_id'], type: 'foreign key', name: 'fk_stock_items_product_id', references: { table: 'products', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // stock_items.variant_id → product_variants
    await queryInterface.addConstraint('stock_items', { fields: ['variant_id'], type: 'foreign key', name: 'fk_stock_items_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // stock_movements.product_id → products
    await queryInterface.addConstraint('stock_movements', { fields: ['product_id'], type: 'foreign key', name: 'fk_stock_movements_product_id', references: { table: 'products', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // stock_movements.variant_id → product_variants
    await queryInterface.addConstraint('stock_movements', { fields: ['variant_id'], type: 'foreign key', name: 'fk_stock_movements_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // stock_movements.person_id → users
    await queryInterface.addConstraint('stock_movements', { fields: ['person_id'], type: 'foreign key', name: 'fk_stock_movements_person_id', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // warehouse_transfers.responsible_id → users
    await queryInterface.addConstraint('warehouse_transfers', { fields: ['responsible_id'], type: 'foreign key', name: 'fk_warehouse_transfers_responsible', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // warehouse_transfer_items.product_id → products
    await queryInterface.addConstraint('warehouse_transfer_items', { fields: ['product_id'], type: 'foreign key', name: 'fk_transfer_items_product_id', references: { table: 'products', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // warehouse_transfer_items.variant_id → product_variants
    await queryInterface.addConstraint('warehouse_transfer_items', { fields: ['variant_id'], type: 'foreign key', name: 'fk_transfer_items_variant_id', references: { table: 'product_variants', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── Logistics ──────────────────────────────────────────────────
    // shipments.order_id → orders
    await queryInterface.addConstraint('shipments', { fields: ['order_id'], type: 'foreign key', name: 'fk_shipments_order_id', references: { table: 'orders', field: 'id' }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

    // ─── Marketing ──────────────────────────────────────────────────
    // campaigns.created_by → users
    await queryInterface.addConstraint('campaigns', { fields: ['created_by'], type: 'foreign key', name: 'fk_campaigns_created_by', references: { table: 'users', field: 'id' }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
    // coupons.campaign_id → campaigns
    await queryInterface.addConstraint('coupons', { fields: ['campaign_id'], type: 'foreign key', name: 'fk_coupons_campaign_id', references: { table: 'campaigns', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // coupons.created_by → users
    await queryInterface.addConstraint('coupons', { fields: ['created_by'], type: 'foreign key', name: 'fk_coupons_created_by', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // promotions.campaign_id → campaigns
    await queryInterface.addConstraint('promotions', { fields: ['campaign_id'], type: 'foreign key', name: 'fk_promotions_campaign_id', references: { table: 'campaigns', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // promotions.collection_id → collections
    await queryInterface.addConstraint('promotions', { fields: ['collection_id'], type: 'foreign key', name: 'fk_promotions_collection_id', references: { table: 'collections', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // promotions.category_id → categories
    await queryInterface.addConstraint('promotions', { fields: ['category_id'], type: 'foreign key', name: 'fk_promotions_category_id', references: { table: 'categories', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // promotions.created_by → users
    await queryInterface.addConstraint('promotions', { fields: ['created_by'], type: 'foreign key', name: 'fk_promotions_created_by', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    // ─── CMS ────────────────────────────────────────────────────────
    // contents.author_id → users
    await queryInterface.addConstraint('contents', { fields: ['author_id'], type: 'foreign key', name: 'fk_contents_author_id', references: { table: 'users', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  },

  down: async (queryInterface) => {
    const fkMap = [
      ['contents', 'fk_contents_author_id'],
      ['promotions', 'fk_promotions_created_by'], ['promotions', 'fk_promotions_category_id'],
      ['promotions', 'fk_promotions_collection_id'], ['promotions', 'fk_promotions_campaign_id'],
      ['coupons', 'fk_coupons_created_by'], ['coupons', 'fk_coupons_campaign_id'],
      ['campaigns', 'fk_campaigns_created_by'], ['shipments', 'fk_shipments_order_id'],
      ['warehouse_transfer_items', 'fk_transfer_items_variant_id'], ['warehouse_transfer_items', 'fk_transfer_items_product_id'],
      ['warehouse_transfers', 'fk_warehouse_transfers_responsible'],
      ['stock_movements', 'fk_stock_movements_person_id'], ['stock_movements', 'fk_stock_movements_variant_id'],
      ['stock_movements', 'fk_stock_movements_product_id'],
      ['stock_items', 'fk_stock_items_variant_id'], ['stock_items', 'fk_stock_items_product_id'],
      ['transactions', 'fk_transactions_order_id'],
      ['order_events', 'fk_order_events_actor_id'], ['order_items', 'fk_order_items_variant_id'],
      ['order_items', 'fk_order_items_product_id'],
      ['orders', 'fk_orders_user_id'], ['orders', 'fk_orders_client_id'], ['orders', 'fk_orders_customer_id'],
      ['cart_items', 'fk_cart_items_variant_id'], ['cart_items', 'fk_cart_items_product_id'],
      ['reviews', 'fk_reviews_product_id'],
      ['wishlist_items', 'fk_wishlist_variant_id'], ['wishlist_items', 'fk_wishlist_product_id'],
      ['client_notes', 'fk_client_notes_user_id'], ['clients', 'fk_clients_assigned_seller'],
      ['collections', 'fk_collections_season_id'], ['categories', 'fk_categories_parent_id'],
      ['product_variants', 'fk_variants_color_id'], ['product_variants', 'fk_variants_size_id'],
      ['product_variants', 'fk_variants_material_id'],
      ['products', 'fk_products_created_by'], ['users', 'fk_users_created_by'],
    ];
    for (const [table, name] of fkMap.reverse()) {
      try { await queryInterface.removeConstraint(table, name); } catch (_) {}
    }
  },
};
