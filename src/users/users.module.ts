import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';

import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';

import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { OrdersService } from './services/orders/orders.service';

import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './services/order-item/order-item.service';
import { OrderItemController } from './controllers/order-item/order-item.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [UsersController, CustomersController, OrdersController, OrderItemController],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
})
export class UsersModule {}
