import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDisputeDto {
    @IsString()
    reason: string;

    @IsOptional()
    attachment?: any;

    @IsBoolean()
    agreeTerms:boolean
}
