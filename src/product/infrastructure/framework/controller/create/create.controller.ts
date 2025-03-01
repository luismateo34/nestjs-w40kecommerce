import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//---------------------------------------------------------------------------------------
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
//---------------------------------------------------------------------------------------
import { CreateMethod } from 'src/product/application/usecase/create';
import {
  subRoutes,
  productRoute,
} from 'src/product/application/routes/productRoute';
import { createDto } from 'src/product/application/validate/create';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@ApiTags(`${productRoute}-${subRoutes.create}`)
@Controller(subRoutes.create)
export class CreateController {
  constructor(@Inject('CreateMethod') private readonly create: CreateMethod) {}
  //-------------------------------------------------------------------------------------
  @Post()
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  //-------------------------------------------------------------------------------------
  async create_Product(createDto: createDto, @Res() res: Response) {
    try {
      const resp = await this.create.create_Product(createDto);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
