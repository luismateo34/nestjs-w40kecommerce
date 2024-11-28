import { IsNotEmpty, IsString, Min, IsEmail } from 'class-validator';

export class email_update_Dto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
