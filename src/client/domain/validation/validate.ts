import { client } from '../entity/entityInterfaceClient';
import { IsEmail, Min, IsNotEmpty, IsString } from 'class-validator';

type clientType = Omit<client, 'purchase_order' | 'purchase_product'>;

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
