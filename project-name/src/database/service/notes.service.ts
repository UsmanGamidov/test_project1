import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesEntity } from '../entities/notes.entity';
import { UserService } from '../service/user.service';
import { UserEntity } from '../entities/user.entity';
import { existsSync } from 'fs';


@Global()
@Injectable()
export class NotesService {
  constructor(
    private userService: UserService,
    @InjectRepository(NotesEntity)
    private notesRepository: Repository<NotesEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async find_text(name, password, text) {
    return this.notesRepository.findOne({
      where: {
        text,
      },
    });
  }

  async create(name, password, text) {

    const existsUser = this.userService.find(name, password);
    
    if (!existsUser) {
      return 'Такого пользователя не существует';
    }
    if (!text) {
      return 'введите какой либо в текст';
    } 
    const user_notes = this.notesRepository.create();
    const user = this.userRepository.create();

    user.name = name
    user.password = password
    
    user_notes.text = text
    user_notes.user_id = existsUser.id
    user_notes.createdAt = new Date();
    await this.notesRepository.save(user_notes);

    return "Запись успешно добавлена";
  }

}

