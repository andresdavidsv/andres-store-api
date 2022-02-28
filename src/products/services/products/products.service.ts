import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindConditions } from 'typeorm';

import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';
import { Brand } from '../../entities/brand.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../../dto/products.dto';
// import { genericService } from 'src/common/genericService.service';

@Injectable()
// export class ProductsService extends genericService<
//   Product,
//   number,
//   CreateProductDto,
//   UpdateProductDto
// > {
//   constructor(
//     @InjectRepository(Product) private productsRepository: Repository<Product>,
//   ) {
//     super(productsRepository);
//   }
// }
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productsRepository.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productsRepository.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    const newProduct = this.productsRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsRepository.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoriesRepository.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }
    const product = this.productsRepository
      .save(newProduct)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
    return product;
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandsRepository.findOne(payload.brandId);
      product.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoriesRepository.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }
    this.productsRepository.merge(product, payload);
    return this.productsRepository.save(product);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.productsRepository.delete(id);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productsRepository.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productsRepository
      .save(product)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productsRepository.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoriesRepository.findOne(categoryId);
    product.categories.push(category);
    return this.productsRepository
      .save(product)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message}`);
      });
  }
}
