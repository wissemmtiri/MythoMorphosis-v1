import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseInSession } from './entities/exercise-in-session.entity';
import { AddExerciseToSessionDto } from './dto/add-exercise-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseInSession)
    private exerciseInSessionRepository: Repository<ExerciseInSession>,
  ) {}

  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercise> {
    try {
      const exercise = await this.exerciseRepository.findOne({
        where: { id: id },
      });
      if (!exercise) {
        throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
      }
      return exercise;
    } catch {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
  }

  async addExercise(exercise: AddExerciseDto): Promise<Exercise> {
    try {
      return this.exerciseRepository.save(exercise);
    } catch (error) {
      throw new HttpException('Error adding exercise', HttpStatus.BAD_REQUEST);
    }
  }

  async updateExercise(
    exerciseId: number,
    exerciseUpdates: UpdateExerciseDto,
  ): Promise<Exercise> {
    try {
      await this.exerciseRepository.update(exerciseId, exerciseUpdates);
      return this.getExerciseById(exerciseId);
    } catch (error) {
      throw new HttpException(
        'Error updating exercise',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteExercise(exerciseId: number): Promise<string> {
    try {
      await this.exerciseRepository.delete(exerciseId);
      return `Exercise with id ${exerciseId} deleted`;
    } catch (error) {
      throw new HttpException(
        'Error deleting exercise',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async InitiateExerciseInSession(
    exerciseInSession: AddExerciseToSessionDto,
    session: Session,
  ) {
    try {
      const exercise_db = await this.getExerciseById(
        exerciseInSession.exerciseId,
      );
      const exercise_session_db = new ExerciseInSession();
      exercise_session_db.exercise = exercise_db;
      exercise_session_db.sets = exerciseInSession.sets;
      exercise_session_db.reps = exerciseInSession.reps;
      exercise_session_db.weight = exerciseInSession.weight;
      exercise_session_db.session = session;
      await this.exerciseInSessionRepository.save(exercise_session_db);
      return exercise_session_db;
    } catch {
      throw new HttpException(
        'Error adding exercise to session',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
