import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { updatePasswordDto } from './dto/update-password.dto';
import { updateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private JwtService: JwtService,
  ) {}

  //------------------------ADMIN---------------------------
  async getAllUsers() {
    try {
      const users = await this.userRepo.find();
      return users;
    } catch {
      throw new HttpException('Error Fetching Users', HttpStatus.BAD_REQUEST);
    }
  }
  //------------------------ADMIN_END-----------------------

  //------------------------PROFILE-------------------------
  async getProfile(userId: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['workoutplan', 'healthcareLogs'],
      });
      const { password, salt, createdAt, updatedAt, deletedAt, ...profile } =
        user;
      return profile;
    } catch {
      throw new HttpException('Error Fetching Profile', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(userId: number, profileUpdates: updateProfileDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      await this.userRepo.update(user, profileUpdates);
      return 'Profile Successfully Updated';
    } catch {
      throw new HttpException('Error Updating Profile', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(userId: number, passwordUpdates: updatePasswordDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      const password = await bcrypt.hash(
        passwordUpdates.oldPassword,
        user ? user.salt : '',
      );
      if (user && user.password == password) {
        user.password = await bcrypt.hash(
          passwordUpdates.newPassword,
          user.salt,
        );
        await this.userRepo.save(user);
        return 'Password Successfully Updated';
      } else {
        throw new HttpException(
          'Action Unauthorized.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch {
      throw new HttpException(
        'Error Updating Password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProfile(userId: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      await this.userRepo.remove(user);
      return 'Profile Successfully Deleted';
    } catch {
      throw new HttpException('Error Deleting Profile', HttpStatus.BAD_REQUEST);
    }
  }
  //------------------------PROFILE_END----------------------------

  //------------------------AUTHENTICATION-------------------------
  async register(registerCreds: CreateUserDto) {
    try {
      const userdb = new User();
      userdb.firstname = registerCreds.firstname;
      userdb.lastname = registerCreds.lastname;
      userdb.email = registerCreds.email;
      userdb.salt = await bcrypt.genSalt();
      userdb.password = await bcrypt.hash(registerCreds.password, userdb.salt);

      await this.userRepo.save(userdb);

      const payload = {
        sub: userdb.id,
        role: userdb.role,
      };
      const token = this.JwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return {
        access_token: token,
      };
    } catch {
      throw new HttpException('Error Creating User', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginCreds: LoginUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: loginCreds.email },
      });
      const password = await bcrypt.hash(
        loginCreds.password,
        user ? user.salt : '',
      );
      if (user && user.password == password) {
        const payload = {
          sub: user.id,
          role: user.role,
        };

        const token = this.JwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        });
        return {
          access_token: token,
        };
      } else {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch {
      throw new HttpException(
        'ERROR LOGGING IN, Try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  //------------------------AUTHENTICATION_END-------------------------
}
