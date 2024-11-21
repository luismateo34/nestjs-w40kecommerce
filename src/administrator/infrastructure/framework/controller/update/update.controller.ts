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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes, subroutes } from 'src/administrator/application/router/router';
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
@Controller(routes.admin)
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/phone`)
  async phone(@Body() phoneDto: Phone) {
    try {
      await this.updatePhone.update_Phone(
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/permission`)
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/password`)
  async password(@Body() passwordDto: PasswordDto) {
    try {
      const { lastname, name, password } = passwordDto;
      await this.updatePassword.update_Password(lastname, name, password);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/email`)
  async email(@Body() emailDto: EmailDto) {
    try {
      const { lastname, name, email } = emailDto;
      await this.updateEmail.update_Email(lastname, name, email);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
}
