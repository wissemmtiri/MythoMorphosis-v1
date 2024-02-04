import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';
import { TimestampEntities } from 'src/generics/timestamp.entities';
import { WorkoutLog } from 'src/progress-logs/entities/workout-log.entity';
import { WorkoutPlan } from 'src/workout-plans/entities/workout-plan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends TimestampEntities {
  //---------------------------------------------
  @PrimaryGeneratedColumn()
  id: number;
  //---------------------------------------------
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    nullable: true,
  })
  profileImage: string;
  //---------------------------------------------
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  //---------------------------------------------
  @Column({
    default: Role.USER,
  })
  role: Role;
  //---------------------------------------------
  @Column({
    nullable: true,
  })
  gender: Gender;

  @Column({
    nullable: true,
  })
  fitnessLevel: FitnessLevel;

  @Column()
  location: string;
  //---------------------------------------------

  @ManyToOne(() => WorkoutPlan, (workoutplan) => workoutplan.users)
  workoutplan: WorkoutPlan;

  @OneToMany(() => WorkoutLog, (workoutlog) => workoutlog.user)
  workoutLogs: WorkoutLog[];
}
