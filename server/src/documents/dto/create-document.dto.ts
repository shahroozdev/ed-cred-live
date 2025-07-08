import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { documentTypes } from '../../types/user';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty({ message: 'Document name is required' })
  name: string;

  @IsEnum(documentTypes, { message: 'Invalid document type' })
  type: documentTypes;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  desc: string;
}
