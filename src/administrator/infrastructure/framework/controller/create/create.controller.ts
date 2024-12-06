import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/jwt/jwt-auth.guard';
import { AdminDto } from 'src/administrator/domain/validate/admin';
import { Register, register } from 'src/administrator/application/usecase';
import { routes } from 'src/administrator/application/router/router';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// crear administrador
@ApiTags(routes.create)
@Controller(routes.create)
export class CreateController {
  constructor(@Inject('Register') private readonly register: Register) {}
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Post()
  async create(@Body() admindto: AdminDto) {
    try {
      const resp = await this.register.registerMethod(admindto);
      if (resp === register.ERRORDATA) {
        throw new HttpException('error data', HttpStatus.NOT_ACCEPTABLE);
      } else if (resp === 'success') {
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `erro: ${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException('error server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
