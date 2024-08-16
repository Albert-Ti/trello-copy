import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'username должен быть строкой' })
  username: string;

  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @IsNotEmpty({ message: 'password не должен быть пустым' })
  password: string;

  @IsOptional()
  @IsUrl({}, { message: 'avatar должен быть ссылкой' })
  avatar: string;
}
