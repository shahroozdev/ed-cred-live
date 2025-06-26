// dispute-timeline.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisputeTimelineDto {
  @ApiProperty({ example: 'uuid-of-dispute' })
  @IsNotEmpty()
  @IsString()
  disputeId: string;

  @ApiProperty({ example: 'Your message here', required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ example: 'upload/image.jpg', required: false })
  @IsOptional()
  @IsString()
  attachment?: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @IsNotEmpty()
  @IsEnum(['admin', 'user'])
  sender: 'admin' | 'user';
}

export class UpdateDisputeTimelineDto {
  @ApiProperty({ example: 'Your updated message here', required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ example: 'upload/updated_image.jpg', required: false })
  @IsOptional()
  @IsString()
  attachment?: string;
}
