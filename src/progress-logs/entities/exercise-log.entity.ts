import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SessionLog } from './session-log.entity';
import { Exercise } from 'src/workout-plans/entities/exercise.entity';

@Entity('exercise_logs')
export class ExerciseLog extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reps: number;

  @Column()
  sets: number;

  @Column()
  weight: number;

  @ManyToOne(() => SessionLog, (session) => session.exercises, {
    onDelete: 'CASCADE',
  })
  session: SessionLog;

  @ManyToOne(() => Exercise, (exercise) => exercise.logs, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;
}
