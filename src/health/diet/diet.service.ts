import { Injectable } from '@nestjs/common';

@Injectable()
export class DietService {
  constructor() {}

  async getDietHistory() {
    return 'Diet history';
  }

  async getLatestDiet() {
    return 'Latest diet';
  }

  async updateDiet() {
    return 'Diet added';
  }
}
