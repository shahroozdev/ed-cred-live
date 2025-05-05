import { IsString, IsOptional } from 'class-validator';

export class CreateDisputeDto {
    @IsString()
    reason: string;

    @IsOptional()
    @IsString()
    additionalInfo?: string;
}
