import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppConfigModule } from './config/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { IamModule } from './modules/iam/iam.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { TextileModule } from './modules/textile/textile.module';
import { CrmModule } from './modules/crm/crm.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { LogisticsModule } from './modules/logistics/logistics.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { CmsModule } from './modules/cms/cms.module';
import { AuditModule } from './modules/audit/audit.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { StorageModule } from './shared/storage/storage.module';
import { RedisModule } from './shared/redis/redis.module';
import { IdempotencyModule } from './shared/idempotency/idempotency.module';
import { RedisService } from './shared/redis/redis.service';
import { RedisThrottlerStorage } from './shared/redis/redis-throttler-storage';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ActorGuard } from './common/guards/actor.guard';

@Module({
  imports: [
    AppConfigModule,
    TerminusModule,
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: [RedisService],
      useFactory: (redis: RedisService) => ({
        throttlers: [
          { name: 'short', ttl: 1000, limit: 3 },
          { name: 'medium', ttl: 10000, limit: 20 },
          { name: 'long', ttl: 60000, limit: 100 },
        ],
        storage: new RedisThrottlerStorage(redis),
      }),
    }),
    SequelizeModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') === 'development',
        pool: {
          max: 25,
          min: 5,
          acquire: 30000,
          idle: 10000,
        },
      }),
    }),
    IamModule,
    AuthModule,
    CatalogModule,
    TextileModule,
    CrmModule,
    CustomersModule,
    OrdersModule,
    PaymentsModule,
    InventoryModule,
    LogisticsModule,
    MarketingModule,
    CmsModule,
    AuditModule,
    SettingsModule,
    AnalyticsModule,
    StorageModule,
    RedisModule,
    IdempotencyModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: ActorGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
