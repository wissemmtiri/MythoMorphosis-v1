import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class newHealthCareLogDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height: number;

  @IsNumber()
  @IsPositive()
  weight: number;
}
