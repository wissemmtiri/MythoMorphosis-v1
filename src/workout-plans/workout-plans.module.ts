import { Module } from '@nestjs/common';
import { WorkoutPlansController } from './workout-plans.controller';
import { WorkoutPlansService } from './workout-plans.service';

@Module({
  controllers: [WorkoutPlansController],
  providers: [WorkoutPlansService]
})
export class WorkoutPlansModule {}
