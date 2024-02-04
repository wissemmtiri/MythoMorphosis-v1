import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutLog } from './workout-log.entity';
import { ExerciseLog } from './exercise-log.entity';

@Entity('session_logs')
export class SessionLog extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkoutLog, (workout) => workout.sessions)
  workoutLog: WorkoutLog;

  @OneToMany(() => ExerciseLog, (exercise) => exercise.session)
  exercises: ExerciseLog[];
}
