import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { subroutes } from 'src/client/application/routes/clientRoutes';
import { CreateMethod } from 'src/client/application/usecase/create';
import { client_createDto } from 'src/client/application/validate/name';

/*----*/
@ApiTags(subroutes.create)
@Controller(subroutes.create)
export class CreateController {
  constructor(@Inject('CreateMethod') private readonly Method: CreateMethod) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() name_lastname: client_createDto) {
    try {
      const { email, lastname, name, password } = name_lastname;
      const resp = await this.Method.Create_Client(
        name,
        lastname,
        password,
        email,
      );
      if (resp === 'success') {
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error: ${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
