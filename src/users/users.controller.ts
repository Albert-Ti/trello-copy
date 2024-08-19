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

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.findOne({ where: { id } });
  }

  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    return await req.user;
  }

  @Patch('me')
  update(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.id, dto);
  }

  @Get('me/columns')
  async getUserColumnList(@Req() req: RequestWithUser) {
    return await this.columnsService.findMany({
      where: { owner: { id: req.user.id } },
      relations: ['owner'],
    });
  }

  @Get('me/columns/:id')
  async getUserColumn(@Param('id') id: number) {
    return await this.columnsService.getOne({ where: { id } });
  }
}
