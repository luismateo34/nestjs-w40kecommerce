import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes, routFind } from 'src/administrator/application/router/router';
import {
  AdminByEmail,
  AdminByName,
  AllAdmin,
} from 'src/administrator/application/usecase';

@Controller(`${routes.admin}/${routes.find}`)
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
      const res = await this.adminByName.findBy_name_lastname(name, lastname);
      return res;
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
  async find_Email(@Query('email') email: string) {
    if (email === undefined || email.length === 0) {
      throw new HttpException(
        'error: name is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const res = await this.adminByEmail.ByEmail(email);
      return res;
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
  async find_All() {
    try {
      const res = await this.allAdmin.All();
      return res;
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
