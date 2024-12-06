import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsUUID,
  IsString,
  ValidateNested,
} from 'class-validator';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { client } from '@/client/domain/entity/entityInterfaceClient';

type createBodydto = Omit<orderCreate, 'envoy' | 'id'>;
export type createtype = Omit<orderCreate, 'envoy'>;

export class createBodyDto implements createBodydto {

  @IsNotEmpty()
  @ValidateNested()
  client: client;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;
  @IsNotEmpty()
  @IsArray({ each: true })
  products: string[];
}

