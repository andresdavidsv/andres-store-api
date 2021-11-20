import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderItemService } from './../../services/order-item/order-item.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../../dtos/oder-item-dt';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
