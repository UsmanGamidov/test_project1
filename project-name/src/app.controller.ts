import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('registr')
  registr(@Query() params) {
    return this.appService.registerNewUser(params);
  }
  @Get('getuser')
  getUser(@Query() params) {
    return this.appService.getUser(params);
  }
  @Get('notes')
  notes(@Query() params) {
    return this.appService.notes(params);
  }
}
