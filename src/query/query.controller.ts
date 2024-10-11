import { Body, Controller, Post } from '@nestjs/common';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}
  @Post('create')
  createQuery(@Body('queryText') queryText: string) {
    return this.queryService.createQuery(queryText);
  }

  @Post('delete')
  deleteQuery(@Body('queryId') queryId: number) {
    return this.queryService.deleteQuery(queryId);
  }
}
