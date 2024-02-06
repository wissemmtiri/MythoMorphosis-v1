import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('healthcare_logs')
export class HealthCareLogs extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column({
    default: 0,
  })
  height: number;

  @ManyToOne(() => User, (user) => user.healthcareLogs, {
    onDelete: 'CASCADE',
  })
  user: User;
}
