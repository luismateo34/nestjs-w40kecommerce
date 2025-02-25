import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsUUID,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { client } from 'src/client/domain/entity/entityInterfaceClient';

type createBodydto = Omit<orderCreate, 'envoy' | 'id' | 'products'>;
export type createtype = Omit<orderCreate, 'envoy'>;

export  class productDto {
  @IsString()
  @IsUUID()
  id: string;
  @IsNumber()
  quantity: number;
}

export class createmethodDto implements createBodydto {
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productDto)
  productsId: productDto[];
}
