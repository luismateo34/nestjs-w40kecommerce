import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
//---------------------------------------------------------------------------------------
import { ROLES_KEY } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { AdminDto } from 'src/administrator/domain/validate/admin';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  //---------------------------------------------------------------------------------------
  private authenticate(cookie: string, role: permissions[]): boolean {
    try {
      const secret = this.configService.get('JWT_SECRET');
      const payload: PayloadJwt = this.jwtService.decode(cookie, secret);
      const roletoken = payload.role;
      const rolePerm = role.some((el) => el === roletoken);
      return rolePerm;
    } catch {
      return false;
    }
  }
  //---------------------------------------------------------------------------------------
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<permissions[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredRoles === null || requiredRoles.length === 0) {
      return false;
    }
    const req: Request = context.switchToHttp().getRequest();
    const body: AdminDto = req.body;
    const cookie: string = req.cookies.access_token;
    const tokenInclude = requiredRoles.some(
      (role) => body.permissions === role,
    );
    if (!tokenInclude) {
      return false;
    } else if (tokenInclude) {
      const resp = this.authenticate(cookie, requiredRoles);
      return resp;
    }
  }
}
