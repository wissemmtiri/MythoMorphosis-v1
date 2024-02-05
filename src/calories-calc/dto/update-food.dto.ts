import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFoodDto {
  @IsOptional()
  @IsNumber()
  calories: number;

  @IsOptional()
  @IsNumber()
  protein: number;

  @IsOptional()
  @IsNumber()
  carbs: number;

  @IsOptional()
  @IsNumber()
  fats: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  imageUrl: string;
}
