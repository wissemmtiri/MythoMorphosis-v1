import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from '../entities/fridge.entity';
import { Repository } from 'typeorm';

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

    async addFood(foodDetails: any) {
        try {
            const food_db = new Food();
            food_db.name = foodDetails.name;
            food_db.calories = foodDetails.calories;
            food_db.carbs = foodDetails.carbs;
            food_db.fats = foodDetails.fats;
            food_db.protein = foodDetails.protein;
            await this.foodRepo.save(food_db);  
            return food_db;
        } catch {
            throw new HttpException(
                'Error adding food',
                HttpStatus.BAD_REQUEST,
            );
            }
      }
  }
}
