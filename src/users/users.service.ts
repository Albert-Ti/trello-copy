import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-dto';

@Injectable()
export class UsersService {
  constructor() {}

  create(dto: CreateUserDto) {
    return { dto };
  }

  getOne(id: number) {
    return { id };
  }

  update(dto: UpdateUserDto) {
    return { dto };
  }
}
