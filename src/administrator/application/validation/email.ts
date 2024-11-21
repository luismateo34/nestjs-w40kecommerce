import { IsNotEmpty, IsString, Min, IsEmail } from 'class-validator';
import { Payload } from 'src/administrator/application/types/emailPayload';

export class EmailDto implements Payload {
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
  @IsEmail()
  email: string;
}
