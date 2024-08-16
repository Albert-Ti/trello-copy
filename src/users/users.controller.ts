import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-dto';
import { ColumnService } from 'src/column/column.service';
import { AuthGuard } from 'src/guards/jwt-auth.cuard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnService: ColumnService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.usersService.getOne({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id') id, @Body() dto: UpdateUserDto) {
    return this.usersService.update(dto);
  }

  @Get(':id/columns')
  getUserColumn(@Param('id') id: number) {}

  @Delete(':id/columns/:id')
  removeColumn(@Param() params: { userId: number; columnId: number }) {}
}
