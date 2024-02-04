import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { WorkoutPlansService } from './workout-plans.service';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { FitnessLevelPipe } from 'src/pipes/fitness-level.pipe';

@Controller()
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}
  //-------------------------------PLANS--------------------------------
  @Get('workout-plans/all')
  async getAllWorkoutPlans() {
    return this.workoutPlansService.getAllWorkoutPlans();
  }

  @Get('workout-plans/level/:level')
  async getWorkoutPlansByLevel(
    @Param('level', FitnessLevelPipe) level: FitnessLevel,
  ) {
    return this.workoutPlansService.getWorkoutPlansByLevel(level);
  }

  @Get('workout-plans/:id')
  async getWorkoutPlanById(@Param('id', ParseIntPipe) id: number) {
    return this.workoutPlansService.getWorkoutPlanById(id);
  }

  @Post('workout-plans/add')
  async addWorkoutPlan(@Body('workout_plan') workoutPlan: any) {
    return this.workoutPlansService.addWorkoutPlan(workoutPlan);
  }

  @Put('workout-plans/update/:id')
  async updateWorkoutPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body('workout_plan') workoutUpdates: any,
  ) {
    return this.workoutPlansService.updateWorkoutPlan(id, workoutUpdates);
  }

  @Delete('workout-plans/delete/:id')
  async deleteWorkoutPlan(@Param('id', ParseIntPipe) id: number) {
    return this.workoutPlansService.deleteWorkoutPlan(id);
  }
}
