import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { EventsModule } from './socket/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourcesOptions } from '../database/data.source';
import { QueryModule } from './query/query.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourcesOptions),
    VideosModule,
    EventsModule,
    QueryModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
