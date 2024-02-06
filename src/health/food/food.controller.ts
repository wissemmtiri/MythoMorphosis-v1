import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('list')
  async getFoodList() {
    return this.foodService.getFoodList();
  }

  @Post('add')
  async addFood(@Body() foodDetails: any) {
    return this.foodService.addFood(foodDetails);
  }

  @Put('update/:id')
  async updateFood(@Param('id') id: number) {
    return this.foodService.updateFood(id);
  }

  @Delete('delete/:id')
  async deleteFood(@Param('id') id: number) {
    return this.foodService.deleteFood(id);
  }
}
