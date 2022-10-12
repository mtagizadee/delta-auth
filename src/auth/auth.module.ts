import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "inspector";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UsersModule, TypeOrmModule.forFeature([Session])]
})
export class AuthModule { }