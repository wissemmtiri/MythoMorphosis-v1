import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { Repository } from 'typeorm';
import { FitnessLevel } from 'src/enums/fitness-level.enum';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepo: Repository<WorkoutPlan>,
  ) {}

  async getAllWorkoutPlans() {
    return await this.workoutPlanRepo.find({ relations: ['sessions'] });
  }

  async getWorkoutPlansByLevel(level: FitnessLevel) {
    return await this.workoutPlanRepo.find({ where: { level: level } });
  }

  async getWorkoutPlanById(id: number) {
    return await this.workoutPlanRepo.findOne({ where: { id: id } });
  }

  async addWorkoutPlan(workoutPlan: any) {
    return await this.workoutPlanRepo.save(workoutPlan);
  }

  async updateWorkoutPlan(id: number, workoutUpdates: any) {
    return await this.workoutPlanRepo.update(id, workoutUpdates);
  }

  async deleteWorkoutPlan(id: number) {
    return await this.workoutPlanRepo.delete(id);
  }
}
