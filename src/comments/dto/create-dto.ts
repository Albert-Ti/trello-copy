import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsString({ message: 'text должен быть строкой' })
  text: string;

  @IsOptional()
  @IsNumber({}, { message: 'parentId должен быть числом' })
  parentId?: number;
}
