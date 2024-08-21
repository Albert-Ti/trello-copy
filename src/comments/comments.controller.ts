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
import { CreateCommentsDto } from './dto/create-dto';
import { UpdateCommentsDto } from './dto/update-dto';
import { CommentsService } from './comments.service';
import { RequestWithUser } from 'src/types';

@ApiTags('Комментарии')
@UseGuards(AuthGuard)
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
  async update(@Param('id') id: number, dto: UpdateCommentsDto) {}

  @ApiOperation({ summary: 'Удаление комментария по идентификатору' })
  @Delete(':id')
  async remove(@Param('id') id: number) {}
}
