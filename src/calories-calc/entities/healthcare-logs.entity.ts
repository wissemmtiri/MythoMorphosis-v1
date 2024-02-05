import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('healthcare_logs')
export class HealthCareLogs extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @ManyToOne(() => User, (user) => user.healthcareLogs)
  user: User;
}
