import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const configService = app.get(ConfigService);

  const prefix = configService.get<string>('API_PREFIX', 'api/v1');
  const port = configService.get<number>('PORT', 8000);
  const corsOrigins = configService.get<string>('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3101,http://localhost:3102');
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Security headers
  app.use(helmet());

  // HTTP compression
  app.use(compression());

  app.setGlobalPrefix(prefix);

  app.enableCors({
    origin: corsOrigins.split(',').map((o) => o.trim()),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Graceful shutdown
  app.enableShutdownHooks();

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ALPACART API')
    .setDescription('API Backend de Alpacart — Marca premium de alpaca peruana')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${prefix}/docs`, app, document);

  await app.listen(port);

  console.log(`🚀 ALPACART API — ${nodeEnv}`);
  console.log(`   Puerto:      ${port}`);
  console.log(`   Prefijo:     /${prefix}`);
  console.log(`   URL base:    http://localhost:${port}/${prefix}`);
  console.log(`   Swagger:     http://localhost:${port}/${prefix}/docs`);
}

bootstrap();
