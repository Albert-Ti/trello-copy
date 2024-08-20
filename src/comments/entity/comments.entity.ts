import { IsString } from 'class-validator';
import { CardEntity } from 'src/cards/entity/cards.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'text должен быть строкой' })
  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CardEntity, (cardEntity) => cardEntity.comments)
  card: CardEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
  owner: UserEntity;
}
