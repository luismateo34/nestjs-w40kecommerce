import { AdminByName } from 'src/administrator/application/usecase';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class lastname {
  constructor(
    @Inject('AdminByName') private readonly adminByName: AdminByName,
  ) {}
  async find_Name_Lastname(
    name: string,
    lastname: string,
    @Res() res: Response,
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
}
