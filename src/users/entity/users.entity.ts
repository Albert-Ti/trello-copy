import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'username должен быть строкой' })
  @Column()
  username: string;

  @IsEmail({}, { message: 'Некорректно введен email' })
  @Column({ unique: true })
  email: string;

  @IsNotEmpty({ message: 'password не должен быть пустым' })
  @Column()
  password: string;

  @IsOptional()
  @IsUrl({}, { message: 'avatar должен быть ссылкой' })
  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
