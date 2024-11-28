import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { orderCreate } from '@/purchase/domain/usecase/usecases';

export type OrderWithoutDate = Omit<orderCreate, 'date' | 'envoy'>;

export class createDto implements OrderWithoutDate {
  /*-----*/
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2, { each: true })
  client: string[];

  /*-----*/
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  /*-----*/

  envoy: boolean;

  /*-----*/
  @IsNotEmpty()
  @IsArray({ each: true })
  products: string[];
}
