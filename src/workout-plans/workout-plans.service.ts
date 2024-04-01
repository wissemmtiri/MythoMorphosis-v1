import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { Repository } from 'typeorm';
import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { CreateWorkoutPlanDto } from './dto/add-workout-plan.dto';
import { SessionsService } from './session.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepo: Repository<WorkoutPlan>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

      const sessions_db = [];
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

  async startWokrout(workoutId: number, userId: number) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: userId,
        },
      });
      const workout_plan = await this.getWorkoutPlanById(workoutId);

      if (!user || !workout_plan) {
        throw new HttpException('Invalid Data Sent', HttpStatus.BAD_REQUEST);
      } else {
        user.workoutplan = workout_plan;
        await this.userRepo.save(user);
        return 'Workout Attached Successfully';
      }
    } catch {
      throw new HttpException(
        'Error Attaching Workout',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async detachPlan(userId: number) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['workoutplan'],
      });
      console.log(user);
      if (!user || !user.workoutplan) {
        throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
      } else {
        user.workoutplan = null;
        await this.userRepo.save(user);
        return 'Workout Plan detached successfully';
      }
    } catch {
      throw new HttpException(
        'Error Detaching the current workoutPlan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
