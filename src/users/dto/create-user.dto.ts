import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(30)
    password: string;
}