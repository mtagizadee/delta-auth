import { Controller, Post, Body, Get } from '@nestjs/common';
import { IpAddress } from 'src/decorator/IpAddress.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@IpAddress() ip: string, @Body() loginUserDto: LoginUserDto) {
        return this.authService.login(ip, loginUserDto);
    }

    @Post('signup')
    signup(@IpAddress() ip: string, @Body() createUserDto: CreateUserDto) {
        return this.authService.signup(ip, createUserDto);
    }

    @Get('ip')
    getIp(@IpAddress() ip: string) {
        return ip;
    }
}