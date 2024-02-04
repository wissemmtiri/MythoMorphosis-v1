import { Module } from '@nestjs/common';
import { WorkoutPlansController } from './workout-plans.controller';
import { WorkoutPlansService } from './workout-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import { SessionsService } from './session.service';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutPlan, Exercise, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [WorkoutPlansController, ExerciseController],
  providers: [
    WorkoutPlansService,
    SessionsService,
    ExerciseService,
    JwtService,
  ],
})
export class WorkoutPlansModule {}
