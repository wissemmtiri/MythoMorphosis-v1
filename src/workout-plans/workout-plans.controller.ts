import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WorkoutPlansService } from './workout-plans.service';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { FitnessLevelPipe } from 'src/pipes/fitness-level.pipe';
import { CreateWorkoutPlanDto } from './dto/add-workout-plan.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('workout-plans')
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}
  //-------------------------------PLANS--------------------------------
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllWorkoutPlans() {
    return this.workoutPlansService.getAllWorkoutPlans();
  }

  @Get('level/:level')
  async getWorkoutPlansByLevel(
    @Param('level', FitnessLevelPipe) level: FitnessLevel,
  ) {
    return this.workoutPlansService.getWorkoutPlansByLevel(level);
  }

  @Get(':id')
  async getWorkoutPlanById(@Param('id', ParseIntPipe) id: number) {
    return this.workoutPlansService.getWorkoutPlanById(id);
  }

  @Post('add')
  async addWorkoutPlan(@Body() workoutPlan: CreateWorkoutPlanDto) {
    return this.workoutPlansService.addWorkoutPlan(workoutPlan);
  }

  @Put('update/:id')
  async updateWorkoutPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body('workout_plan') workoutUpdates: any,
  ) {
    return this.workoutPlansService.updateWorkoutPlan(id, workoutUpdates);
  }

  @Delete('delete/:id')
  async deleteWorkoutPlan(@Param('id', ParseIntPipe) id: number) {
    return this.workoutPlansService.deleteWorkoutPlan(id);
  }

  @UseGuards(UserGuard)
  @Post('choose-plan')
  async choosePlan(
    @Body('id', ParseIntPipe) workoutId: number,
    @CurrentUser() userDetails: CurrentUserDto
  ){
    return this.workoutPlansService.startWokrout(workoutId, userDetails.userId);
  }

  @UseGuards(UserGuard)
  @Post('detach-plan')
  async detachPlan(@CurrentUser() userDetails: CurrentUserDto){
    return this.workoutPlansService.detachPlan(userDetails.userId);
  }
}
