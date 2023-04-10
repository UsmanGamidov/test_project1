import { Global, Injectable } from '@nestjs/common';
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
  async find_text(name, password, text) {
    return this.notesRepository.findOne({
      where: {
        text,
      },
    });
  }

  async create(name, password, text) {

    const existsUser = await this.userService.find(name, password);
    
    if (!existsUser) {
      return 'Такого пользователя не существует';
    }
    if (!text) {
      return 'введите какой либо в текст';
    } 
    const user_notes = await this.notesRepository.create();

    user_notes.text = text
    user_notes.user_id = existsUser.id
    user_notes.createdAt = new Date();
    await this.notesRepository.save(user_notes);

    return "Запись успешно добавлена";
  }

}

