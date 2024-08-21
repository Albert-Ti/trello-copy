import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
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

  async create(
    authorizedUser: Omit<UserEntity, 'password'>,
    dto: CreateColumnsDto,
  ) {
    return await this.columnsRepository.save({ ...dto, owner: authorizedUser });
  }

  async getOne(query: FindOneOptions) {
    return await this.columnsRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.columnsRepository.find(query);
  }

  async update(columnId: number, dto: UpdateColumnsDto) {
    return await this.columnsRepository.update(columnId, dto);
  }

  async remove(id: number) {
    return await this.columnsRepository.delete(id);
  }
}
