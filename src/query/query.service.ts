import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryEntity } from './query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(QueryEntity)
    private readonly queryRepository: Repository<QueryEntity>,
  ) {}
  async createQuery(queryText: string): Promise<QueryEntity> {
    const query = this.queryRepository.create({ queryText });
    return this.queryRepository.save(query);
  }
  async deleteQuery(queryId: number): Promise<void> {
    await this.queryRepository.delete(queryId);
  }
}
