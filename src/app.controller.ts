import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';

import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo') // 👈 Without slashes
  @Public()
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/') // 👈 With slashes
  hello() {
    return 'con /sas/';
  }

  @Get('tasks') // 👈 With slashes
  tasks() {
    return this.appService.getTasks();
  }
}
