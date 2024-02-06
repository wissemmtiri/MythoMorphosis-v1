import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { newHealthCareLogDto } from './dto/new-healthcare-log.dto';

@Controller('healthcheck')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UseGuards(UserGuard)
  @Get('history')
  async getHealthCheck(@CurrentUser() userDetails: CurrentUserDto) {
    return this.healthService.getHealthCheck(userDetails.userId);
  }

  @UseGuards(UserGuard)
  @Get('latest')
  async getLatestCheck(@CurrentUser() userDetails: CurrentUserDto) {
    return this.healthService.getLatestCheck(userDetails.userId);
  }

  @UseGuards(UserGuard)
  @Post('add')
  async addHealthCheck(
    @CurrentUser() userDetails: CurrentUserDto,
    @Body() logDetails: newHealthCareLogDto,
  ) {
    return this.healthService.addHealthCheck(userDetails.userId, logDetails);
  }
}
