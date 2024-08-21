import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { Repository } from 'typeorm';
import { CreateCommentsDto } from './dto/create-dto';
import { CommentEntity } from './entity/comments.entity';
import { UserEntity } from 'src/users/entity/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    private readonly cardsService: CardsService,
  ) {}

  async create(
    authorizedUser: Omit<UserEntity, 'password'>,
    cardId: number,
    dto: CreateCommentsDto,
  ) {
    const findCard = await this.cardsService.findOne({ where: { id: cardId } });

    return await this.commentsRepository.save({
      ...dto,
      card: findCard,
      owner: authorizedUser,
    });
  }
}
