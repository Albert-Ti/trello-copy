import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'username@mail.com', description: 'Почта' })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'password не должен быть пустым' })
  password: string;
}
