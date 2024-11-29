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
import { subRoutes } from 'src/product/application/routes/productRoute';
import { deleteMethod } from 'src/product/application/usecase/delete';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';

@Controller(subRoutes.delete)
export class DeleteController {
  constructor(
    @Inject('DeleteMethod') private readonly methodDelete: deleteMethod,
  ) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
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
