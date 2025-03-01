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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//--------------------------------------------------------------------------------------
import {
  subroutes,
  updateroutes,
  clientRoute,
} from 'src/client/application/routes/clientRoutes';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { admincheck } from './aux/admincheck';
//----------dto-validate-----------------------------------------------------------------------
import { email_update_Dto } from 'src/client/application/validate/email';
import { nameDto } from 'src/client/application/validate/updateName';
import { nameDto as passwordDto } from 'src/client/application/validate/name';
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
@ApiTags(`${clientRoute.client}-${subroutes.update}`)
@Controller(subroutes.update)
export class UpdateController {
  constructor(
    @Inject('UpdateMethod') private readonly update: UpdateMethod,
    private readonly admcheck: admincheck,
  ) {}
  //--------------------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------------------
  async updateEmail(
    @Body() email: email_update_Dto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      /*-------------------------------------------*/
      await this.admcheck.checkAdmin_Name_lastname(
        req,
        email.name,
        email.lastname,
      );
      /*-------------------------------------------*/
      const resp = await this.update.Update_Client_Email(
        email.name,
        email.lastname,
        email.email,
      );
      res.status(HttpStatus.OK).json({ update: `${resp}` });
      /*-------------------------------------------*/
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //--------------------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------------------
  async updateName(
    @Body() nameUpdate: nameDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.admcheck.checkAdmin_Name_lastname(
        req,
        nameUpdate.name,
        nameUpdate.lastname,
      );
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
  //--------------------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------------------
  async updatePassword(
    @Body() passw: passwordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.admcheck.checkAdmin_Name_lastname(
        req,
        passw.name,
        passw.lastname,
      );
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
