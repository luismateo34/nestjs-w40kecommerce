import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/administrator/infrastructure/framework/decorator/roleDecorator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Reflector } from '@nestjs/core';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { AdminByName } from 'src/administrator/application/usecase';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('AdminByName') private readonly adminByName: AdminByName,
    private readonly reflector: Reflector,
  ) {}
  private async authenticate(payload: PayloadJwt): Promise<boolean> {
    try {
      const resp = await this.adminByName.findBy_name_lastname(
        payload.name,
        payload.lastname,
      );
      if (
        resp.id === payload.id &&
        resp.name === payload.name &&
        resp.lastname === payload.lastname &&
        resp.permission === payload.role
      ) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
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
    const { user } = context.switchToHttp().getRequest();
    const userObj: PayloadJwt = user;
    const tokenInclude = requiredRoles.some((role) =>
      userObj?.role?.includes(role),
    );
    if (!tokenInclude) {
      return false;
    } else if (tokenInclude) {
      return this.authenticate(userObj);
    }
  }
}
