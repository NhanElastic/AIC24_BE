import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { EventsModule } from './socket/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourcesOptions } from '../database/data.source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourcesOptions),
    VideosModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
