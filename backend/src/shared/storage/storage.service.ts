import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';
import * as path from 'path';
import * as crypto from 'crypto';

export interface UploadOptions {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  folder?: string;
  isPublic?: boolean;
  resize?: { width?: number; height?: number; fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' };
}

export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
  size: number;
  dimensions?: { width: number; height: number };
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client: S3Client;
  private readonly publicBucket: string;
  private readonly privateBucket: string;
  private readonly endpoint: string;
  private readonly maxFileSize = 50 * 1024 * 1024;

  constructor(private configService: ConfigService) {
    this.endpoint = this.configService.get<string>('STORAGE_ENDPOINT')!;
    this.publicBucket = this.configService.get<string>('STORAGE_PUBLIC_BUCKET')!;
    this.privateBucket = this.configService.get<string>('STORAGE_PRIVATE_BUCKET')!;
    this.client = new S3Client({
      endpoint: this.endpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('STORAGE_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('STORAGE_SECRET_KEY')!,
      },
      forcePathStyle: true,
    });
  }

  async upload(options: UploadOptions): Promise<UploadResult> {
    const { buffer: rawBuffer, originalName, folder = '', isPublic = true, resize } = options;

    if (rawBuffer.length > this.maxFileSize) {
      throw new BadRequestException(`File exceeds maximum size of ${this.maxFileSize / 1024 / 1024}MB`);
    }

    const ext = path.extname(originalName).toLowerCase();
    const allowedImageExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    const isImage = allowedImageExts.includes(ext);

    let processedBuffer = rawBuffer;
    let dimensions: { width: number; height: number } | undefined;

    if (isImage && resize) {
      processedBuffer = await sharp(rawBuffer)
        .resize(resize.width, resize.height, { fit: resize.fit || 'cover', withoutEnlargement: true })
        .toBuffer();
      const meta = await sharp(processedBuffer).metadata();
      if (meta.width && meta.height) {
        dimensions = { width: meta.width, height: meta.height };
      }
    } else if (isImage && !resize) {
      const meta = await sharp(rawBuffer).metadata();
      if (meta.width && meta.height) {
        dimensions = { width: meta.width, height: meta.height };
      }
    }

    const key = folder ? `${folder}/${crypto.randomUUID()}${ext}` : `${crypto.randomUUID()}${ext}`;

    const bucket = isPublic ? this.publicBucket : this.privateBucket;

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: processedBuffer,
        ContentType: options.mimeType,
        ACL: isPublic ? 'public-read' : undefined,
      }),
    );

    this.logger.log(`Uploaded ${key} to ${bucket}`);

    return {
      url: this.getPublicUrl(key, bucket, isPublic),
      key,
      bucket,
      size: processedBuffer.length,
      dimensions,
    };
  }

  async delete(key: string, bucket?: string): Promise<void> {
    const b = bucket || this.publicBucket;
    await this.client.send(new DeleteObjectCommand({ Bucket: b, Key: key }));
    this.logger.log(`Deleted ${key} from ${b}`);
  }

  async getSignedUrl(key: string, bucket?: string, expiresIn = 3600): Promise<string> {
    const b = bucket || this.privateBucket;
    const command = new GetObjectCommand({ Bucket: b, Key: key });
    return getSignedUrl(this.client, command, { expiresIn });
  }

  getPublicUrl(key: string, bucket?: string, isPublic?: boolean): string {
    const b = bucket || (isPublic !== false ? this.publicBucket : this.privateBucket);
    return `${this.endpoint}/${b}/${key}`;
  }

  async copyFile(sourceKey: string, destKey: string, sourceBucket?: string, destBucket?: string): Promise<void> {
    const srcBucket = sourceBucket || this.privateBucket;
    const dstBucket = destBucket || this.publicBucket;
    await this.client.send(
      new CopyObjectCommand({
        Bucket: dstBucket,
        Key: destKey,
        CopySource: `/${srcBucket}/${sourceKey}`,
      }),
    );
  }

  async listFiles(prefix: string, bucket?: string): Promise<string[]> {
    const b = bucket || this.publicBucket;
    const result = await this.client.send(new ListObjectsV2Command({ Bucket: b, Prefix: prefix }));
    return (result.Contents || []).map((item) => item.Key).filter((k): k is string => !!k);
  }
}
