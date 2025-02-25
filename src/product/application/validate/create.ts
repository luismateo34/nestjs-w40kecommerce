import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  createProduct,
  productget,
} from 'src/product/domain/entity/entityInterfaceProduct';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
import { OrderCompleteDto } from 'src/purchase/application/validate/orderCreate';

// dto para crear producto
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
  @IsOptional() // no existe orden de compra cuando el producto se crea
  OrderPurchase: null;
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderCompleteDto)
  OrderPurchase: OrderPurchase[];
}
