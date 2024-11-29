import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class DiscountDto {
  @IsNotEmpty()
  @IsString()
  @Min(1)
  id: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  discount: number;
}
export class PriceDto {
  @IsNotEmpty()
  @IsString()
  @Min(1)
  id: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}
export class StockDto {
  @IsNotEmpty()
  @IsString()
  @Min(1)
  id: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  stock: number;
}
