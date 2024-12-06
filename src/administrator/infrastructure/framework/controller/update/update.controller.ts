import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
  UsePipes,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import {
  routes,
  updateEnum,
} from 'src/administrator/application/router/router';
import { Phone } from '@/administrator/application/validation/phone';
import { Permission } from '@/administrator/application/validation/permission';
import { PasswordDto } from '@/administrator/application/validation/password';
import { EmailDto } from '@/administrator/application/validation/email';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
import { PhoneMethod } from './method/PhoneMethod';
import { PermissonMethod } from './method/permissionMethod';
import { PassMethod } from './method/PasswordMethod';
import { EmailMethod } from './method/emailMethod';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// actualizar datos
@ApiTags(routes.update)
@Controller(routes.update)
export class UpdateController {
  constructor(
    private readonly phoneMethod: PhoneMethod,
    private readonly permissionMethod: PermissonMethod,
    private readonly passMethod: PassMethod,
    private readonly emailMethod: EmailMethod,
  ) {}
  /*---*/
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Post(updateEnum.phone)
  async phone(@Body() phoneDto: Phone) {
    return await this.phoneMethod.phone(phoneDto);
  }
  /*----*/
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Post(updateEnum.permission)
  async permission(@Body() perminssionDto: Permission) {
    return await this.permissionMethod.permission(perminssionDto);
  }
  /*----*/
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Post(updateEnum.password)
  async password(@Body() passwordDto: PasswordDto) {
    return await this.passMethod.password(passwordDto);
  }
  /*---*/
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Post(updateEnum.email)
  async email(@Body() emailDto: EmailDto) {
    return await this.emailMethod.email(emailDto);
  }
}
