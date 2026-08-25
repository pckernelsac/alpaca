import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisThrottlerStorage {
  constructor(private redis: RedisService) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<{ totalHits: number; timeToExpire: number; isBlocked: boolean; timeToBlockExpire: number }> {
    const redisKey = `alpacart:ratelimit:${key}`;
    try {
      const hits = await this.redis.client.incr(redisKey);
      if (hits === 1) {
        await this.redis.client.pexpire(redisKey, ttl);
      }
      const pttl = await this.redis.client.pttl(redisKey);
      const timeToExpire = pttl > 0 ? Math.ceil(pttl / 1000) : Math.ceil(ttl / 1000);
      return {
        totalHits: hits,
        timeToExpire,
        isBlocked: hits > limit,
        timeToBlockExpire: hits > limit ? timeToExpire : 0,
      };
    } catch {
      return { totalHits: 1, timeToExpire: Math.ceil(ttl / 1000), isBlocked: false, timeToBlockExpire: 0 };
    }
  }
}
