import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
// import { Order } from 'src/users/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { Client } from 'pg';

import { ProductsService } from 'src/products/services/products/products.service';
// import { genericService } from 'src/common/genericService.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private customersService: CustomersService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    // const apiKey = this.configService.get('API_KEY');
    // console.log(apiKey);
    // return this.users;
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepository
      .save(newUser)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.userRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.findOne(id);
  //   if (user) {
  //     const index = this.users.findIndex((item) => item.id === id);
  //     this.users[index] = {
  //       ...user,
  //       ...payload,
  //     };
  //     return this.users[index];
  //   }
  //   return null;
  // }

  // delete(id: number) {
  //   const index = this.users.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   this.users.splice(index, 1);
  //   return true;
  // }

  // async getOrderByUser(id: number) {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
