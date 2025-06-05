import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserPackageDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  packageId: number;

}
