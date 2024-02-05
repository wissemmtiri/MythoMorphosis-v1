import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  content: string;

  @IsOptional()
  imageUrl: string;
}
