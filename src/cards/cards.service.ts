import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCardsDto } from './dto/create-dto';
import { CardEntity } from './entity/cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardsRepository: Repository<CardEntity>,
    private readonly columnsService: ColumnsService,
  ) {}

  async create(columnId: number, dto: CreateCardsDto) {
    const findColumn = await this.columnsService.getOne({
      where: { id: columnId },
    });
    if (!findColumn) {
      throw new NotFoundException('нет доступа');
    }
    return await this.cardsRepository.save({ ...dto, column: findColumn });
  }

  async findOne(query: FindOneOptions) {
    return await this.cardsRepository.findOne(query);
  }
}
