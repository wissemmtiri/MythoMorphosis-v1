import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/users/entities/user.entity';

@Entity('articles')
export class Article extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: '',
  })
  imageUrl: string;

  @ManyToMany(() => User, (user) => user.bookmarks)
  users: User[];
}
