import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { deleteMethod } from 'src/client/application/usecase/delete';
import { subroutes } from 'src/client/application/routes/clientRoutes';
import { nameDto } from 'src/client/application/validate/name';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

/*----*/
@ApiTags(subroutes.delete)
@Controller(subroutes.delete)
export class DeleteController {
  constructor(@Inject(deleteMethod) private readonly Method: deleteMethod) {}
  @Delete()
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
  @UseGuards(JwtAuthGuard)
  async delete_client(@Body() name: nameDto) {
    try {
      await this.Method.Delete_Client(name.name, name.lastname, name.password);
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
