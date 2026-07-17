import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ ignoreEnvFile: true })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getStatus', () => {
    it('should return API status', () => {
      const result = appController.getStatus();
      expect(result).toHaveProperty('name', 'ALPACART API');
      expect(result).toHaveProperty('status', 'running');
      expect(result).toHaveProperty('version', '1.0.0');
    });
  });
});
