import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCardsDto {
  @ApiProperty({ example: 'Карточка', description: 'Заголовок' })
  @IsOptional()
  @Length(5, 30, {
    message: 'title должен быть строкой и содержать от 5 до 30 символов',
  })
  title: string;

  @ApiProperty({
    example: 'Описание задачи карточки',
    description: 'Описание',
  })
  @IsOptional()
  @IsString({ message: 'description должно быть строкой' })
  description: string;
}
