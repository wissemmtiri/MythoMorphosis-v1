import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseInSession } from './exercise-in-session.entity';
import { ExerciseLog } from 'src/progress-logs/entities/exercise-log.entity';

@Entity('exercises')
export class Exercise extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  muscleGroup: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @OneToMany(
    () => ExerciseInSession,
    (exerciseInSession) => exerciseInSession.exercise,
  )
  sessions: ExerciseInSession[];

  @OneToMany(() => ExerciseLog, (log) => log.exercise)
  logs: ExerciseLog[];
}
