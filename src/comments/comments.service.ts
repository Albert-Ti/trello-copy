import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { AuthorizedUser } from 'src/types';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateCommentsDto } from './dto/create-dto';
import { UpdateCommentsDto } from './dto/update-dto';
import { CommentEntity } from './entity/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    private readonly cardsService: CardsService,
  ) {}

  async create(
    authorizedUser: AuthorizedUser,
    cardId: number,
    dto: CreateCommentsDto,
  ) {
    const findCard = await this.cardsService.findOne({ where: { id: cardId } });
    const parentComment = dto.parentId
      ? await this.commentsRepository.findOne({ where: { id: dto.parentId } })
      : null;

    return await this.commentsRepository.save({
      ...dto,
      card: findCard,
      owner: authorizedUser,
      parent: parentComment,
    });
  }

  async findOne(query: FindOneOptions) {
    return await this.commentsRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.commentsRepository.find(query);
  }

  async update(
    authorizedUser: AuthorizedUser,
    id: number,
    dto: UpdateCommentsDto,
  ) {
    await this.checkingCommentsOwner(authorizedUser.id, id);
    return await this.commentsRepository.update(id, dto);
  }

  async remove(authorizedUser: AuthorizedUser, id: number) {
    await this.checkingCommentsOwner(authorizedUser.id, id);
    return await this.commentsRepository.delete(id);
  }

  async checkingCommentsOwner(userId: number, commentId: number) {
    const { owner } = await this.findOne({
      where: { id: commentId },
      relations: ['owner'],
    });

    if (owner.id !== userId) {
      throw new ForbiddenException('У вас нет доступа');
    }
  }
}
