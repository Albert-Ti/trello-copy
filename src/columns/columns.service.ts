import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/users.entity';
import { CreateColumDto } from './dto/create-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colum } from './entity/columns.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Colum)
    private readonly columnsRepository: Repository<Colum>,
  ) {}

  async create(authUser: Omit<User, 'password'>, dto: CreateColumDto) {
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
