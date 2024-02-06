import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food')
export class Food extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  calories: number;

  @Column()
  protein: number;

  @Column()
  carbs: number;

  @Column()
  fats: number;

  @Column()
  imageUrl: string;
}
