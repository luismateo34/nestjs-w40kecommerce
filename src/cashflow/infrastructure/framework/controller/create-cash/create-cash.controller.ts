import {
  Controller,
  Post,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateMethod } from 'src/cashflow/application/usacases/create';
import { subRoutes } from 'src/cashflow/application/routes/routes';
import type { VercelRequest, VercelResponse } from '@vercel/node';

@Controller(subRoutes.create)
export class CreateCashController {
  constructor(
    @Inject('CreateMethod') private readonly createMethod: CreateMethod,
  ) {}
  @Post()
  async create(request: VercelRequest, response: VercelResponse) {
    //const authHeader = request.headers.get('authorization');
    const authHeader = request.headers.authorization;
    if (
      process.env.CRON_SECRET === undefined ||
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return response.status(401).json({ success: false });
    }
    try {
      const resp = await this.createMethod.create_Cash_Order_day();
      if (resp === 'success') {
        return;
      }

      return response.status(200).json({ success: true });
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('dev')
  async create_dev() {
    if (process.env.ENVIRONMENT !== 'dev') {
      throw new HttpException(
        'error, ruta solo para dev',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const resp = await this.createMethod.create_Cash_Order_day();
      if (resp === 'success') {
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
