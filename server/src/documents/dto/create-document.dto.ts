import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DocumentTypes } from '../../types/user';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty({ message: 'Document name is required' })
  name: string;

  // @IsEnum(DocumentTypes , { message: 'Invalid document type' })
  @IsString()
  type: 'TOS' |'POLICY' | 'DISPUTE' | 'RESPONSE';

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  desc: string;
}
