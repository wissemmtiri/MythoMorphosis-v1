import { IsNumber, IsPositive } from 'class-validator';

export class updateDietLogDto {
  @IsNumber()
  @IsPositive()
  dailyIntake: number;
}
