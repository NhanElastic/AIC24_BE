import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
dotenv.config();
@Injectable()
export class VideosService {
  private videoDirectory = process.env.VIDEOS_PATH;

  getVideoPath(filename: string) {
    if (!filename.endsWith('.mp4')) {
      filename += '.mp4';
    }
    const videoPath = path.join(this.videoDirectory, filename);
    if (!fs.existsSync(videoPath)) {
      throw new NotFoundException('Video not found at path: ' + videoPath);
    }
    return videoPath;
  }

  getVideo(filename: string) {
    const video = this.getVideoPath(filename);
    if (!fs.existsSync(video)) {
      throw new Error(`Could not find video ${filename}`);
    }
    return video;
  }

  private extractFrame(
    videoPath: string,
    outputPath: string,
    timestamp: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(new Error(err.message)))
        .seekInput(timestamp)
        .frames(1)
        .output(outputPath)
        .run();
    });
  }

  async getThumbnail(
    filename: string,
    frameNumber: number,
    frameRate: number = 25,
  ): Promise<string> {
    const videoPath = path.join(this.videoDirectory, filename);
    const outputPath = path.join(
      this.videoDirectory,
      `${filename}-frame-${frameNumber}.jpg`,
    );
    const timestamp = (frameNumber / frameRate).toFixed(10);
    try {
      await this.extractFrame(videoPath, outputPath, timestamp);
      return outputPath;
    } catch (error) {
      throw new NotFoundException(
        `Error from extracting frame: ${error.message}`,
      );
    }
  }
}
