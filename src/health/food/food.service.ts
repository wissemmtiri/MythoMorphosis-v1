import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from '../entities/fridge.entity';
import { Repository } from 'typeorm';
import { AddFoodDto } from '../dto/add-food.dto';
import { UpdateFoodDto } from '../dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepo: Repository<Food>,
  ) {}

  async getFoodList() {
    try {
      const foodList = await this.foodRepo.find();
      return foodList;
    } catch {
      throw new HttpException(
        'Error fetching food list',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addFood(foodDetails: AddFoodDto) {
    try {
      const food_db = new Food();
      food_db.name = foodDetails.name;
      food_db.calories = foodDetails.calories;
      food_db.carbs = foodDetails.carbs;
      food_db.fats = foodDetails.fats;
      food_db.protein = foodDetails.protein;
      food_db.imageUrl = foodDetails.imageUrl;
      await this.foodRepo.save(food_db);
      return food_db;
    } catch {
      throw new HttpException('Error adding food', HttpStatus.BAD_REQUEST);
    }
  }

  async updateFood(id: number, foodDetails: UpdateFoodDto) {
    try {
      const food_db = await this.foodRepo.findOne({ where: { id: id } });
      if (!food_db) {
        throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
      }
      food_db.calories = foodDetails.calories;
      food_db.carbs = foodDetails.carbs;
      food_db.fats = foodDetails.fats;
      food_db.protein = foodDetails.protein;
      food_db.imageUrl = foodDetails.imageUrl;
      await this.foodRepo.save(food_db);
      return food_db;
    } catch {
      throw new HttpException('Error updating food', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFood(id: number) {
    try {
      const food_db = await this.foodRepo.findOne({ where: { id: id } });
      if (!food_db) {
        throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
      }
      await this.foodRepo.delete({ id: id });
      return 'Food deleted successfully';
    } catch {
      throw new HttpException('Error deleting food', HttpStatus.BAD_REQUEST);
    }
  }
}
