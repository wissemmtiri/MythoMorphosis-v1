import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { HealthCareLogs } from './entities/healthcare-logs.entity';
import { DietController } from './diet/diet.controller';
import { DietService } from './diet/diet.service';
import { FoodController } from './food/food.controller';
import { FoodService } from './food/food.service';
import { Food } from './entities/fridge.entity';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, HealthCareLogs, Food]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [HealthController, DietController, FoodController],
  providers: [HealthService, DietService, FoodService],
})
export class HealthModule {}
