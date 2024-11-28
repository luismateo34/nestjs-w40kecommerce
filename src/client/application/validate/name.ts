import { IsNotEmpty, IsString, Min, IsEmail } from 'class-validator';

export class nameDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  password: string;
}

export class client_createDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  password: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
