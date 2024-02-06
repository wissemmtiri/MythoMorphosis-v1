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

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, HealthCareLogs]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [HealthController, DietController],
  providers: [HealthService, DietService],
})
export class HealthModule {}
