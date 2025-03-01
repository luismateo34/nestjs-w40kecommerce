import {
  Controller,
  Get,
  UseGuards,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Response as ExpRes } from 'express';
//--------------------------------------------------------------------------------------
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes, routFind } from 'src/administrator/application/router/router';
import { lastname } from './method/lastnameMethod';
import { Emailmethod } from './method/EmailMethod';
import { Allmethod } from './method/allMethod';
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
@ApiTags(`admin-${routes.find}`)
@Controller(routes.find)
export class FindController {
  constructor(
    private readonly lastnameMethod: lastname,
    private readonly emailmethod: Emailmethod,
    private readonly allmethod: Allmethod,
  ) {}
  //--------------------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get(routFind.byName)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  //--------------------------------------------------------------------------------------
  async find_Name_Lastname(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Res() res: ExpRes,
  ) {
    return await this.lastnameMethod.find_Name_Lastname(name, lastname, res);
  }
  //--------------------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get(routFind.byEmail)
  //--------------------------------------------------------------------------------------
  async find_Email(@Query('email') email: string, @Res() res: ExpRes) {
    return await this.emailmethod.find_Email(email, res);
  }
  //--------------------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get(routFind.all)
  //--------------------------------------------------------------------------------------
  async find_All(@Res() res: ExpRes) {
    return await this.allmethod.find_All(res);
  }
}
