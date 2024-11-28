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
} from '@nestjs/common';
import {
  subRoutes,
  updateRoutes,
} from 'src/purchase/application/routes/purchaseRoutes';
import { updateMethod } from 'src/purchase/application/usecases/update';
import { createDto } from 'src/purchase/application/validate/order';

@Controller(subRoutes.update)
export class UpdateController {
  constructor(@Inject('updateMethod') private readonly service: updateMethod) {}

  @Put(updateRoutes.order)
  @UsePipes(new ValidationPipe({ transform: true }))
  async order(@Body() order: createDto) {
    try {
      const resp = await this.service.update(order);
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
  /*-----*/
  @Put(':id')
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
