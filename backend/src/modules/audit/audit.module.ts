import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [SequelizeModule.forFeature([AuditLog])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [SequelizeModule],
})
export class AuditModule {}
