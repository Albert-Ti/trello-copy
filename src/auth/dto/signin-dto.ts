import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'swagger@mail.com', description: 'Почта' })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'password не должен быть пустым' })
  @IsString({ message: 'password должен быть строкой' })
  password: string;
}
