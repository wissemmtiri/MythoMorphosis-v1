import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractToken(request);
    if (!token) return false;
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userRepo.findOne({
        where: { id: payload['sub'] },
      });
      if (!user) return false;

      request['userId'] = user.id;
      request['UserRole'] = user.role;
      return true;
    } catch {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  async extractToken(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers['authorization']
      ? request.headers['authorization'].split(' ')
      : [undefined, undefined];
    return type === 'Bearer' ? token : undefined;
  }
}
