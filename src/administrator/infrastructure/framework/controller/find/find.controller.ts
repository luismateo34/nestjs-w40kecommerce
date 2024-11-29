import { Controller, Get, UseGuards, Query, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { routes, routFind } from 'src/administrator/application/router/router';
import { type Response as ExpRes } from 'express';
import { lastname } from './method/lastnameMethod';
import { Emailmethod } from './method/EmailMethod';
import { Allmethod } from './method/allMethod';

/*----*/
@Controller(routes.find)
export class FindController {
  constructor(
    private readonly lastnameMethod: lastname,
    private readonly emailmethod: Emailmethod,
    private readonly allmethod: Allmethod,
  ) {}
  /*---*/
  @UseGuards(JwtAuthGuard)
  @Get(routFind.byName)
  async find_Name_Lastname(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Res() res: ExpRes,
  ) {
    return await this.lastnameMethod.find_Name_Lastname(name, lastname, res);
  }
  /*----*/
  @UseGuards(JwtAuthGuard)
  @Get(routFind.byEmail)
  async find_Email(@Query('email') email: string, @Res() res: ExpRes) {
    return await this.emailmethod.find_Email(email, res);
  }
  @UseGuards(JwtAuthGuard)
  @Get(routFind.all)
  async find_All(@Res() res: ExpRes) {
    return await this.allmethod.find_All(res);
  }
}
