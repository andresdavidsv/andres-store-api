import { IsNotEmpty, IsPositive } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The Id of Order' })
  readonly orderId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The Id of Product' })
  readonly productId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The quantity of Product' })
  readonly quantity: number;
}
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
