import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { ColumnsService } from './columns.service';
import { CreateColumDto } from './dto/create-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Колонки')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание колонки' })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: RequestWithUser, @Body() dto: CreateColumDto) {
    return await this.columnsService.create(req.user, dto);
  }

  @ApiOperation({ summary: 'Получить все колонки' })
  @Get()
  async getAll() {
    return await this.columnsService.findMany({ relations: ['owner'] });
  }

  @ApiOperation({ summary: 'Удалить колонку по идентификатору' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.columnsService.remove(id);
  }
}
