import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { routes, subroutes } from 'src/administrator/application/router/router';
import {
  UpadatePhone,
  UpadatePermissions,
  UpadatePassword,
  UpadateEmail,
} from '@/administrator/application/usecase';
import { Phone } from '@/administrator/application/validation/phone';
import { Permission } from '@/administrator/application/validation/permission';
import { PasswordDto } from '@/administrator/application/validation/password';

@Controller(routes.admin)
export class UpdateController {
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/phone`)
  async phone(@Body() phoneDto: Phone) {
    const resp = await UpadatePhone.update_Phone(
      phoneDto.lastname,
      phoneDto.name,
      phoneDto.phone,
    );
    if (resp instanceof Error) {
      throw new HttpException(`${resp.message}`, HttpStatus.NOT_ACCEPTABLE);
    }
    throw new HttpException(`${resp}`, HttpStatus.ACCEPTED);
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/permission`)
  async permission(@Body() perminssionDto: Permission) {
    const { lastname, name, permissions } = perminssionDto;
    const resp = await UpadatePermissions.update_Permisions(
      permissions,
      lastname,
      name,
    );
    if (resp instanceof Error) {
      throw new HttpException(`${resp.message}`, HttpStatus.NOT_ACCEPTABLE);
    }
    throw new HttpException(`${resp}`, HttpStatus.ACCEPTED);
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(`${subroutes.update}/password`)
  async password(@Body() passwordDto: PasswordDto) {
    const { lastname, name, password } = passwordDto;
    const resp = UpadatePassword.update_Password(lastname, name, password);
    if (resp instanceof Error) {
      throw new HttpException(`${resp.message}`, HttpStatus.NOT_ACCEPTABLE);
    }
    throw new HttpException(`${resp}`, HttpStatus.ACCEPTED);
  }
}
