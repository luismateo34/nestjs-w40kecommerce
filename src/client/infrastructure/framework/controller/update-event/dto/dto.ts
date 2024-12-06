import { IsString, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Request } from 'express';

export class UpdateClientDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  purchaseId: string;

  @IsNotEmpty()
  @ValidateNested()
  payload: Request;
}
