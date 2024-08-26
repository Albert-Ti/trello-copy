import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentsDto {
  @ApiProperty({ example: 'Задачу выполнил', description: 'Комментарий' })
  @IsOptional()
  @IsString({ message: 'text должен быть строкой' })
  text: string;
}
