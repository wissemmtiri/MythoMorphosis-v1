import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FitnessLevel } from 'src/enums/fitness-level.enum';

@Injectable()
export class FitnessLevelPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    switch (value) {
      case 'BEGINNER':
        return FitnessLevel.BEGINNER;
      case 'INTERMEDIATE':
        return FitnessLevel.INTERMEDIATE;
      case 'ADVANCED':
        return FitnessLevel.ADVANCED;
      default:
        return FitnessLevel.BEGINNER;
    }
  }
}
