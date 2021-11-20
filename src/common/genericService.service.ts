import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class genericService<ENTITY, ID, DTO, PARTIAL_DTO> {
  private readonly genericRepository: Repository<ENTITY>;
  constructor(genericRepository: Repository<ENTITY>) {
    this.genericRepository = genericRepository;
  }

  async findAll(): Promise<ENTITY[]> {
    return await this.genericRepository.find();
  }

  async findOne(id: ID): Promise<ENTITY> {
    const item = await this.genericRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  async create(payload: DTO): Promise<ENTITY> {
    const newItem = this.genericRepository.create(payload);
    await this.genericRepository.save(newItem);
    return newItem;
  }

  async update(id: ID, payload: PARTIAL_DTO): Promise<ENTITY> {
    const item = await this.genericRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return this.genericRepository.merge(item, payload);
  }

  async delete(id: ID): Promise<ENTITY> {
    const item = await this.genericRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    this.genericRepository.delete(id);
    return item;
  }
}
