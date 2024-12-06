import {
  Controller,
  Put,
  Inject,
  ValidationPipe,
  UsePipes,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  subroutes,
  updateroutes,
} from 'src/client/application/routes/clientRoutes';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { email_update_Dto } from 'src/client/application/validate/email';
import { nameDto } from 'src/client/application/validate/updateName';
import { nameDto as passwordDto } from 'src/client/application/validate/name';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

/*---*/
@ApiTags(subroutes.update)
@Controller(subroutes.update)
export class UpdateController {
  constructor(
    @Inject('UpdateMethod') private readonly update: UpdateMethod,
    private readonly permin: permissions,
  ) {}
  /*---*/
  @Put(updateroutes.email)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateEmail(
    @Body() email: email_update_Dto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.permin.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.permin.clientPayload(req);
      }
      if (
        (!adminAuth && client.lastname !== email.lastname) ||
        client.name !== email.name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*---*/
      const resp = await this.update.Update_Client_Email(
        email.name,
        email.lastname,
        email.email,
      );
      res.status(HttpStatus.OK).json({ update: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*----*/
  @Put(updateroutes.name)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateName(
    @Body() nameUpdate: nameDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.permin.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.permin.clientPayload(req);
      }
      if (
        (!adminAuth && client.lastname !== nameUpdate.lastname) ||
        client.name !== nameUpdate.name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*----*/
      const resp = await this.update.Update_Client_Name(
        nameUpdate.name,
        nameUpdate.lastname,
      );
      res.status(HttpStatus.OK).json({ update: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*----*/
  @Put(updateroutes.password)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePassword(
    @Body() passw: passwordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.permin.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.permin.clientPayload(req);
      }
      if (
        (!adminAuth && client.lastname !== passw.lastname) ||
        client.name !== passw.name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*----*/
      const { name, lastname, password } = passw;
      const resp = await this.update.Update_Client_Password(
        name,
        lastname,
        password,
      );
      res.status(HttpStatus.OK).json({ update: `${resp}` });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
