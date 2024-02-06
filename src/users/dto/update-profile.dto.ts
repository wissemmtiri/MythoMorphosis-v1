import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { Gender } from 'src/enums/gender.enum';

export class updateProfileDto {
  @IsOptional()
  @IsString()
  profileImage: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(Gender, {
    message: 'Gender can take only MALE or FEMALE as values.',
  })
  gender: Gender;

  @IsOptional()
  @IsEnum(FitnessLevel, {
    message:
      'Fitness Level can take only BEGINNER, INTERMEDIATE or ADVANCED as values.',
  })
  fitnessLevel: FitnessLevel;
}
