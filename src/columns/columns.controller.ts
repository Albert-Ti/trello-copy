import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/create-dto';
import { UpdateColumnsDto } from './dto/update-dto';

@ApiTags('Колонки')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание колонки' })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: RequestWithUser, @Body() dto: CreateColumnsDto) {
    return await this.columnsService.create(req.user, dto);
  }

  @ApiOperation({ summary: 'Изменить колонку по идентификатору' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, dto: UpdateColumnsDto) {
    return await this.columnsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удалить колонку по идентификатору' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.columnsService.remove(id);
  }
}
