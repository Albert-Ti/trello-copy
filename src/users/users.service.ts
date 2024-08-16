import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

  async getOne(id: number) {
    const { password, ...result } = await this.usersRepository.findOne({
      where: { id },
    });

    return result;
  }

  update(dto: UpdateUserDto) {
    return { dto };
  }
}
