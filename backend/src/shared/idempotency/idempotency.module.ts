import { Module, Global } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IdempotencyService } from './idempotency.service';
import { IdempotencyKey } from '../../modules/customers/entities/idempotency-key.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([IdempotencyKey])],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class IdempotencyModule {}
