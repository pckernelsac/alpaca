import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../iam/entities/user.entity';
import { Role } from '../../iam/entities/role.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Customer) private customerModel: typeof Customer,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: { sub: string; type: string }) {
    if (payload.type === 'staff') {
      const staff = await this.userModel.findByPk(payload.sub, { include: [Role] });
      if (!staff || staff.status !== 'active') throw new UnauthorizedException();
      return { id: staff.id, name: staff.name, email: staff.email, role: staff.role?.name, type: 'staff' };
    }
    if (payload.type === 'customer') {
      const customer = await this.customerModel.findByPk(payload.sub);
      if (!customer) throw new UnauthorizedException();
      return { id: customer.id, name: `${customer.firstName} ${customer.lastName}`, email: customer.email, type: 'customer' };
    }
    throw new UnauthorizedException();
  }
}
