import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionLog } from './session-log.entity';

@Entity('workout_logs')
export class WorkoutLog extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workoutId: number;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @Column({
    default: true,
  })
  isCurrent: boolean;

  @ManyToOne(() => User, (user) => user.workoutLogs)
  user: User;

  @OneToMany(() => SessionLog, (session) => session.workoutLog)
  sessions: SessionLog[];
}
