import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { CustomerAddress } from './entities/customer-address.entity';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../catalog/entities/product.entity';
import { ProductVariant } from '../catalog/entities/product-variant.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { OrderEvent } from '../orders/entities/order-event.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';
import { Coupon } from '../marketing/entities/coupon.entity';
import { IdempotencyService } from '../../shared/idempotency/idempotency.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private c: typeof Customer,
    @InjectModel(CustomerAddress) private a: typeof CustomerAddress,
    @InjectModel(WishlistItem) private w: typeof WishlistItem,
    @InjectModel(Cart) private cartM: typeof Cart,
    @InjectModel(CartItem) private ciM: typeof CartItem,
    @InjectModel(Order) private oM: typeof Order,
    @InjectModel(OrderItem) private oiM: typeof OrderItem,
    @InjectModel(OrderEvent) private oeM: typeof OrderEvent,
    @InjectModel(StockItem) private sM: typeof StockItem,
    @InjectModel(Coupon) private coM: typeof Coupon,
    private sequelize: Sequelize,
    private idempotency: IdempotencyService,
  ) {}

  async register(data: any) {
    const password = await bcrypt.hash(data.password, 10);
    return this.c.create({ ...data, password } as any);
  }

  async getProfile(id: string) {
    const r = await this.c.findByPk(id, { include: [CustomerAddress], attributes: { exclude: ['password'] } });
    if (!r) throw new NotFoundException();
    return r;
  }

  async updateProfile(id: string, data: any) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }

  async changePassword(id: string, data: { currentPassword: string; newPassword: string }) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    const valid = await bcrypt.compare(data.currentPassword, r.password);
    if (!valid) throw new BadRequestException('Contraseña actual incorrecta');
    r.password = await bcrypt.hash(data.newPassword, 10);
    return r.save();
  }

  async getAddresses(customerId: string) {
    return this.a.findAll({ where: { customerId } });
  }
  async createAddress(customerId: string, data: any) {
    return this.a.create({ ...data, customerId } as any);
  }
  async deleteAddress(customerId: string, id: number) {
    const r = await this.a.findOne({ where: { id, customerId } });
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async getWishlist(customerId: string) {
    return this.w.findAll({ where: { customerId } });
  }
  async toggleWishlist(customerId: string, productId: string) {
    const existing = await this.w.findOne({ where: { customerId, productId } });
    if (existing) {
      await existing.destroy();
      return { removed: true };
    }
    return this.w.create({ customerId, productId } as any);
  }

  // ─── Cart ────────────────────────────────────────────────────────────
  private async getOrCreateCart(customerId: string) {
    let cart = await this.cartM.findOne({ where: { customerId }, include: [CartItem] });
    if (!cart) cart = await this.cartM.create({ customerId, subtotal: 0, total: 0 } as any);
    return cart;
  }

  async getCart(customerId: string) {
    const cart = await this.getOrCreateCart(customerId);
    return cart;
  }

  async addCartItem(customerId: string, data: { productId: string; variantId?: string; quantity: number }) {
    const product = await Product.findByPk(data.productId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (data.quantity < 1) throw new BadRequestException('Cantidad debe ser mayor a 0');

    let unitPrice = 0;
    const name = product.name;
    let sku = product.sku;
    let variantLabel = '';
    if (data.variantId) {
      const variant = await ProductVariant.findByPk(data.variantId);
      if (!variant) throw new NotFoundException('Variante no encontrada');
      unitPrice = Number(variant.price);
      sku = variant.sku;
      variantLabel = `${variant.colorName || ''} ${variant.code || ''}`.trim();
    }

    const cart = await this.getOrCreateCart(customerId);
    const existing = await this.ciM.findOne({
      where: { cartId: cart.id, productId: data.productId, variantId: data.variantId || null },
    } as any);

    let item: CartItem;
    if (existing) {
      existing.quantity += data.quantity;
      existing.total = existing.unitPrice * existing.quantity;
      await existing.save();
      item = existing;
    } else {
      item = await this.ciM.create({
        cartId: cart.id,
        productId: data.productId,
        variantId: data.variantId || null,
        name,
        sku,
        variantLabel,
        unitPrice,
        quantity: data.quantity,
        total: unitPrice * data.quantity,
      } as any);
    }

    await this.recalcCart(cart.id);
    return this.ciM.findByPk(item.id as any);
  }

  async updateCartItem(customerId: string, itemId: number, data: { quantity: number }) {
    if (data.quantity < 1) throw new BadRequestException('Cantidad debe ser mayor a 0');
    const cart = await this.getOrCreateCart(customerId);
    const item = await this.ciM.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw new NotFoundException('Item no encontrado en tu carrito');
    item.quantity = data.quantity;
    item.total = item.unitPrice * item.quantity;
    await item.save();
    await this.recalcCart(cart.id);
    return item;
  }

  async removeCartItem(customerId: string, itemId: number) {
    const cart = await this.getOrCreateCart(customerId);
    const item = await this.ciM.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw new NotFoundException('Item no encontrado en tu carrito');
    await item.destroy();
    await this.recalcCart(cart.id);
    return { removed: true };
  }

  async clearCart(customerId: string) {
    const cart = await this.getOrCreateCart(customerId);
    await this.ciM.destroy({ where: { cartId: cart.id } });
    await this.recalcCart(cart.id);
    return { cleared: true };
  }

  private async recalcCart(cartId: string) {
    const items = await this.ciM.findAll({ where: { cartId } });
    const subtotal = items.reduce((s, i) => s + Number(i.total), 0);
    await this.cartM.update({ subtotal, total: subtotal }, { where: { id: cartId } });
  }

  // ─── Checkout ─────────────────────────────────────────────────────────
  async checkout(customerId: string, data: { couponCode?: string; idempotencyKey?: string }) {
    // Idempotency check (only for requests with Idempotency-Key header)
    const idempotencyKey = data.idempotencyKey;
    let idempotencyRecord: any = undefined;
    const requestPayload = { couponCode: data.couponCode || null };
    const requestHash = this.idempotency.computeRequestHash(requestPayload);

    if (idempotencyKey) {
      const result = await this.idempotency.processKey({
        customerId,
        scope: 'checkout',
        idempotencyKey,
        requestHash,
      });
      if (!result.isNew && result.existingRecord) {
        // Replay existing result
        if (result.existingRecord.resourceId) {
          return this.oM.findByPk(result.existingRecord.resourceId, { include: [OrderItem, OrderEvent] });
        }
        return { idempotent: true, status: result.existingRecord.status };
      }
      idempotencyRecord = { key: idempotencyKey, requestHash };
    }

    const cart = await this.cartM.findOne({ where: { customerId }, include: [CartItem] });
    if (!cart || !cart.items || cart.items.length === 0) throw new BadRequestException('Carrito vacío');

    // Load products with prices from DB (server-side pricing)
    const items: {
      cartItem: CartItem;
      product: Product;
      variant: ProductVariant | null;
      unitPrice: number;
      sku: string;
      name: string;
      variantLabel: string;
    }[] = [];
    for (const ci of cart.items) {
      const product = await Product.findByPk(ci.productId);
      if (!product) throw new NotFoundException(`Producto ${ci.productId} no encontrado`);
      let unitPrice = 0;
      let sku = product.sku;
      let variantLabel = '';
      let variant: ProductVariant | null = null;
      if (ci.variantId) {
        variant = await ProductVariant.findByPk(ci.variantId);
        if (!variant) throw new NotFoundException(`Variante ${ci.variantId} no encontrada`);
        unitPrice = Number(variant.price);
        sku = variant.sku;
        variantLabel = `${variant.colorName || ''} ${variant.code || ''}`.trim();
      }
      items.push({ cartItem: ci, product, variant, unitPrice, sku, name: product.name, variantLabel });
    }

    // Validate coupon if provided
    let couponDiscount = 0;
    let couponId: number | null = null;
    if (data.couponCode) {
      const coupon = await this.coM.findOne({ where: { code: data.couponCode, active: true } });
      if (!coupon) throw new BadRequestException('Cupón no válido');
      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) throw new BadRequestException('Cupón expirado');
      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) throw new BadRequestException('Cupón agotado');
      const subtotal = items.reduce((s, i) => s + i.unitPrice * i.cartItem.quantity, 0);
      if (coupon.minPurchase && subtotal < Number(coupon.minPurchase))
        throw new BadRequestException(`Compra mínima de $${Number(coupon.minPurchase).toFixed(2)}`);
      couponDiscount = coupon.type === 'percentage' ? subtotal * (Number(coupon.value) / 100) : Number(coupon.value);
      couponId = coupon.id;
    }

    let createdOrder: any = null;

    // Execute in transaction
    await this.sequelize.transaction(async (tx) => {
      // Lock stock items deterministically (sorted by id)
      const stockIds = [...new Set(items.map((i) => i.cartItem.productId).filter(Boolean))].sort();
      const stockItems: StockItem[] = [];
      for (const pid of stockIds) {
        const [rows] = await this.sequelize.query(`SELECT * FROM stock_items WHERE product_id = :pid FOR UPDATE`, {
          replacements: { pid },
          transaction: tx,
          model: StockItem,
          mapToModel: true,
        });
        if (rows && (rows as unknown as any[]).length > 0) stockItems.push((rows as unknown as any[])[0]);
      }

      // Validate stock availability
      for (const item of items) {
        const si = stockItems.find((s) => s.productId === item.cartItem.productId);
        if (si) {
          const available = Number(si.quantity) - Number(si.reserved);
          if (item.cartItem.quantity > available) {
            throw new ConflictException(`Stock insuficiente para ${item.name}. Disponible: ${available}`);
          }
        }
      }

      // Calculate totals server-side
      const subtotal = items.reduce((s, i) => s + i.unitPrice * i.cartItem.quantity, 0);
      const discount = couponDiscount;
      const total = Math.max(0, subtotal - discount);
      const orderNumber = `ORD-${Date.now()}`;

      // Create order
      const order = await this.oM.create(
        {
          customerId,
          orderNumber,
          status: 'pending',
          subtotal,
          discount,
          total,
          placedAt: new Date(),
          ...(couponId ? { couponId } : {}),
        } as any,
        { transaction: tx },
      );

      // Create order items (server-side pricing snapshot)
      for (const item of items) {
        const lineTotal = item.unitPrice * item.cartItem.quantity;
        await this.oiM.create(
          {
            orderId: order.id,
            productId: item.cartItem.productId,
            variantId: item.cartItem.variantId || null,
            productName: item.name,
            sku: item.sku,
            variantLabel: item.variantLabel,
            unitPrice: item.unitPrice,
            quantity: item.cartItem.quantity,
            total: lineTotal,
            currency: 'USD',
          } as any,
          { transaction: tx },
        );
      }

      // Create order event
      await this.oeM.create(
        {
          orderId: order.id,
          type: 'created',
          title: 'Pedido Creado',
          description: 'Checkout completado exitosamente',
        } as any,
        { transaction: tx },
      );

      // Reserve stock
      for (const item of items) {
        const si = stockItems.find((s) => s.productId === item.cartItem.productId);
        if (si) {
          await si.update({ reserved: Number(si.reserved) + item.cartItem.quantity }, { transaction: tx });
        }
      }

      // Consume coupon atomically
      if (couponId) {
        const [affected] = await this.sequelize.query(
          `UPDATE coupons SET used_count = used_count + 1 WHERE id = :id AND (max_uses IS NULL OR used_count < max_uses)`,
          { replacements: { id: couponId }, transaction: tx },
        );
        const rowCount = (affected as any)?.rowCount;
        if (rowCount === 0) {
          throw new ConflictException('Cupón agotado');
        }
      }

      // Clear cart
      await this.ciM.destroy({ where: { cartId: cart.id }, transaction: tx });
      await this.cartM.update({ subtotal: 0, total: 0 }, { where: { id: cart.id }, transaction: tx });

      createdOrder = order;
    });

    // Mark idempotency as completed after successful transaction
    if (idempotencyRecord && createdOrder?.id && idempotencyKey) {
      await this.idempotency.complete(idempotencyKey, customerId, 'checkout', createdOrder.id, 201, { success: true });
    }

    return createdOrder;
  }
}
