import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
  @IsNotEmpty()
  readonly role: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
