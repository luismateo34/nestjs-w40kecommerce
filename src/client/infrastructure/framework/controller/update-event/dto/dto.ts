import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Request } from 'express';

export class UpdateClientDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  payload: OrderPurchase;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  req: Request;
}
