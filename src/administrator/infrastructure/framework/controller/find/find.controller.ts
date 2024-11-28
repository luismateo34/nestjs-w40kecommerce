import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes, routFind } from 'src/administrator/application/router/router';
import {
  AdminByEmail,
  AdminByName,
  AllAdmin,
} from 'src/administrator/application/usecase';
import { type Response as ExpRes } from 'express';

@Controller(routes.find)
export class FindController {
  constructor(
    @Inject('AdminByEmail') private readonly adminByEmail: AdminByEmail,
    @Inject('AdminByName') private readonly adminByName: AdminByName,
    @Inject('AllAdmin') private readonly allAdmin: AllAdmin,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(routFind.byName)
  async find_Name_Lastname(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Res() res: ExpRes,
  ) {
    if (name === undefined || name.length === 0) {
      throw new HttpException(
        'error: name is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (lastname === undefined || lastname.length === 0) {
      throw new HttpException(
        'error: name is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const obj = await this.adminByName.findBy_name_lastname(name, lastname);
      res.status(HttpStatus.ACCEPTED).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error:${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get(routFind.byEmail)
  async find_Email(@Query('email') email: string, @Res() res: ExpRes) {
    if (email === undefined || email.length === 0) {
      throw new HttpException(
        'error: name is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const obj = await this.adminByEmail.ByEmail(email);
      return res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error:${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get(routFind.all)
  async find_All(@Res() res: ExpRes) {
    try {
      const obj = await this.allAdmin.All();
      return res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error:${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
