import { client } from 'src/client/domain/entity/entityInterfaceClient';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEmail,
  IsUUID,
  IsArray,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
type createClient = Omit<client, 'createdAt' | 'updatedAt' | 'id'>;
import { OrderCompleteDto } from 'src/purchase/application/validate/orderCreate';

export class createClientDto implements createClient {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsEmpty()
  purchase_order: null;
}

type updatetype = Omit<client, 'createdAt' | 'updatedAt'>;

export class updateClientDto implements updatetype {
  @IsString()
  @IsNotEmpty()
  name: string;
  //--
  @IsString()
  @IsNotEmpty()
  email: string;
  //---
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
  //---
  @IsString()
  @IsNotEmpty()
  lastname: string;
  //---
  @IsString()
  @IsOptional()
  password: string;
  //---
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderCompleteDto)
  purchase_order: OrderPurchase[];
}
