import { IsNotEmpty, IsString, Min } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
}
