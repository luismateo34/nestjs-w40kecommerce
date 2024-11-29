import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CreateMethod } from 'src/product/application/usecase/create';
import { subRoutes } from 'src/product/application/routes/productRoute';
import { createDto } from 'src/product/application/validate/create';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/
@Controller(subRoutes.create)
export class CreateController {
  constructor(@Inject('CreateMethod') private readonly create: CreateMethod) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create_Product(createDto: createDto, @Res() res: Response) {
    try {
      const resp = await this.create.create_Product(createDto);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
