import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDisputeDto {
    @IsString()
    reason: string;

    @IsOptional()
    attachment?: any;

    @IsString()
    agreeTerms:string
}
