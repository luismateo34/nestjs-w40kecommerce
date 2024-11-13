import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth/auth.controller';
import { DeleteController } from './controller/delete/delete.controller';
import { CreateController } from './controller/create/create.controller';
import { UpdateController } from './controller/update/update.controller';
import { AuthService } from './service/local/local.service';
import { JwtMethod } from './service/jwt/jwt.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';

@Module({
  controllers: [
    AuthController,
    DeleteController,
    CreateController,
    UpdateController,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtMethod, JwtStrategy],
  exports: [AuthService, JwtMethod],
})
export class AuthModule {}
