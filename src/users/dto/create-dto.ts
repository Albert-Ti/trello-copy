import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'swagger', description: 'Имя' })
  @IsString({ message: 'username должен быть строкой' })
  username: string;

  @ApiProperty({ example: 'swagger@mail.com', description: 'Почта' })
  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'password не должен быть пустым' })
  @IsString({ message: 'password должен быть строкой' })
  password: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/300', description: 'Аватар' })
  @IsOptional()
  @IsUrl({}, { message: 'avatar должен быть ссылкой' })
  avatar: string;
}
