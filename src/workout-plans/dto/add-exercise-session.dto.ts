import { IsNumber } from 'class-validator';

export class AddExerciseToSessionDto {
  @IsNumber()
  exerciseId: number;

  @IsNumber()
  sets: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  weight: number;
}
