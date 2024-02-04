import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { CreateSessionDto } from './add-session.dto';

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

  @IsNotEmpty()
  Sessions: CreateSessionDto[];
}
