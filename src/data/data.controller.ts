import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('submission')
export class DataController {
  constructor(private readonly dataService: DataService) {}
  @Post(':id/create')
  createSubmission(
    @Param('id') id: number,
    @Body('filename') filename: string,
    @Body('frame') frame: string,
  ) {
    return this.dataService.createSubmission(filename, frame, id);
  }
  @Post(':id/delete')
  deleteSubmission(@Param('id') id: number) {
    return this.dataService.deleteSubmission(id);
  }

  @Get(':id/')
  getSortedSubmission(@Param('id') id: number) {
    return this.dataService.getSortedSubmission(id);
  }
}
