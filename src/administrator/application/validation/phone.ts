import {
  IsNotEmpty,
  IsString,
  Min,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class Phone {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
  @IsNotEmpty()
  @Min(3)
  @IsPhoneNumber('AR')
  @IsNumber()
  phone: number;
}
