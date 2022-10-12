import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const id: string = v4();
    try {
      const user = this.usersRepository.create({ ...createUserDto, id });
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException('User alredy exist');
      }
      throw error;
    }
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('User is not found.');
    return user;
  }
}
