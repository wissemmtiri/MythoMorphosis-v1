import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DietService } from './diet.service';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { updateDietLogDto } from '../dto/update-diet-log.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @UseGuards(UserGuard)
  @Get('history')
  async getDietHistory(@CurrentUser() userDetails: CurrentUserDto) {
    return this.dietService.getDietHistory(userDetails.userId);
  }

  @UseGuards(UserGuard)
  @Get('latest')
  async getLatestDiet(@CurrentUser() userDetails: CurrentUserDto) {
    return this.dietService.getLatestDiet(userDetails.userId);
  }

  @UseGuards(UserGuard)
  @Post('update')
  async addDiet(
    @CurrentUser() userDetails: CurrentUserDto,
    @Body() logDetails: updateDietLogDto,
  ) {
    return this.dietService.updateDiet(userDetails.userId, logDetails);
  }
}
