import {
  IsEmail,
  Min,
  IsPhoneNumber,
  IsNotEmpty,
  IsString,
  IsEnum,
} from 'class-validator';
import { admin, permissions } from '../entity/entityAdminInterface';

export class AdminDto implements admin {
  @IsNotEmpty()
  @Min(3)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Min(3)
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('AR')
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(permissions)
  permissions: permissions;
}

export class Email {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class NameandLastname {
  @IsNotEmpty()
  @Min(3)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Min(3)
  @IsString()
  lastname: string;
}
export class Phone {
  @IsNotEmpty()
  @IsPhoneNumber('AR')
  phone: number;
}

export class Permissions {
  @IsNotEmpty()
  @IsEnum(permissions)
  permissions: permissions;
}

export class Password {
  @IsNotEmpty()
  @IsString()
  @Min(8)
  password: string;
  password: string;
}
