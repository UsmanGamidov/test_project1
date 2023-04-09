import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesEntity } from '../entities/notes.entity';
import { UserService } from '../service/user.service';


@Global()
@Injectable()
export class NotesService {
  constructor(
    private userService: UserService,
    @InjectRepository(NotesEntity)
    private notesRepository: Repository<NotesEntity>,
  ) {}

  async create(name, password, text) {
    const user_notes = this.notesRepository.create();

    user_notes.name = name
    user_notes.password = password
    user_notes.text = text
    user_notes.createdAt = new Date();
    
    const existsUser = this.userService.find(name, password);
    if (!existsUser) {
      return 'Такого пользователя не существует';
    }
    if (!text) {
      return 'введите какой либо в текст';
    }

    await this.notesRepository.save(user_notes);

    return "Запись успешно добавлена";
  }

}

