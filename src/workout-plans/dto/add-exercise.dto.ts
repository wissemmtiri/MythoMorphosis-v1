import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  muscleGroup: string;
}
