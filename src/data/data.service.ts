import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission_data } from './data.entity';
import { Repository } from 'typeorm';
import { QueryEntity } from '../query/query.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Submission_data)
    private dataRepository: Repository<Submission_data>,
    @InjectRepository(QueryEntity)
    private queryRepository: Repository<QueryEntity>,
  ) {}
  async createSubmission(
    filename: string,
    frame: string,
    queryId: number,
  ): Promise<Submission_data> {
    const data = await this.dataRepository.findOne({
      where: { filename: filename, frame: frame },
    });
    if (data) {
      data.count = data.count + 1;
      return this.dataRepository.save(data);
    } else {
      const query = await this.queryRepository.findOneBy({
        id: queryId,
      });
      const data = this.dataRepository.create({ filename, frame, query });
      return this.dataRepository.save(data);
    }
  }
  async deleteSubmission(dataId: number): Promise<void> {
    await this.dataRepository.delete(dataId);
  }
  async getSortedSubmission(queryId: number): Promise<Submission_data[]> {
    return this.dataRepository.find({
      where: { query: { id: queryId } },
      order: { count: 'DESC' },
    });
  }
}
