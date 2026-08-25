import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public readonly client: Redis;
  public isConnected = false;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);

    this.client = new Redis({
      host,
      port,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 10) {
          this.logger.warn('Redis max retries reached, giving up');
          return null;
        }
        return Math.min(times * 200, 3000);
      },
      maxRetriesPerRequest: 3,
    });

    this.client.on('connect', () => {
      this.isConnected = true;
      this.logger.log('Redis connected');
    });
    this.client.on('close', () => {
      this.isConnected = false;
      this.logger.warn('Redis connection closed');
    });
    this.client.on('error', (err) => {
      this.isConnected = false;
      this.logger.error('Redis error: ' + err.message);
    });

    this.connect();
  }

  private async connect() {
    try {
      await this.client.connect();
    } catch (e: any) {
      this.isConnected = false;
      this.logger.warn('Redis not available: ' + e.message);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isConnected) return null;
    try {
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.isConnected) return;
    try {
      if (ttl) await this.client.set(key, value, 'EX', ttl);
      else await this.client.set(key, value);
    } catch {
      /* silent */
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.del(key);
    } catch {
      /* silent */
    }
  }

  async incr(key: string): Promise<number> {
    if (!this.isConnected) return 0;
    try {
      return await this.client.incr(key);
    } catch {
      return 0;
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.expire(key, seconds);
    } catch {
      /* silent */
    }
  }

  async ttl(key: string): Promise<number> {
    if (!this.isConnected) return -2;
    try {
      return await this.client.ttl(key);
    } catch {
      return -2;
    }
  }

  onModuleDestroy() {
    if (this.isConnected) {
      this.client.disconnect();
      this.logger.log('Redis disconnected');
    }
  }
}
