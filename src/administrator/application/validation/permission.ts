import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { IsNotEmpty, IsString, Min, IsEnum } from 'class-validator';

export class Permission {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Min(3)
  lastname: string;
  @IsNotEmpty()
  @IsEnum(permissions)
  permissions: permissions;
}
