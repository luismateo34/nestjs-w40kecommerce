import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
//---------------------------------------------------------------------------------------
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
//---------------------------------------------------------------------------------------
import {
  subRoutes,
  productRoute,
} from 'src/product/application/routes/productRoute';
import { deleteMethod } from 'src/product/application/usecase/delete';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

@ApiTags(`${productRoute.product}-${subRoutes.delete}`)
@Controller(subRoutes.delete)
export class DeleteController {
  constructor(
    @Inject('deleteMethod') private readonly methodDelete: deleteMethod,
  ) {}
  //-------------DELETE------------------------------------------------------------------
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  //---------------------------------------------------------------------------------------
  async delete_Product(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.methodDelete.delete_ProductId(id);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
