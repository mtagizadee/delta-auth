import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { IP } from './entities/IP.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(IP) private readonly ipAdressesRepository: Repository<IP>,
    private readonly dataSource: DataSource
  ) { }

  async create(createUserDto: CreateUserDto, ip: string) {
    const userId: string = v4();
    const ipAddressId: string = v4();

    const querryRunner = this.dataSource.createQueryRunner();

    await querryRunner.connect();
    await querryRunner.startTransaction();
    try {
      const userData = this.usersRepository.create({ ...createUserDto, id: userId });
      const user = await this.usersRepository.save(userData);

      const ipAddressData = this.ipAdressesRepository.create({ user, ip, id: ipAddressId });
      const ipAddress = await this.ipAdressesRepository.save(ipAddressData);

      await querryRunner.commitTransaction();
      return ipAddress;
    } catch (error) {
      await querryRunner.rollbackTransaction();
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException('User alredy exist');
      }
      throw error;
    } finally {
      await querryRunner.release();
    }
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { ipAddresses: true }
    });
    if (!user) throw new NotFoundException('User is not found.');
    return user;
  }
}
