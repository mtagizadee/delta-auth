import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: 'email is not valid' })
    @Type(() => String)
    @IsNotEmpty({ message: 'email is missing' })
    email: string;
}