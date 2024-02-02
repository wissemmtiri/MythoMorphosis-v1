import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { WorkoutPlansService } from './workout-plans.service';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { FitnessLevelPipe } from 'src/pipes/fitness-level.pipe';

@Controller('workout-plans')
export class WorkoutPlansController {
    constructor(
        private readonly workoutPlansService: WorkoutPlansService
    ) { }
    
    @Get('all')
    async getAllWorkoutPlans() {
        return 'All workout plans';
    }

    @Get('level/:level')
    async getWorkoutPlansByLevel(
        @Param('level', FitnessLevelPipe) level: FitnessLevel
    ) {
        return 'Workout plans by level';
    }

    @Get(':id')
    async getWorkoutPlanById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return 'Workout plan by id';
    }

    @Post('add')
    async addWorkoutPlan() {
        return 'Workout plan added';
    }

    @Put('update/:id')
    async updateWorkoutPlan(
        @Param('id', ParseIntPipe) id: number
    ) {
        return 'Workout plan updated successfully';
    }

    @Delete('delete/:id')
    async deleteWorkoutPlan(
        @Param('id', ParseIntPipe) id: number
    ) {
        return 'Workout plan deleted successfully';
    }
}