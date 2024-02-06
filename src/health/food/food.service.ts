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
}
