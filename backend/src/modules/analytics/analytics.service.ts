import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../catalog/entities/product.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Order) private orderM: typeof Order,
    @InjectModel(Customer) private customerM: typeof Customer,
    @InjectModel(Product) private productM: typeof Product,
    @InjectModel(StockItem) private stockM: typeof StockItem,
    private sequelize: Sequelize,
  ) {}

  async getKpis() {
    const [salesResult] = await this.sequelize.query(
      "SELECT COALESCE(SUM(total), 0) as total_sales FROM orders WHERE status IN ('paid','preparing','shipped','in_transit','delivered') AND paid = true",
    );
    const totalSales = Number((salesResult as any[])[0]?.total_sales || 0);

    const [monthlyResult] = await this.sequelize.query(
      "SELECT COALESCE(SUM(total), 0) as monthly_sales FROM orders WHERE status IN ('paid','preparing','shipped','in_transit','delivered') AND paid = true AND created_at >= NOW() - INTERVAL '30 days'",
    );
    const monthlySales = Number((monthlyResult as any[])[0]?.monthly_sales || 0);

    const [ordersResult] = await this.sequelize.query(
      "SELECT COUNT(*) as total FROM orders WHERE status IN ('pending','confirmed','paid','preparing','shipped','in_transit')",
    );
    const pendingOrders = Number((ordersResult as any[])[0]?.total || 0);

    const [completedResult] = await this.sequelize.query("SELECT COUNT(*) as total FROM orders WHERE status = 'delivered'");
    const completedOrders = Number((completedResult as any[])[0]?.total || 0);

    const totalProducts = await this.productM.count();
    const totalCustomers = await this.customerM.count();

    const [criticalResult] = await this.sequelize.query(
      'SELECT COUNT(*) as total FROM stock_items WHERE quantity > 0 AND quantity <= min_stock',
    );
    const criticalItems = Number((criticalResult as any[])[0]?.total || 0);

    const [outOfStockResult] = await this.sequelize.query('SELECT COUNT(*) as total FROM stock_items WHERE quantity = 0');
    const outOfStock = Number((outOfStockResult as any[])[0]?.total || 0);

    return {
      totalSales,
      monthlySales,
      pendingOrders,
      completedOrders,
      totalProducts,
      totalCustomers,
      criticalItems,
      outOfStock,
    };
  }
}
