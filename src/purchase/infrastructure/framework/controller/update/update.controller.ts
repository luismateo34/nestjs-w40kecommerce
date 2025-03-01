import {
  Controller,
  Put,
  Inject,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpException,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
//---------------------------------------------------------------------------------------
import {
  subRoutes,
  updateRoutes,
  purchaseRoute,
} from 'src/purchase/application/routes/purchaseRoutes';
import { updateMethod } from 'src/purchase/application/usecases/update';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { orderCreateDto } from 'src/purchase/application/validate/orderCreate';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

@ApiTags(`${purchaseRoute.purchase}-${subRoutes.update}`)
@Controller(subRoutes.update)
export class UpdateController {
  constructor(
    @Inject('updateMethod') private readonly service: updateMethod,
    private eventEmitter: EventEmitter2,
  ) {}
  /*----*/
  //---------------------------------------------------------------------------------------
  @Put(updateRoutes.order)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  //---------------------------------------------------------------------------------------
  async order(@Body() order: orderCreateDto, @Req() req: Request) {
    try {
      const resp = await this.service.update(order);

      this.eventEmitter.emit('purchase_update', {
        req: req,
        payload: resp,
      });
      this.eventEmitter.emit('product_purchase', {
        product: order.products,
      });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.BAD_REQUEST);
    }
  }
  //---------------------------------------------------------------------------------------
  /*-----*/
  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
  //---------------------------------------------------------------------------------------
  async enovoy_id(@Param('id') id: string) {
    try {
      const resp = await this.service.update_Envoy(id);
      if (resp === 'success') {
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.BAD_REQUEST);
    }
  }
}
