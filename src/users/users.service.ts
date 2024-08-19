import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { password, ...result } = await this.usersRepository.save({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    return result;
  }

  async findOne(query: FindOneOptions) {
    return await this.usersRepository.findOne(query);
  }

  async update(userId: number, dto: UpdateUserDto) {
    if (dto.password) {
      return await this.usersRepository.update(userId, {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      });
    }

    return await this.usersRepository.update(userId, dto);
  }
}
