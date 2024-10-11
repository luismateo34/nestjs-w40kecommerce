import { client } from '../entity/entityInterfaceClient';
import { IsEmail, Min, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class clinetDTO implements client {
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
  @IsNotEmpty()
  @IsArray()
  purchase_order: string[];

  @IsNotEmpty()
  @IsArray()
  purchase_product: string[];
}
