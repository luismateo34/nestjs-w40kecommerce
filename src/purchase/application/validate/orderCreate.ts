import {
  ObjProductOrder,
  OrderPurchase,
} from 'src/purchase/domain/entity/entityInterfaceOrder';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { product } from 'src/product/domain/entity/entityInterfaceProduct';
/*---*/
type createPurchase = Omit<OrderPurchase, 'id' | 'updatedAt' | 'createdAt'>;
/*---*/
class ObjProductOrderDto implements ObjProductOrder {
  @ValidateNested()
  product: product;
  @IsNumber()
  quantity: number;
}

export class OrderCompleteDto implements OrderPurchase {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjProductOrderDto)
  products: ObjProductOrder[];
  /*---*/
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsBoolean()
  envoy: boolean;
  @ValidateNested({ each: true })
  client: client;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

export class orderCreateDto implements createPurchase {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjProductOrderDto)
  products: ObjProductOrder[];
  /*---*/
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  /*---*/
  @IsNotEmpty()
  @IsBoolean()
  envoy: boolean;
  /*---*/
  @ValidateNested()
  client: client;
}
