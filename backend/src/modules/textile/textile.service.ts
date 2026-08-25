import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FiberMaterial } from './entities/fiber-material.entity';
import { TextileColor } from './entities/textile-color.entity';
import { TextileSize } from './entities/textile-size.entity';
import { Season } from './entities/season.entity';

@Injectable()
export class TextileService {
  constructor(
    @InjectModel(FiberMaterial) private materialModel: typeof FiberMaterial,
    @InjectModel(TextileColor) private colorModel: typeof TextileColor,
    @InjectModel(TextileSize) private sizeModel: typeof TextileSize,
    @InjectModel(Season) private seasonModel: typeof Season,
  ) {}

  async findAllMaterials() {
    return this.materialModel.findAll({ where: { active: true } });
  }
  async findAllColors() {
    return this.colorModel.findAll({ where: { active: true } });
  }
  async findAllSizes() {
    return this.sizeModel.findAll({ order: [['order', 'ASC']] });
  }
  async findAllSeasons() {
    return this.seasonModel.findAll({ where: { active: true } });
  }
}
