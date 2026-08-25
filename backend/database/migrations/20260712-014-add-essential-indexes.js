'use strict';

module.exports = {
  up: async (queryInterface) => {
    const q = (sql) => queryInterface.sequelize.query(sql);

    // ─── IAM ───────────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_users_status ON users(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_sessions_customer_id ON sessions(customer_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(email)`);

    // ─── Catalog ───────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_products_collection_id ON products(collection_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_products_status ON products(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_products_category_status ON products(category_id, status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_variants_product_id ON product_variants(product_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_variants_material_id ON product_variants(material_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_variants_size_id ON product_variants(size_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_variants_color_id ON product_variants(color_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_product_media_product_id ON product_media(product_id)`);

    // ─── CRM & Customers ───────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_clients_type ON clients(type)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_client_addresses_client_id ON client_addresses(client_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_id ON customer_addresses(customer_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_wishlist_customer_id ON wishlist_items(customer_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_carts_customer_id ON carts(customer_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id)`);

    // ─── Orders ────────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, created_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_orders_placed_at ON orders(placed_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON order_events(order_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_order_documents_order_id ON order_documents(order_id)`);

    // ─── Payments ──────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_transaction_refunds_transaction_id ON transaction_refunds(transaction_id)`);

    // ─── Inventory ─────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_items_warehouse_id ON stock_items(warehouse_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_items_product_id ON stock_items(product_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_items_variant_id ON stock_items(variant_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_items_warehouse_product ON stock_items(warehouse_id, product_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_movements_warehouse_id ON stock_movements(warehouse_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_movements_type ON stock_movements(type)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_stock_movements_created_at ON stock_movements(created_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_warehouse_transfers_origin ON warehouse_transfers(origin_warehouse_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_warehouse_transfers_destination ON warehouse_transfers(destination_warehouse_id)`);

    // ─── Logistics ─────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_shipments_order_id ON shipments(order_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_shipment_events_shipment_id ON shipment_events(shipment_id)`);

    // ─── Marketing ─────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(active)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(active)`);

    // ─── CMS ────────────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(type)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_contents_slug ON contents(slug)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_faq_items_category_id ON faq_items(category_id)`);

    // ─── Audit ─────────────────────────────────────────────────────
    await q(`CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_audit_logs_module ON audit_logs(module)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at)`);
    await q(`CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON audit_logs(severity)`);
  },

  down: async (queryInterface) => {
    // Index removal is intentionally a no-op in down.
    // Indexes are performance optimizations, not structural.
    // In development, they are harmless. In production, dropping them is wasteful.
  },
};
