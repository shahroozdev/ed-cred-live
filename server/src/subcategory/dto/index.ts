import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsIn(['active', 'draft'])
  status: 'active' | 'draft';

  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  iconUrl?: string;
}
