import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Global()
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async find(name, password) {
    return this.userRepository.findOne({
      where: {
        name,
        password,
      },
    });
  }


  async create(name, password) {
    const user = this.userRepository.create();

    user.name = name
    user.password = password
    user.createdAt = new Date();
    
    const existsUser = await this.find(name, password);
    if (existsUser) {
      return 'Такой пользователь уже существует';
    }

    await this.userRepository.save(user);

    return user;
  }

}

