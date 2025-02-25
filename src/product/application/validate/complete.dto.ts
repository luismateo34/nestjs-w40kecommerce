import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  IsDate,
} from 'class-validator';
import { product } from 'src/product/domain/entity/entityInterfaceProduct';


export class productCompleteDto implements product {
  @IsNotEmpty()
  @IsString()
  category_product: string;
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsDate()
  deleted_at: Date;
  @IsNotEmpty()
  @IsString()
  franchise: string;
  @IsNotEmpty()
  @IsString()
  gender: string;
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
