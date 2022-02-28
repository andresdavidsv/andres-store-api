import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(payload);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoriesRepository.merge(category, payload);
    return this.categoriesRepository.save(category);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.categoriesRepository.delete(id);
  }
}
