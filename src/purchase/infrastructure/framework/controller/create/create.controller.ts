import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { subRoutes } from 'src/purchase/application/routes/purchaseRoutes';
import { createMethod } from 'src/purchase/application/usecases/create';
import { createDto } from 'src/purchase/application/validate/order';

@Controller(subRoutes.create)
export class CreateController {
  constructor(@Inject('createMethod') private readonly Method: createMethod) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() Order: createDto) {
    try {
      const obj = await this.Method.create(Order);
      if (obj === 'success') {
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
