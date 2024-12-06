import { client } from '../entity/entityInterfaceClient';
import {
  IsEmail,
  Min,
  IsNotEmpty,
  IsString,
  IsArray,
  IsUUID,
} from 'class-validator';

type clientType = Pick<client, 'name' | 'lastname' | 'email' | 'password'>;

export class clientDTO implements clientType {
  @IsNotEmpty()
  @Min(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(3)
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class UpdatePurchase {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  purchase_orders: string[];
}
