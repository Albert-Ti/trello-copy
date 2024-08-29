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
import { CreateCommentsDto } from './dto/create-dto';
import { UpdateCommentsDto } from './dto/update-dto';
import { CommentsService } from './comments.service';
import { RequestWithUser } from 'src/types';

@ApiBearerAuth('access-token')
@ApiTags('Комментарии')
@UseGuards(JwtAuthGuard)
@Controller('cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Создание комментария для определенной колонки' })
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Param('cardId') cardId: number,
    @Body() dto: CreateCommentsDto,
  ) {
    return await this.commentsService.create(req.user, cardId, dto);
  }

  @ApiOperation({ summary: 'Изменение комментария по идентификатору' })
  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: UpdateCommentsDto,
  ) {
    return await this.commentsService.update(req.user, id, dto);
  }

  @ApiOperation({ summary: 'Удаление комментария по идентификатору' })
  @Delete(':id')
  async remove(@Req() req: RequestWithUser, @Param('id') id: number) {
    return await this.commentsService.remove(req.user, id);
  }
}
