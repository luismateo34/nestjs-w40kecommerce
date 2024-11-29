import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import {
  findRoutes,
  subRoutes,
} from 'src/product/application/routes/productRoute';
import { findMethod } from 'src/product/application/usecase/find';
import { Response } from 'express';

@Controller(subRoutes.find)
export class FindController {
  constructor(private readonly methodFind: findMethod) {}

  /*---*/
  @Get(findRoutes.productbyname)
  async findRoutes(@Query('name') name: string, @Res() res: Response) {
    try {
      const resp = await this.methodFind.find_Product_by_Name(name);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*---*/
  @Get(findRoutes.stockproductname)
  async stock_product(@Query('name') name: string, @Res() res: Response) {
    try {
      const resp = await this.methodFind.find_Stock_productName(name);
      res.status(HttpStatus.OK).json({ stock: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*---*/
  @Get(findRoutes.productsGender)
  async productgender(@Query('gender') gender: string, @Res() res: Response) {
    try {
      const resp = await this.methodFind.find_Products_Gender(gender);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*---*/
  @Get(findRoutes.productsCategory)
  async products_category(
    @Query('category') category: string,
    @Res() res: Response,
  ) {
    try {
      const resp = await this.methodFind.find_Products_Category(category);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*----*/
  @Get(findRoutes.productsFranchise)
  async Products_Franchise(
    @Query('franchise') franchise: string,
    @Res() res: Response,
  ) {
    try {
      const resp = await this.methodFind.find_Products_Franchise(franchise);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*---*/
  @Get(`${findRoutes.stockproductnameId}/:id`)
  async stock_productNameId(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.methodFind.find_Stock_productId(id);
      res.status(HttpStatus.OK).json({ stock: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //id
  @Get(`${findRoutes.stockproductbyId}/:id`)
  async product_by_Id(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.methodFind.find_Stock_Product_by_Id(id);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
