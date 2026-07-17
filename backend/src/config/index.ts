import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '.env',
    }),
  ],
})
export class AppConfigModule {
  static getDbConfig(configService: ConfigService) {
    return {
      dialect: 'postgres' as const,
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      autoLoadModels: true,
      synchronize: false,
      logging: configService.get<string>('NODE_ENV') === 'development' ? console.log : false,
    };
  }
}
