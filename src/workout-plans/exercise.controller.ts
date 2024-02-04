import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('all')
  async getAllExercises() {
    return this.exerciseService.getAllExercises();
  }

  @Get(':id')
  async getExerciseById(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.getExerciseById(id);
  }

  @UseGuards(AdminGuard)
  @Post('add')
  async addExercise(@Body() exercise: AddExerciseDto) {
    return this.exerciseService.addExercise(exercise);
  }

  @UseGuards(AdminGuard)
  @Put('update/:id')
  async updateExercise(
    @Param('id', ParseIntPipe) id: number,
    @Body() exerciseUpdates: UpdateExerciseDto,
  ) {
    return this.exerciseService.updateExercise(id, exerciseUpdates);
  }

  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  async deleteExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.deleteExercise(id);
  }
}
