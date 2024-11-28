import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalClientService } from 'src/client/infrastructure/framework/service/local-client/local-client.service';
import { clientJwt } from 'src/client/application/type/clientJtw';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private localservice: LocalClientService) {
    super();
  }

  async validate(
    name: string,
    lastname: string,
    password: string,
  ): Promise<clientJwt> {
    try {
      const user = await this.localservice.validateUser(
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
