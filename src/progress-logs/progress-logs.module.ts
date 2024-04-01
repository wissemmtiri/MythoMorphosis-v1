import { Module } from '@nestjs/common';
import { ProgressLogsController } from './progress-logs.controller';
import { ProgressLogsService } from './progress-logs.service';

@Module({
  controllers: [ProgressLogsController],
  providers: [ProgressLogsService],
})
export class ProgressLogsModule {}
