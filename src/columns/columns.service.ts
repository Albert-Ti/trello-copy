import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/users.entity';
import { CreateColumDto } from './dto/create-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entity/columns.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async create(authUser: Omit<UserEntity, 'password'>, dto: CreateColumDto) {
    return await this.columnsRepository.save({ ...dto, owner: authUser });
  }

  async getOne(query: FindOneOptions) {
    return await this.columnsRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.columnsRepository.find(query);
  }

  async remove(id: number) {
    return await this.columnsRepository.delete(id);
  }
}
