import { JwtVerifyOptions } from '@nestjs/jwt';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { permissions as permissionsInterface } from 'src/administrator/domain/entity/entityAdminInterface';

export const payload: PayloadJwt = {
  id: '1',
  lastname: 'gordo',
  name: 'gato',
  role: permissionsInterface.NOADMIN,
};

export class jwtmock {
  decode(str: string) {
    if (typeof str === 'string') {
      return payload;
    }
  }
  sign(payload: unknown, options?: unknown): string {
    if (payload !== null) {
      return 'hola gato';
    }
    if (options === null) {
      return 'hola gato';
    }
  }
  async signAsync(payload: unknown, options?: unknown): Promise<string> {
    if (payload !== null) {
      return '';
    }
    if (options === null) {
      return '';
    }
  }
  verify<T extends object = any>(token: string, options?: JwtVerifyOptions): T {
    if (token !== null) {
      return {} as T;
    }
    if (options === null) {
      return {} as T;
    }
  }
  async verifyAsync<T extends object = any>(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<T> {
    if (token !== null) {
      return {} as T;
    }
    if (options === null) {
      return {} as T;
    }
  }
}
