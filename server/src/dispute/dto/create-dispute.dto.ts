import { IsString, IsOptional } from 'class-validator';

export class CreateDisputeDto {
    @IsString()
    reason: string;

    @IsOptional()
    attachment?: any;

    @IsString()
    @IsOptional()
    agreeTerms:string
}
