import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/administrator/infrastructure/framework/service/local/local.service';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    name: string,
    lastname: string,
    password: string,
  ): Promise<PayloadJwt> {
    try {
      const user = await this.authService.validateUser(
        name,
        lastname,
        password,
      );
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
