import { Controller, Post, Delete, Param, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService, UploadResult } from './storage.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

const MIME_TYPE_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'application/pdf': 'pdf',
};

const MAX_SIZES: Record<string, number> = {
  avatar: 2 * 1024 * 1024,
  logo: 5 * 1024 * 1024,
};

@ApiTags('Storage')
@Controller('upload')
export class StorageController {
  constructor(private readonly storage: StorageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subir archivo' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
    @Query('type') type?: string,
  ): Promise<UploadResult> {
    if (!file) throw new BadRequestException('File is required');

    const ext = MIME_TYPE_MAP[file.mimetype];
    if (!ext) throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);

    const maxSize = type && type in MAX_SIZES ? MAX_SIZES[type] : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(`File exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
    }

    return this.storage.upload({
      buffer: file.buffer,
      originalName: `file.${ext}`,
      mimeType: file.mimetype,
      folder: folder || type || 'general',
      isPublic: type !== 'private',
    });
  }

  @Public()
  @Post('public')
  @ApiOperation({ summary: 'Subir archivo público (sin auth)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublic(@UploadedFile() file: Express.Multer.File): Promise<UploadResult> {
    if (!file) throw new BadRequestException('File is required');
    const ext = MIME_TYPE_MAP[file.mimetype];
    if (!ext) throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);
    return this.storage.upload({
      buffer: file.buffer,
      originalName: `file.${ext}`,
      mimeType: file.mimetype,
      folder: 'public',
      isPublic: true,
    });
  }

  @Delete(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar archivo' })
  async delete(@Param('key') key: string, @Query('bucket') bucket?: string): Promise<void> {
    await this.storage.delete(key, bucket);
  }
}
