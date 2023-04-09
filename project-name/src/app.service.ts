import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './database/service/user.service';
import { NotesService } from './database/service/notes.service';

@Injectable()
export class AppService {

  constructor(private userService: UserService, private notesService: NotesService) {}

  registerNewUser(params) {
    const name = params.name;
    const password = params.password;

    if (!name) {
      return 'Error; user field not found';
    }

    if (!password) {
      return 'Error; password field not found';
    }

    return this.userService.create(name, password);
  }

  getUser(params) {
    const user = params.user;
    const password = params.password;
    
    return this.userService.find(user, password);
  }

  notes(params) {
    const user = params.user;
    const password = params.password;
    const text = params.text;

    return this.notesService.create(user, password, text)
  }
}

