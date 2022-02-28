import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../../dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}
  findAll() {
    return this.brandsRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepository.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandsRepository.create(payload);
    return this.brandsRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandsRepository.merge(brand, payload);
    return this.brandsRepository.save(brand);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.brandsRepository.delete(id);
  }
}
