import {
  Controller,
  Patch,
  Inject,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { SettingMethod } from 'src/product/application/usecase/setting';
import {
  subRoutes,
  settingRoutes,
} from 'src/product/application/routes/productRoute';
import {
  DiscountDto,
  PriceDto,
  StockDto,
} from 'src/product/application/validate/Setting';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/
@Controller(subRoutes.setting)
export class SettingController {
  constructor(
    @Inject('SettingMethod') private readonly usecase: SettingMethod,
  ) {}
  /*---*/
  @Patch(settingRoutes.discountproduct)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async discont_product(
    @Body() discountObj: DiscountDto,
    @Res() res: Response,
  ) {
    try {
      const { id, discount } = discountObj;
      const resp = await this.usecase.set_Discount_Product(id, discount);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*---*/
  @Patch(settingRoutes.priceproduct)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async price_product(@Body() priceObj: PriceDto, @Res() res: Response) {
    try {
      const { id, price } = priceObj;
      const resp = await this.usecase.set_Price_Product(id, price);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*---*/
  @Patch(settingRoutes.stockproduct)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async stock_product(@Body() stockobj: StockDto, @Res() res: Response) {
    try {
      const { id, stock } = stockobj;
      const resp = await this.usecase.set_Stock_Product(id, stock);
      res.status(HttpStatus.OK).json({ response: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
