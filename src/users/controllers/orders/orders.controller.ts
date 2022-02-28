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

import { OrdersService } from '../../services/orders/orders.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':orderId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, payload);
  }

  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.delete(orderId);
  }
}
