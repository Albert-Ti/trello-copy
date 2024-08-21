import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCardsDto } from './dto/create-dto';
import { UpdateCardsDto } from './dto/update-dto';
import { CardsService } from './cards.service';

@ApiTags('Карточки')
@UseGuards(AuthGuard)
@Controller('columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Создание карточки для определенной колонки' })
  @Post()
  async create(
    @Param('columnId') columnId: number,
    @Body() dto: CreateCardsDto,
  ) {
    return await this.cardsService.create(columnId, dto);
  }

  @ApiOperation({ summary: 'Изменение карточки по идентификатору' })
  @Patch(':id')
  async update(@Param('id') id: number, dto: UpdateCardsDto) {}

  @ApiOperation({ summary: 'Удаление карточки по идентификатору' })
  @Delete(':id')
  async remove(@Param('id') id: number) {}
}
