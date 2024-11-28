import {
  Controller,
  Body,
  Delete as DeleteMethod,
  ValidationPipe,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
  Inject,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes } from 'src/administrator/application/router/router';
import { Delete as DeleteCase } from 'src/administrator/application/usecase';
import { DeleteDto } from 'src/administrator/application/validation/delete';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';

// borrar administrador
@Controller(routes.delete)
export class DeleteController {
  constructor(@Inject('Delete') private readonly deleteMethod: DeleteCase) {}

  @Roles(permissions.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @DeleteMethod()
  async delete(@Body() deleteDto: DeleteDto) {
    try {
      await this.deleteMethod.delete(deleteDto.name, deleteDto.lastname);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
