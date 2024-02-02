import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) { }

    //----------------------------ADMIN-----------------------------------------
    @UseGuards(AdminGuard)
    @Get('all')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @UseGuards(AdminGuard)
    @Delete('delete/:id')
    async deleteUser(
        @Param('id') userId: number
    ) {
        return this.userService.deleteProfile(userId);
    }
    
    //----------------------------AUTHENTICATION--------------------------------
    @Post('register')
    async register(
        @Body() registerCreds: CreateUserDto
    ) {
        return this.userService.register(registerCreds);
    }

    @Post('login')
    async login(
        @Body() loginCreds: LoginUserDto
    ) {
        return this.userService.login(loginCreds);
    }
    
    //----------------------------PROFILE--------------------------------
    @UseGuards(UserGuard)
    @Get('profile')
    async getProfile(
        @CurrentUser() userDetails: CurrentUserDto
    ) {
        return this.userService.getProfile(userDetails.userId);
    }

    @UseGuards(UserGuard)
    @Put('update-profile')
    async updateProfile(
        @CurrentUser() userDetails: CurrentUserDto,
        @Body() profileUpdates: updateProfileDto
    ) {
        return this.userService.updateProfile(userDetails.userId, profileUpdates);
    }

    @UseGuards(UserGuard)
    @Put('update-password')
    async updatePassword(
        @CurrentUser() userDetails: CurrentUserDto,
        @Body() passwordUpdates: updatePasswordDto
    ) {
        return this.userService.updatePassword(userDetails.userId, passwordUpdates)
    }

    @UseGuards(UserGuard)
    @Delete('delete-account')
    async deleteProfile(
        @CurrentUser() userDetails: CurrentUserDto
    ) {
        return this.userService.deleteProfile(userDetails.userId);
    }
}