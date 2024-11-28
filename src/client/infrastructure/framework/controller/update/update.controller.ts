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
} from '@nestjs/common';
import { Response } from 'express';
import {
  subroutes,
  updateroutes,
} from 'src/client/application/routes/clientRoutes';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { email_update_Dto } from 'src/client/application/validate/email';
import { nameDto } from 'src/client/application/validate/updateName';

/*---*/
@Controller(subroutes.update)
export class UpdateController {
  constructor(@Inject('UpdateMethod') private readonly update: UpdateMethod) {}
  /*---*/
  @Put(updateroutes.email)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateEmail(@Body() email: email_update_Dto, @Res() res: Response) {
    try {
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateName(@Body() nameUpdate: nameDto, @Res() res: Response) {
    try {
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
  //@Put(updateroutes.password)
}
