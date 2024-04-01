import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/add-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { ExerciseService } from './exercise.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private exerciseService: ExerciseService,
  ) {}
  async initiateSession(session: CreateSessionDto, WorkoutPlan: WorkoutPlan) {
    try {
      let newSession_db = new Session();
      newSession_db.name = session.name;
      newSession_db.workoutplan = WorkoutPlan;
      newSession_db = await this.sessionRepository.save(newSession_db);

      const exercises_db = [];
      session.exercises.forEach((exercise) => {
        exercises_db.push(
          this.exerciseService.InitiateExerciseInSession(
            exercise,
            newSession_db,
          ),
        );
      });

      newSession_db.exercises = await Promise.all(exercises_db);
      return await this.sessionRepository.save(newSession_db);
    } catch {}
  }
}
