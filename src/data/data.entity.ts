import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QueryEntity } from '../query/query.entity';

@Entity({
  name: 'Submission_data',
})
export class Submission_data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  filename: string;
  @Column('varchar', { length: 255 })
  frame: string;
  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => QueryEntity, (query) => query.submission, {
    onDelete: 'CASCADE',
  })
  query: QueryEntity;
}
