import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  create(@Body() data) {
    return this.usersService.create(data);
  }

  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }
}
