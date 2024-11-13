import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/jwt/jwt-auth.guard';
import { AdminDto } from 'src/administrator/domain/validate/admin';
import { Register, register } from 'src/administrator/application/usecase';
import { routes, subroutes } from 'src/administrator/application/router/router';

@Controller(routes.admin)
export class CreateController {
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(subroutes.create)
  async create(@Body() admindto: AdminDto) {
    try {
      const resp = await Register.registerMethod(admindto);
      if (resp === register.NOT_FOUND || resp === register.ERROR) {
        throw new HttpException('error data', HttpStatus.NOT_ACCEPTABLE);
      } else if (typeof resp === 'string') {
        throw new HttpException(`${resp}`, HttpStatus.ACCEPTED);
      }
    } catch {
      throw new HttpException('error server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
