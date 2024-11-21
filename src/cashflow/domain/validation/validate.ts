import {
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { cash } from '../entity/entityInterfaceCashflow';

export class Dto implements cash {
  @IsNotEmpty()
  @IsNumber()
  balance_day: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  expenses: number;

  @IsNotEmpty()
  @IsArray()
  monthly_balance: number;

  @IsNotEmpty()
  @IsArray()
  monthly_expenses: number;

  @IsNotEmpty()
  @IsArray()
  monthly_revenue: number;

  @IsNotEmpty()
  @IsNumber()
  revenue: number;
}
export class Dataday {
  @IsNotEmpty()
  @Min(4)
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Max(2)
  @IsNumber()
  month: number;

  @IsNotEmpty()
  @Max(2)
  @IsNumber()
  day: number;
}
export class Datamonth {
  @IsNotEmpty()
  @Min(4)
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Max(2)
  @IsNumber()
  month: number;
}
