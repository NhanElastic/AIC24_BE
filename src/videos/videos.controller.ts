import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { VideosService } from './videos.service';
import * as fs from 'fs';
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get(':filename')
  getVideo(@Param('filename') filename: string, @Res() res: Response) {
    const videoPath = this.videosService.getVideo(filename);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const stream = fs.createReadStream(videoPath);
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });
    stream.pipe(res);
    stream.on('error', (err) => {
      res.sendStatus(500);
      console.error(err);
    });
  }

  @Get('thumb/:filename/:frameNumber')
  async getThumbnail(
    @Param('filename') filename: string,
    @Param('frameNumber') frameNumber: any,
    @Res() res: Response,
  ) {
    try {
      const frameNum = parseInt(frameNumber, 10);
      const framePath = await this.videosService.getThumbnail(
        filename + '.mp4',
        frameNum,
      );
      res.sendFile(framePath);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
