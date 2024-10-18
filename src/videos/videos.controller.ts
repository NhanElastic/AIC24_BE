import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
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
  Video(
    @Param('filename') filename: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const videoPath = this.videosService.getVideo(filename);
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;

    // Check if the Range header is present
    const range = req.headers['range'] as string | undefined;
    if (range) {
      // Extract start and end from the Range header
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Create a partial response (206)
      const chunkSize = end - start + 1;
      const videoStream = fs.createReadStream(videoPath, { start, end });

      res.set({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });

      res.status(HttpStatus.PARTIAL_CONTENT); // 206 status code for partial content
      videoStream.pipe(res);
    } else {
      // No range request, send the whole video
      res.set({
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });

      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    }
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
