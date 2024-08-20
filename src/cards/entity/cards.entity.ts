import { IsString } from 'class-validator';
import { ColumnEntity } from 'src/columns/entity/columns.entity';
import { CommentEntity } from 'src/comments/entity/comments.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'title должен быть строкой' })
  @Column()
  title: string;

  @IsString({ message: 'description должен быть строкой' })
  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ColumnEntity, (columEntity) => columEntity.cards)
  colum: ColumnEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.card)
  comments: CommentEntity[];
}
