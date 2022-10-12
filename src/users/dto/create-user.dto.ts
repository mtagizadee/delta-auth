import { Type } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: 'email is not valid' })
    @Type(() => String)
    @IsNotEmpty({ message: 'email is missing' })
    email: string;
}
