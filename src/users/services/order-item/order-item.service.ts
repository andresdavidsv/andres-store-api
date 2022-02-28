import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../../entities/order.entity';
import { OrderItem } from './../../entities/order-item.entity';
import { Product } from './../../../products/entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../../dtos/oder-item-dt';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private prodcutRepository: Repository<Product>,
  ) {}
  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne(payload.orderId);
    if (!order) {
      throw new NotFoundException(`Order #${payload.orderId} not found`);
    }
    const product = await this.prodcutRepository.findOne(payload.productId);
    if (!product) {
      throw new NotFoundException(`Product #${payload.productId} not found`);
    }
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.orderItemRepository
      .save(item)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
  }
}
