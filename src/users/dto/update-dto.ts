import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'username должен быть строкой' })
  username: string;

  @ApiProperty({ example: 'create_example@mail.com', description: 'Почта' })
  @IsOptional()
  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/300', description: 'Аватар' })
  @IsOptional()
  @IsUrl({}, { message: 'avatar должен быть ссылкой' })
  avatar: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsOptional()
  password: string;
}
