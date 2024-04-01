import { IsNumber, IsString, MaxLength } from 'class-validator';

export class AddFoodDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNumber()
  calories: number;

  @IsNumber()
  protein: number;

  @IsNumber()
  carbs: number;

  @IsNumber()
  fats: number;

  @IsString()
  @MaxLength(100)
  imageUrl: string;
}
