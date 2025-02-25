import { Controller, Get } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ClientAllDataMehtod } from '../clientAllDataMethod';

@Controller('mock')
export class MockController {
  constructor(private readonly clientAllDataMethod: ClientAllDataMehtod) {}
  @Get()
  async find(name: string, lastname: string, req: Request, res: Response) {
     return await this.clientAllDataMethod.clientAllData(name, lastname, req, res);
  }
}
