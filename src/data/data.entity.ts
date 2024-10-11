import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Submission_data',
})
export class Submission_data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  name: string;
  @Column('varchar', { length: 255 })
  frame: string;
}