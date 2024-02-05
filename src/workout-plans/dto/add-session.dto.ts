import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { AddExerciseToSessionDto } from './add-exercise-session.dto';
import { Type } from 'class-transformer';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddExerciseToSessionDto)
  exercises: AddExerciseToSessionDto[];
}
