import { Module } from '@nestjs/common';
import { CaloriesCalcController } from './calories-calc.controller';
import { CaloriesCalcService } from './calories-calc.service';

@Module({
  controllers: [CaloriesCalcController],
  providers: [CaloriesCalcService]
})
export class CaloriesCalcModule {}
