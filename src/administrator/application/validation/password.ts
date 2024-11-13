import { IsNotEmpty, IsString, Min } from 'class-validator';
import { Payload } from 'src/administrator/application/types/payload';

export class PasswordDto implements Payload {
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
  @Min(8)
  password: string;
  }
