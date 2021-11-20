import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';
// import { genericService } from 'src/common/genericService.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(payload);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepository.merge(customer, payload);
    return this.customerRepository.save(customer);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.customerRepository.delete(id);
  }
}
// export class CustomersService extends genericService<
//   Customer,
//   number,
//   CreateCustomerDto,
//   UpdateCustomerDto
// > {
//   constructor(
//     @InjectRepository(Customer)
//     private customerRepository: Repository<Customer>,
//   ) {
//     super(customerRepository);
//   }
// private counterId = 1;
// private customers: Customer[] = [
//   {
//     id: 1,
//     name: 'Customer Name 1',
//     lastName: 'Customer LastName',
//     phone: 'Customer Phone',
//   },
// ];
// findAll() {
//   return this.customers;
// }
// findOne(id: number) {
//   const customer = this.customers.find((item) => item.id === id);
//   if (!customer) {
//     throw new NotFoundException(`Customer #${id} not found`);
//   }
//   return customer;
// }
// create(payload: CreateCustomerDto) {
//   this.counterId = this.counterId + 1;
//   const newCustomer = {
//     id: this.counterId,
//     ...payload,
//   };
//   this.customers.push(newCustomer);
//   return newCustomer;
// }
// update(id: number, payload: UpdateCustomerDto) {
//   const customer = this.findOne(id);
//   if (customer) {
//     const index = this.customers.findIndex((item) => item.id === id);
//     this.customers[index] = {
//       ...customer,
//       ...payload,
//     };
//     return this.customers[index];
//   }
//   return null;
// }
// delete(id: number) {
//   const index = this.customers.findIndex((item) => item.id === id);
//   if (index === -1) {
//     throw new NotFoundException(`Customer #${id} not found`);
//   }
//   this.customers.splice(index, 1);
//   return true;
// }
// }
