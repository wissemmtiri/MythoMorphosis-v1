import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { CreateSessionDto } from './add-session.dto';
import { Type } from 'class-transformer';

export class CreateWorkoutPlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  frequency: number;

  @IsNotEmpty()
  @IsEnum(FitnessLevel, {
    message: `Invalid fitness level. Valids options are: ${Object.values(FitnessLevel)}`,
  })
  level: FitnessLevel;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSessionDto)
  Sessions: CreateSessionDto[];
}
