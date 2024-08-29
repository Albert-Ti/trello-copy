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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { CardsService } from './cards.service';
import { CreateCardsDto } from './dto/create-dto';
import { UpdateCardsDto } from './dto/update-dto';

@ApiBearerAuth('access-token')
@ApiTags('Карточки')
@UseGuards(JwtAuthGuard)
@Controller('columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Создание карточку для определенной колонки' })
  @Post()
  async create(
    @Param('columnId') columnId: number,
    @Body() dto: CreateCardsDto,
  ) {
    return await this.cardsService.create(columnId, dto);
  }

  @ApiOperation({ summary: 'Изменение карточку по идентификатору' })
  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body()
    dto: UpdateCardsDto,
  ) {
    return await this.cardsService.update(req.user, id, dto);
  }

  @ApiOperation({ summary: 'Удаление карточку по идентификатору' })
  @Delete(':id')
  async remove(@Req() req: RequestWithUser, @Param('id') id: number) {
    return await this.cardsService.remove(req.user, id);
  }
}
