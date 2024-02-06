import { Injectable } from '@nestjs/common';
import { updateDietLogDto } from '../dto/update-diet-log.dto';

@Injectable()
export class DietService {
  constructor() {}

  async getDietHistory(userId: number) {
    return 'Diet history';
  }

  async getLatestDiet(userId: number) {
    return 'Latest diet';
  }

  async updateDiet(userId: number, logDetails: updateDietLogDto) {
    return 'Diet added';
  }
}
