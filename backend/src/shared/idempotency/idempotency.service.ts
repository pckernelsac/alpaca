import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as crypto from 'crypto';
import { IdempotencyKey } from '../../modules/customers/entities/idempotency-key.entity';

@Injectable()
export class IdempotencyService {
  constructor(
    @InjectModel(IdempotencyKey) private model: typeof IdempotencyKey,
    private sequelize: Sequelize,
  ) {}

  computeRequestHash(payload: any): string {
    return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  }

  async processKey(params: {
    customerId: string;
    scope: string;
    idempotencyKey: string;
    requestHash: string;
    ttlHours?: number;
  }): Promise<{ isNew: boolean; existingRecord?: IdempotencyKey }> {
    const { customerId, scope, idempotencyKey, requestHash, ttlHours = 24 } = params;

    // Atomic INSERT with ON CONFLICT to handle concurrency
    const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000);

    try {
      const [record, created] = await this.model.findOrCreate({
        where: { customerId, scope, idempotencyKey },
        defaults: {
          customerId,
          scope,
          idempotencyKey,
          requestHash,
          status: 'processing',
          expiresAt,
        } as any,
      });

      if (!created) {
        // Key already exists
        if (record.status === 'completed') {
          if (record.requestHash !== requestHash) {
            throw new ConflictException('Idempotency-Key already used with different payload');
          }
          return { isNew: false, existingRecord: record };
        }
        if (record.status === 'processing') {
          throw new ConflictException('Request with this Idempotency-Key is already being processed');
        }
        if (record.status === 'failed') {
          // Allow retry on failed operations
          if (record.requestHash !== requestHash) {
            throw new ConflictException('Idempotency-Key already used with different payload');
          }
          return { isNew: true, existingRecord: record };
        }
      }

      return { isNew: true };
    } catch (e) {
      if (e instanceof ConflictException) throw e;
      // Handle concurrent insert race - if unique constraint violation, retry logic
      if (e.name === 'SequelizeUniqueConstraintError') {
        const existing = await this.model.findOne({ where: { customerId, scope, idempotencyKey } });
        if (existing) {
          if (existing.status === 'completed') {
            if (existing.requestHash !== requestHash) {
              throw new ConflictException('Idempotency-Key already used with different payload');
            }
            return { isNew: false, existingRecord: existing };
          }
          throw new ConflictException('Request with this Idempotency-Key is already being processed');
        }
      }
      throw new InternalServerErrorException('Idempotency processing error');
    }
  }

  async complete(key: string, customerId: string, scope: string, resourceId: string, responseStatus: number, responseBody: any) {
    await this.model.update(
      { status: 'completed', resourceId, responseStatus, responseBody },
      { where: { idempotencyKey: key, customerId, scope } },
    );
  }

  async fail(key: string, customerId: string, scope: string) {
    await this.model.update({ status: 'failed' }, { where: { idempotencyKey: key, customerId, scope } });
  }
}
