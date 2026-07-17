import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Department } from './entities/department.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, Permission, RolePermission, Department])],
  controllers: [IamController],
  providers: [IamService],
  exports: [IamService, SequelizeModule],
})
export class IamModule {}
