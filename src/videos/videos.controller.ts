import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { VideosService } from './videos.service';
import * as fs from 'fs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get(':filename')
  @ApiResponse({
    status: 200,
    description: 'Videos',
    content: {
      'video/mp4': {},
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    content: {
      'application/json': {
        schema: {
          example: {
            message:
              'Video not found at path: /run/media/NhanElastic/NHANBEL/AIC24/video/L12_V0123.mp4',
            error: 'Not Found',
            statusCode: 404,
          },
        },
      },
    },
  })
  Video(@Param('filename') filename: string, @Res() res: Response) {
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

  @ApiResponse({
    status: 200,
    description: 'Videos',
    content: {
      'image/jpeg': {},
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 404,
            message:
              "ENOENT: no such file or directory, stat '/run/media/NhanElastic/NHANBEL/AIC24/video/L12_V012.mp4-frame-1233123132.jpg'",
          },
        },
      },
    },
  })
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
