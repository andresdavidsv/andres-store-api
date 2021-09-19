import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
