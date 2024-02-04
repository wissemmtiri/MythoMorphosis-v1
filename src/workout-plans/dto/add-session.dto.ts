import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AddExerciseToSessionDto } from './add-exercise-session.dto';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  exercises: AddExerciseToSessionDto[];
}
