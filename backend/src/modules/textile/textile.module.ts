import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextileController } from './textile.controller';
import { TextileService } from './textile.service';
import { FiberMaterial } from './entities/fiber-material.entity';
import { TextileColor } from './entities/textile-color.entity';
import { TextileSize } from './entities/textile-size.entity';
import { Season } from './entities/season.entity';

@Module({
  imports: [SequelizeModule.forFeature([FiberMaterial, TextileColor, TextileSize, Season])],
  controllers: [TextileController],
  providers: [TextileService],
  exports: [SequelizeModule],
})
export class TextileModule {}
