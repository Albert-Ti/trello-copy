import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entity/comments.entity';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), CardsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
