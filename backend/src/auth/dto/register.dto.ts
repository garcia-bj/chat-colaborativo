import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 100)
    password: string;
}
