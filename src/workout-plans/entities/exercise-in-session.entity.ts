import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from './exercise.entity';
import { Session } from './session.entity';

@Entity('exercises_in_sessions')
export class ExerciseInSession extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reps: number;

  @Column()
  sets: number;

  @Column()
  weight: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.sessions, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @ManyToOne(() => Session, (session) => session.exercises, {
    onDelete: 'CASCADE',
  })
  session: Session;
}
