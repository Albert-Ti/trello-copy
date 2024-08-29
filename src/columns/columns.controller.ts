import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/create-dto';
import { UpdateColumnsDto } from './dto/update-dto';

@ApiBearerAuth('access-token')
@ApiTags('Колонки')
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание колонки' })
  @Post()
  async create(@Req() req: RequestWithUser, @Body() dto: CreateColumnsDto) {
    return await this.columnsService.create(req.user, dto);
  }

  @ApiOperation({ summary: 'Изменить колонку по идентификатору' })
  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: UpdateColumnsDto,
  ) {
    return await this.columnsService.update(req.user, id, dto);
  }

  @ApiOperation({ summary: 'Удалить колонку по идентификатору' })
  @Delete(':id')
  async remove(@Req() req: RequestWithUser, @Param('id') id: number) {
    return await this.columnsService.remove(req.user, id);
  }
}
