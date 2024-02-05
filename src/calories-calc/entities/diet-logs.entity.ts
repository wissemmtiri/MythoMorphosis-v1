import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diet_logs')
export class DietLogs extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dailyIntake: number;

  @Column()
  dailyNeeds: number;

  @ManyToOne(() => User, (user) => user.dietLogs, {
    onDelete: 'CASCADE',
  })
  user: User;
}
