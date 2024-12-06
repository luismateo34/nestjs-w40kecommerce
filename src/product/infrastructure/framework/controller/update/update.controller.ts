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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
/*---*/

@ApiTags(subRoutes.update)
@Controller(subRoutes.update)
export class UpdateController {
  constructor(@Inject() private readonly update: updateMethod) {}
  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
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
}
