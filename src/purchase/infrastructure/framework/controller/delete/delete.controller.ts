import {
  Controller,
  Delete,
  Res,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { subRoutes } from 'src/purchase/application/routes/purchaseRoutes';
import { deleteMethod } from 'src/purchase/application/usecases/delete';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/

@ApiTags(subRoutes.delete)
@Controller(subRoutes.delete)
export class DeleteController {
  constructor(@Inject('DeleteMethod') readonly Deletemethod: deleteMethod) {}
  /*----*/
  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error.',
  })
  @UseGuards(JwtAuthGuard)
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
