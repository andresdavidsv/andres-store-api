import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The Email of User' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty({ description: 'The Password of User' })
  readonly password: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The Role of User' })
  readonly role: string;
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'The Role of User' })
  readonly customerId: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
