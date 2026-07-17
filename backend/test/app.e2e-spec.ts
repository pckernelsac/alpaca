import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ NODE_ENV: 'test', PORT: 8000, API_PREFIX: 'api/v1', CORS_ORIGINS: '*' })],
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1', () => {
    it('should return 200 and API status', async () => {
      const response = await request(app.getHttpServer()).get('/api/v1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: 'ALPACART API',
        status: 'running',
        version: '1.0.0',
      });
    });
  });
});
