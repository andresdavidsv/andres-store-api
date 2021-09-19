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

import { CustomersService } from '../../services/customers/customers.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':customerId')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(customerId, payload);
  }

  @Delete(':customerId')
  delete(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.delete(customerId);
  }
}
