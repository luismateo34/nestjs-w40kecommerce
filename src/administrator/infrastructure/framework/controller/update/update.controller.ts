import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
  Inject,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import {
  routes,
  updateEnum,
} from 'src/administrator/application/router/router';
import {
  UpadatePhone,
  UpadatePermissions,
  UpadatePassword,
  UpadateEmail,
} from '@/administrator/application/usecase';
import { Phone } from '@/administrator/application/validation/phone';
import { Permission } from '@/administrator/application/validation/permission';
import { PasswordDto } from '@/administrator/application/validation/password';
import { EmailDto } from '@/administrator/application/validation/email';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';

// actualizar datos
@Controller(routes.update)
export class UpdateController {
  constructor(
    @Inject('UpadatePhone') private readonly updatePhone: UpadatePhone,
    @Inject('UpadatePermissions')
    private readonly updatePermissions: UpadatePermissions,
    @Inject('UpadatePassword') private readonly updatePassword: UpadatePassword,
    @Inject('UpadateEmail') private readonly updateEmail: UpadateEmail,
  ) {}

  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(updateEnum.phone)
  async phone(@Body() phoneDto: Phone) {
    try {
      await this.updatePhone.phone_update(
        phoneDto.lastname,
        phoneDto.name,
        phoneDto.phone,
      );
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }

  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(updateEnum.permission)
  async permission(@Body() perminssionDto: Permission) {
    try {
      const { lastname, name, permissions } = perminssionDto;
      await this.updatePermissions.update_Permisions(
        permissions,
        lastname,
        name,
      );
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException('error', HttpStatus.ACCEPTED);
    }
  }
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(updateEnum.password)
  async password(@Body() passwordDto: PasswordDto) {
    try {
      const { lastname, name, password } = passwordDto;
      await this.updatePassword.update_Pass(lastname, name, password);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(updateEnum.email)
  async email(@Body() emailDto: EmailDto) {
    try {
      const { lastname, name, email } = emailDto;
      await this.updateEmail.EmailUpdate(lastname, name, email);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
}
