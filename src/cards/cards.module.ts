import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardEntity } from './entity/cards.entity';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), ColumnsModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
