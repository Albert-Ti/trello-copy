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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Пользователи')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
  ) {}

  @ApiOperation({ summary: 'Получить авторизованного пользователя' })
  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    return await req.user;
  }

  @ApiOperation({ summary: 'Найти пользователя по имени' })
  @Get('find/:username')
  async findUsername(@Param('username') username: string) {
    return await this.usersService.findOne({
      where: { username },
      select: { password: false },
    });
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
      relations: ['owner', 'cards', 'cards.comments.replies'],
    });
  }

  @ApiOperation({
    summary: 'Получить колонку по идентификатору авторизованного пользователя',
  })
  @Get('me/columns/:id')
  async getUserColumn(@Param('id') id: number) {
    return await this.columnsService.findOne({
      where: { id },
      relations: ['owner', 'cards', 'cards.comments', 'cards.comments'],
    });
  }
}
