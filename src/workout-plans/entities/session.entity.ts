import { TimestampEntities } from 'src/generics/timestamp.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { ExerciseInSession } from './exercise-in-session.entity';

@Entity('sessions')
export class Session extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ExerciseInSession,
    (exerciseInSession) => exerciseInSession.session,
    {
      eager: true,
    },
  )
  exercises: ExerciseInSession[];

  @ManyToOne(() => WorkoutPlan, (workoutplan) => workoutplan.sessions)
  @JoinColumn({ name: 'workoutplanId' })
  workoutplan: WorkoutPlan;
}
