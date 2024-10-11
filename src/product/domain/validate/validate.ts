import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { createProduct } from '@/product/domain/entity/entityInterfaceProduct';

export class ProductDto implements createProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category_product: string;

  @IsNotEmpty()
  @IsString()
  franchise: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  gender: string | null;

  @IsNotEmpty()
  @IsArray()
  order_product: string[];

  @IsNotEmpty()
  @IsNumber()
  percentaje_discount: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
