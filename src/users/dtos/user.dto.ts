import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The Email of User' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
  @IsNotEmpty()
  readonly role: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
