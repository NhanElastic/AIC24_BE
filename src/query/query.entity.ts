import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Submission_data } from '../data/data.entity';

@Entity({
  name: 'Query',
})
export class QueryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  queryText: string;

  @OneToMany(() => Submission_data, (submission) => submission.query)
  submission: Submission_data[];
}
