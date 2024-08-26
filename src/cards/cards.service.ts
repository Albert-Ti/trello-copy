import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { AuthorizedUser } from 'src/types';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateCardsDto } from './dto/create-dto';
import { UpdateCardsDto } from './dto/update-dto';
import { CardEntity } from './entity/cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardsRepository: Repository<CardEntity>,
    private readonly columnsService: ColumnsService,
  ) {}

  async create(columnId: number, dto: CreateCardsDto) {
    const findColumn = await this.columnsService.findOne({
      where: { id: columnId },
    });
    if (!findColumn) {
      throw new NotFoundException('Сначала нужно создать колонку');
    }
    return await this.cardsRepository.save({ ...dto, column: findColumn });
  }

  async findOne(query: FindOneOptions) {
    return await this.cardsRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.cardsRepository.find(query);
  }

  async update(
    authorizedUser: AuthorizedUser,
    id: number,
    dto: UpdateCardsDto,
  ) {
    await this.checkingCardOwner(authorizedUser.id, id);
    return await this.cardsRepository.update(id, dto);
  }

  async remove(authorizedUser: AuthorizedUser, id: number) {
    await this.checkingCardOwner(authorizedUser.id, id);
    return await this.cardsRepository.delete(id);
  }

  async checkingCardOwner(userId: number, cardId: number) {
    const { column } = await this.findOne({
      where: { id: cardId },
      relations: ['column.owner'],
    });

    if (column.owner.id !== userId) {
      throw new NotFoundException('У вас нет доступа');
    }
  }
}
