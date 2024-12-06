import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { subRoutes } from 'src/purchase/application/routes/purchaseRoutes';
/*---*/
import { createMethod } from 'src/purchase/application/usecases/create';
/*---*/
import { createBodyDto } from 'src/purchase/application/validate/order';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
import { Request } from 'express';
/*---*/
/*---*/

@ApiTags(subRoutes.create)
@Controller(subRoutes.create)
export class CreateController {
  constructor(
    @Inject('createMethod') private readonly Method: createMethod,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() Order: createBodyDto, @Req() req: Request) {
    try {
      const obj = await this.Method.create(Order);
      if (obj === 'success') {
        //this.eventEmitter.emit('purchase_update', {
          //purchaseId: PurchaseId,
          //payload: req,
        //});
	//this.eventEmitter('product_update',{
	  //payload: Order.products
	//})
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
