import { FitnessLevel } from 'src/enums/fitness-level.enum';
import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('workout_plans')
export class WorkoutPlan extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FitnessLevel,
  })
  level: FitnessLevel;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'int',
  })
  duration: number;

  @Column({
    type: 'int',
  })
  frequency: number;

  @OneToMany(() => Session, (session) => session.workoutplan, {
    eager: true,
  })
  sessions: Session[];

  @OneToMany(() => User, (user) => user.workoutplan)
  users: User[];
}
