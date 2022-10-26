import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
        private readonly usersService: UsersService
    ) { }


    async login(ip: string, loginUserDto: LoginUserDto) {
        await this.deleteExpiredSessions();

        try {
            const user = await this.usersService.findOne(loginUserDto.email);
            const hasIp: boolean = user.ipAddresses.some(ipAddress => ipAddress.ip === ip);
            if (hasIp) {
                const session = await this.createSession(user, ip);
                return { access_token: session.accessToken }
            } else {
                // TODO: send email confirmation
            }
        } catch (error) {
            throw error;
        }
    }

    signup(ip: string, createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto, ip);
    }

    private async createSession(user: User, ip: string) {
        const accessToken = v4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1);

        try {
            const session = this.sessionRepository.create({ accessToken, user, expiresAt, ip });
            return await this.sessionRepository.save(session);
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new ConflictException('Session alredy exist');
            }
            throw error;
        }
    }

    private async deleteExpiredSessions() {
        const currentDate = new Date();
        return await this.sessionRepository.delete({
            expiresAt: LessThan(currentDate)
        });
    }
}