import { IsString } from 'class-validator';
import { CardEntity } from 'src/cards/entity/cards.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'columns' })
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'title должен быть строкой' })
  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.columns)
  owner: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
