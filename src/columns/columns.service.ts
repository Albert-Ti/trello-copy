import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizedUser } from 'src/types';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateColumnsDto } from './dto/create-dto';
import { UpdateColumnsDto } from './dto/update-dto';
import { ColumnEntity } from './entity/columns.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async create(authorizedUser: AuthorizedUser, dto: CreateColumnsDto) {
    return await this.columnsRepository.save({ ...dto, owner: authorizedUser });
  }

  async findOne(query: FindOneOptions) {
    return await this.columnsRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.columnsRepository.find(query);
  }

  async update(
    authorizedUser: AuthorizedUser,
    id: number,
    dto: UpdateColumnsDto,
  ) {
    await this.checkingColumnsOwner(authorizedUser.id, id);
    return await this.columnsRepository.update(id, dto);
  }

  async remove(authorizedUser: AuthorizedUser, id: number) {
    await this.checkingColumnsOwner(authorizedUser.id, id);
    return await this.columnsRepository.delete(id);
  }

  async checkingColumnsOwner(userId: number, columnId: number) {
    const { owner } = await this.findOne({
      where: { id: columnId },
      relations: ['owner'],
    });

    if (owner.id !== userId) {
      throw new ForbiddenException('У вас нет доступа');
    }
  }
}
