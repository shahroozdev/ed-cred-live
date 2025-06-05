import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  branchId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}


export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}