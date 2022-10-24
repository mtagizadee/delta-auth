import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IP } from './entities/IP.entity';


@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, IP])],
  exports: [UsersService]
})
export class UsersModule { }
