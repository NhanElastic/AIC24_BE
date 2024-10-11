import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryEntity } from './query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueryEntity])],
  providers: [QueryService],
  exports: [QueryService],
  controllers: [QueryController],
})
export class QueryModule {}
