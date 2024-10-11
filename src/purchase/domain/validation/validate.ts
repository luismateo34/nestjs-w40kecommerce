import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';
import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsDate,
} from 'class-validator';
type validate = Omit<OrderPurchase, 'id' | 'createdAt' | 'updatedAt'>;

export class totalDto implements validate {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  client: [string, string];
  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsBoolean()
  envoy: boolean;
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  products: string[];
}
export class envoy {
  @IsNotEmpty()
  @IsBoolean()
  envoy: boolean;
}
