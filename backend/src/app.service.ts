import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getStatus() {
    return {
      name: 'ALPACART API',
      status: 'running',
      version: '1.0.0',
    };
  }
}
