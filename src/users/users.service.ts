import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  create(dto) {
    return { dto };
  }

  getAll() {}
}
