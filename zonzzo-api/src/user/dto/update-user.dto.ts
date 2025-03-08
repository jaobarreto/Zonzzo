import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password?: string;
}
