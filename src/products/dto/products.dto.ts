import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `product's name` })
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly stock: number;
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly image: string;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
  @IsOptional()
  @Min(0)
  minPrice: number;
  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
