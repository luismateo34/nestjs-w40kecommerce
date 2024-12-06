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
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  subRoutes,
  updateRoutes,
} from 'src/purchase/application/routes/purchaseRoutes';
import { updateMethod } from 'src/purchase/application/usecases/update';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { createDto } from 'src/purchase/application/validate/order';
/*---*/

@ApiTags(subRoutes.update)
@Controller(subRoutes.update)
export class UpdateController {
  constructor(@Inject('updateMethod') private readonly service: updateMethod) {}
  /*----*/
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
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
