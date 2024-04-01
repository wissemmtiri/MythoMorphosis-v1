import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class updatePasswordDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(30)
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(30)
  newPassword: string;
}
