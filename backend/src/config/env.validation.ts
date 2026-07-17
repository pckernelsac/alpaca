import { IsEnum, IsInt, IsString, IsOptional, Min, Max, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  PORT: number = 8000;

  @IsString()
  API_PREFIX: string = 'api/v1';

  @IsString()
  CORS_ORIGINS: string = 'http://localhost:5173,http://localhost:3101,http://localhost:3102';

  @IsString()
  DB_HOST: string = 'localhost';

  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  DB_PORT: number = 5432;

  @IsString()
  DB_USERNAME: string = 'alpacart';

  @IsString()
  DB_PASSWORD: string = 'alpacart';

  @IsString()
  DB_NAME: string = 'alpacart';

  @IsString()
  @IsOptional()
  STORAGE_ENDPOINT: string = 'http://localhost:9000';

  @IsString()
  @IsOptional()
  STORAGE_ACCESS_KEY: string = 'minioadmin';

  @IsString()
  @IsOptional()
  STORAGE_SECRET_KEY: string = 'minioadmin';

  @IsString()
  @IsOptional()
  STORAGE_PUBLIC_BUCKET: string = 'alpacart-public';

  @IsString()
  @IsOptional()
  STORAGE_PRIVATE_BUCKET: string = 'alpacart-private';

  @IsString()
  @IsOptional()
  REDIS_HOST: string = 'localhost';

  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  REDIS_PORT: number = 6379;

  @IsString()
  JWT_SECRET: string = 'alpacart-dev-secret-change-in-production';

  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRATION: string = '15m';

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRATION: string = '7d';

  @IsString()
  @IsOptional()
  JWT_REMEMBER_EXPIRATION: string = '30d';

  @IsString()
  @IsOptional()
  STRIPE_SECRET_KEY: string = 'sk_test_placeholder';

  @IsString()
  @IsOptional()
  STRIPE_WEBHOOK_SECRET: string = 'whsec_placeholder';
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed: ${errors
        .map((e) => Object.values(e.constraints ?? {}))
        .flat()
        .join(', ')}`,
    );
  }

  return validated;
}

export type Env = EnvironmentVariables;
