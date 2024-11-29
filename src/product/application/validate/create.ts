import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';
import {
  createProduct,
  productget,
} from '@/product/domain/entity/entityInterfaceProduct';

export class createDto implements createProduct {
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
  gender: string;
  @IsNotEmpty()
  @IsArray({ each: true })
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
export class updateDto implements productget {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
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
  gender: string;
  @IsNotEmpty()
  @IsArray({ each: true })
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
