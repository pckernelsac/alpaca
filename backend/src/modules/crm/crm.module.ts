import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { Client } from './entities/client.entity';
import { ClientAddress } from './entities/client-address.entity';
import { ClientPaymentMethod } from './entities/client-payment-method.entity';
import { ClientNote } from './entities/client-note.entity';

@Module({
  imports: [SequelizeModule.forFeature([Client, ClientAddress, ClientPaymentMethod, ClientNote])],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [SequelizeModule],
})
export class CrmModule {}
