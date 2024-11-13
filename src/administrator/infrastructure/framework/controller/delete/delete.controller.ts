import {
  Controller,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { routes, subroutes } from 'src/administrator/application/router/router';
import { Delete as DeleteMethod } from 'src/administrator/application/usecase';
import { DeleteDto } from 'src/administrator/application/validation/delete';

@Controller(routes.admin)
export class DeleteController {
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(subroutes.delete)
  async delete(@Body() deleteDto: DeleteDto) {
    const resp = await DeleteMethod.delete(deleteDto.name, deleteDto.lastname);
    if (resp instanceof Error) {
      throw new HttpException(`${resp.message}`, HttpStatus.NOT_ACCEPTABLE);
    }
    throw new HttpException(`${resp}`, HttpStatus.ACCEPTED);
  }
}
