import {
  Controller,
  Put,
  Inject,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//---------------------------------------------------------------------------------------
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Roles } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
//---------------------------------------------------------------------------------------
import {
  subRoutes,
  productRoute,
} from 'src/product/application/routes/productRoute';
//------------method----------------------------------------------------------------------
import { updateMethod } from 'src/product/application/usecase/update';
import { findMethod } from 'src/product/application/usecase/find';
import { updateDto } from 'src/product/application/validate/create';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
//---------------------------------------------------------------------------------------
import { Productpurchase } from 'src/evenpayload/updateProduct.dto';
//---------------------------------------------------------------------------------------
//--------------UPDATE-CONTROLLER--------------------------------------------------------
@ApiTags(`${productRoute.product}-${subRoutes.update}`)
@Controller(subRoutes.update)
//------------------------------
export class UpdateController {
  constructor(
    @Inject('updateMethod') private readonly update: updateMethod,
    @Inject('findMethod') private readonly find: findMethod,
  ) {}
  //----------------------------------------------------------
  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
  @Roles(permissions.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard) // solo administrador puede realizar esta accion
  //----------------------------------------------------
  async updateProduct(@Body() updateObj: updateDto, @Res() res: Response) {
    try {
      const { id } = updateObj;
      const resp = await this.update.update_Product(id, updateObj);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //----------------------------------------------
  @UsePipes(new ValidationPipe({ transform: true }))
  @OnEvent('product_purchase', { async: true })
  async evenUodate(@Body() Dto: Productpurchase) {
    try {
      const { product } = Dto;
      const fnMap = async () =>
        await Promise.all(
          product.map(async (el) => {
            const obj = await this.find.find_Product_by_Id(el.id);
            const newStock = obj.stock - el.quantity;
            if (newStock < 0) {
              throw new Error(`${obj.name} no tiene suficiente stock`);
            }
            const resp: typeof obj = {
              category_product: obj.category_product,
              franchise: obj.franchise,
              gender: obj.gender,
              id: obj.id,
              name: obj.name,
              percentaje_discount: obj.percentaje_discount,
              price: obj.price,
              status: obj.status,
              stock: newStock,
            };
            return resp;
          }),
        );
      const arr = await fnMap();
      //-------------------------------------------------------------------
      const result = async () =>
        await Promise.all(
          arr.map(async (el) => await this.update.update_Product(el.id, el)),
        );
      const ArrSucces = await result();
      //--------------------------------------------------------------------
      if (ArrSucces.length < product.length) {
        return;
      }
      //-----------------------------------------------------------------------
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
