import { IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  content: string;

  @IsOptional()
  imageUrl: string;
}
