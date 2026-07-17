import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../iam/entities/user.entity';
import { Role } from '../iam/entities/role.entity';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Customer) private customerModel: typeof Customer,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string, remember = false) {
    const user = await this.userModel.findOne({ where: { email }, include: [Role] });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    if (user.status !== 'active') throw new UnauthorizedException('Cuenta desactivada. Contacte a soporte');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, email: user.email, role: user.role?.name, type: 'staff' as const };
    const accessExp = this.configService.get<string>('JWT_ACCESS_EXPIRATION', '15m');
    const refreshExp = remember
      ? this.configService.get<string>('JWT_REMEMBER_EXPIRATION', '30d')
      : this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d');

    const accessToken = this.jwtService.sign(payload, { expiresIn: accessExp as any });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: refreshExp as any });

    await user.update({ lastAccessAt: new Date() });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role?.name },
    };
  }

  async customerLogin(email: string, password: string) {
    const customer = await this.customerModel.findOne({ where: { email } });
    if (!customer) throw new UnauthorizedException('Credenciales incorrectas');

    const valid = await bcrypt.compare(password, customer.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: customer.id, email: customer.email, type: 'customer' as const };
    const accessExp = this.configService.get<string>('JWT_ACCESS_EXPIRATION', '15m');
    const refreshExp = this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d');

    const accessToken = this.jwtService.sign(payload, { expiresIn: accessExp as any });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: refreshExp as any });

    return {
      accessToken,
      refreshToken,
      user: { id: customer.id, name: `${customer.firstName} ${customer.lastName}`, email: customer.email },
    };
  }

  async getProfile(userId: string) {
    const u = await this.userModel.findByPk(userId, {
      include: [Role],
      attributes: { exclude: ['password'] },
    });
    if (!u) throw new UnauthorizedException();
    return u;
  }

  async getCustomerProfile(customerId: string) {
    const c = await this.customerModel.findByPk(customerId, {
      attributes: { exclude: ['password'] },
    });
    if (!c) throw new UnauthorizedException();
    return c;
  }
}
