import { IsString, IsIn, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsIn(['active', 'draft'])
  status: 'active' | 'draft';

  // @IsNumber()
  // categoryId: number;
}
