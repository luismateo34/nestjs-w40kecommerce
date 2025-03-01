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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//----------------------------------------------------------------------------------------
import { deleteMethod } from 'src/client/application/usecase/delete';
import {
  subroutes,
  clientRoute,
} from 'src/client/application/routes/clientRoutes';
import { nameDto } from 'src/client/application/validate/name';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
@ApiTags(`${clientRoute.client}-${subroutes.delete}`)
@Controller(subroutes.delete)
export class DeleteController {
  constructor(@Inject('deleteMethod') private readonly Method: deleteMethod) {}
  //----------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------
  async delete_client(@Body() name: nameDto, @Res() res: Response) {
    try {
      const resp = await this.Method.Delete_Client(
        name.name,
        name.lastname,
        name.password,
      );
      if (resp === 'success') {
        res.status(HttpStatus.ACCEPTED);
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
