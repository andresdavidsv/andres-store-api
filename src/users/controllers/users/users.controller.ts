import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../../services/users/users.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }
  @Get(':userId/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getOrderByUser(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
