import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { Repository } from 'typeorm';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { CreateWorkoutPlanDto } from './dto/add-workout-plan.dto';
import { SessionsService } from './session.service';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepo: Repository<WorkoutPlan>,
    private sessionService: SessionsService,
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

  async addWorkoutPlan(workoutPlan: CreateWorkoutPlanDto) {
    try {
      let workoutplan_db = new WorkoutPlan();
      workoutplan_db.title = workoutPlan.title;
      workoutplan_db.description = workoutPlan.description;
      workoutplan_db.duration = workoutPlan.duration;
      workoutplan_db.frequency = workoutPlan.frequency;
      workoutplan_db.level = workoutPlan.level;
      workoutplan_db = await this.workoutPlanRepo.save(workoutplan_db);

      let sessions_db = [];
      workoutPlan.Sessions.forEach((session) => {
        sessions_db.push(
          this.sessionService.initiateSession(session, workoutplan_db),
        );
      });

      workoutplan_db.sessions = await Promise.all(sessions_db);
      await this.workoutPlanRepo.save(workoutplan_db);
      return workoutplan_db;
    } catch {
      throw new HttpException(
        'Error adding the workout plan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateWorkoutPlan(id: number, workoutUpdates: any) {
    return await this.workoutPlanRepo.update(id, workoutUpdates);
  }

  async deleteWorkoutPlan(id: number) {
    return await this.workoutPlanRepo.delete(id);
  }
}
