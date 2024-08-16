import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'username должен быть строкой' })
  username?: string;

  @IsEmail({}, { message: 'Некорректно введен email' })
  email?: string;
}
