import {
  Controller,
  Delete,
  Res,
  Inject,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { subRoutes } from 'src/purchase/application/routes/purchaseRoutes';
import { deleteMethod } from 'src/purchase/application/usecases/delete';

@Controller(subRoutes.delete)
export class DeleteController {
  constructor(@Inject('DeleteMethod') readonly Deletemethod: deleteMethod) {}
  /*----*/
  @Delete()
  async order(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.Deletemethod.delete_Order(id);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
