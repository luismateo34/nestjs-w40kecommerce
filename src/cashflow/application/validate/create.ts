import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { string_month_spanish } from 'src/cashflow/application/month/month';

export class createcash {
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsNumber()
  day: number;
  @IsNotEmpty()
  @IsString()
  month: string_month_spanish;
}
export class createcashMonth {
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsString()
  month: string_month_spanish;
}

export class revenueDay {
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsString()
  month: string_month_spanish;
  @IsNotEmpty()
  @IsNumber()
  day: number;
  @IsNotEmpty()
  @IsNumber()
  revenue: number;
}
export class expenseDay {
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsString()
  month: string_month_spanish;
  @IsNotEmpty()
  @IsNumber()
  day: number;
  @IsNotEmpty()
  @IsNumber()
  expenses: number;
}
