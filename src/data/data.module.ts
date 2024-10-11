import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { QueryService } from '../query/query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission_data } from './data.entity';
import { QueryEntity } from '../query/query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission_data, QueryEntity])],
  providers: [DataService, QueryService],
  exports: [DataService],
  controllers: [DataController],
})
export class DataModule {}
