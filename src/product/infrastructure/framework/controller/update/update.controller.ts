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
import { subRoutes } from 'src/product/application/routes/productRoute';
import { updateMethod } from 'src/product/application/usecase/update';
import { updateDto } from 'src/product/application/validate/create';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/
@Controller(subRoutes.update)
export class UpdateController {
  constructor(@Inject() private readonly update: updateMethod) {}
  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Body() updateObj: updateDto, @Res() res: Response) {
    try {
      const { id, ...obj } = updateObj;
      const resp = await this.update.update_Product(id, obj);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
