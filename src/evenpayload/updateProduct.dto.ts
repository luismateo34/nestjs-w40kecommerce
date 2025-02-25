import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { productDto } from 'src/purchase/application/validate/order';

export class Productpurchase {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productDto)
  product: productDto[];
}
