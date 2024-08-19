import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { UpdateUserDto } from './dto/update-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Методы пользователя')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
  ) {}

  @ApiOperation({ summary: 'Найти пользователя по идентификатору' })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.findOne({ where: { id } });
  }

  @ApiOperation({ summary: 'Получить авторизованного пользователя' })
  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    return await req.user;
  }

  @ApiOperation({ summary: 'Изменить авторизованного пользователя' })
  @Patch('me')
  update(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.id, dto);
  }

  @ApiOperation({
    summary: 'Получить список колонок авторизованного пользователя',
  })
  @Get('me/columns')
  async getUserColumnList(@Req() req: RequestWithUser) {
    return await this.columnsService.findMany({
      where: { owner: { id: req.user.id } },
      relations: ['owner'],
    });
  }

  @ApiOperation({
    summary: 'Получить колонку по идентификатору авторизованного пользователя',
  })
  @Get('me/columns/:id')
  async getUserColumn(@Param('id') id: number) {
    return await this.columnsService.getOne({ where: { id } });
  }
}
