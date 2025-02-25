import { Module } from '@nestjs/common';
//---module import
import { FactoryAdminModule } from 'src/administrator/infrastructure/framework/factory-admin/factory-admin.module';
//---method
import { PassMethod } from 'src/administrator/infrastructure/framework/controller/update/method/PasswordMethod';
import { PermissonMethod } from 'src/administrator/infrastructure/framework/controller/update/method/permissionMethod';
import { PhoneMethod } from 'src/administrator/infrastructure/framework/controller/update/method/PhoneMethod';
import { EmailMethodUpdate } from 'src/administrator/infrastructure/framework/controller/update/method/emailMethod';
//---
import { Emailmethod } from 'src/administrator/infrastructure/framework/controller/find/method/EmailMethod';
import { Allmethod } from 'src/administrator/infrastructure/framework/controller/find/method/allMethod';
import { lastname } from 'src/administrator/infrastructure/framework/controller/find/method/lastnameMethod';
//---service
import { AuthService } from 'src/administrator/infrastructure/framework/service/local/local.service';
import { LocalStrategy } from 'src/administrator/infrastructure/framework/strategies/local/local.strategy';
import { JwtMethod } from 'src/administrator/infrastructure/framework/service/jwt/jwt.service';
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { RefreshMethod } from 'src/administrator/infrastructure/framework/service/refresh/refresh.service';
import { refreshStrategy } from 'src/administrator/infrastructure/framework/strategies/refresh/refresh.strategy';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { AdminDatabase } from 'src/administrator/infrastructure/framework/admin.database';
import { JwtStrategy } from 'src/administrator/infrastructure/framework/strategies/jwt/jwt.strategy';
import { SetConfigModule } from 'src/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SetConfigModule,
    FactoryAdminModule,
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtMethod,
    Allmethod,
    lastname,
    EmailMethodUpdate,
    PassMethod,
    Emailmethod,
    PermissonMethod,
    PhoneMethod,
    AuthService,
    LocalStrategy,
    JwtClientService,
    RefreshMethod,
    refreshStrategy,
    JwtAuthGuard,
    AdminDatabase,
    JwtStrategy,
  ],
  exports: [
    JwtMethod,
    Allmethod,
    lastname,
    EmailMethodUpdate,
    PassMethod,
    Emailmethod,
    PermissonMethod,
    PhoneMethod,
    AuthService,
    LocalStrategy,
    JwtClientService,
    RefreshMethod,
    refreshStrategy,
    JwtAuthGuard,
    AdminDatabase,
    JwtStrategy,
  ],
})
export class MethodModule {}
