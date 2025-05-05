import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateDisputeDto {
    @IsOptional()
    @IsIn(['pending', 'reviewed', 'resolved', 'rejected'])
    status?: 'pending' | 'reviewed' | 'resolved' | 'rejected';

    @IsOptional()
    @IsString()
    adminNotes?: string;
}
