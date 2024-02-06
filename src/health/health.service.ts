import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { newHealthCareLogDto } from './dto/new-healthcare-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthCareLogs } from './entities/healthcare-logs.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Food } from './entities/fridge.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthCareLogs)
    private healthCareLogsRepository: Repository<HealthCareLogs>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getHealthCheck(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const healthCheckLogs = await this.healthCareLogsRepository.find({
        where: {
          user,
        },
      });
      return healthCheckLogs;
    } catch {
      throw new HttpException(
        'Error fetching health check logs',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLatestCheck(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const latestHealthCheck = await this.healthCareLogsRepository.findOne({
        where: {
          user,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return latestHealthCheck;
    } catch {
      throw new HttpException(
        'Error fetching latest health check',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addHealthCheck(userId: number, logDetails: newHealthCareLogDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const newLog = this.healthCareLogsRepository.create({
        ...logDetails,
        user,
      });

      await this.healthCareLogsRepository.save(newLog);
      return newLog;
    } catch {
      throw new HttpException(
        'Error adding health check',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
