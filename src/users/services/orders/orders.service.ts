import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/users/entities/order.entity';
import { Customer } from 'src/users/entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const newOrder = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
      );
      if (!customer) {
        throw new NotFoundException(
          `Customer #${payload.customerId} not found`,
        );
      }
      newOrder.customer = customer;
    }
    return this.orderRepository
      .save(newOrder)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepository.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
      );
      if (!customer) {
        throw new NotFoundException(
          `Customer #${payload.customerId} not found`,
        );
      }
      order.customer = customer;
    }
    this.orderRepository.merge(order);
    return this.orderRepository.save(order);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.orderRepository.delete(id);
  }
}
