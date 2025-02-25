import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SetConfigModule } from 'src/config/config.module';
/*strategies*/
import { LocalStrategy } from 'src/client/infrastructure/framework/strategies/localStrategies';
import { JwtStrategy } from 'src/client/infrastructure/framework/strategies/JwtStrategies.client';
/*service*/
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { LocalClientService } from 'src/client/infrastructure/framework/service/local-client/local-client.service';
import { RefreshClientService } from 'src/client/infrastructure/framework/service/refresh-client/refresh-client.service';
import { FindClientIdService } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';
import { UpdateClientService } from 'src/client/infrastructure/framework/service/update-client/update-client.service';
/*--------*/
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { JwtService } from '@nestjs/jwt';
import { FactoryclientModule } from './factoryclient/factoryclient.module';
import {FactoryAdminModule } from 'src/administrator/infrastructure/framework/factory-admin/factory-admin.module';
/*---*/

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SetConfigModule,
    FactoryclientModule,
    FactoryAdminModule,
  ],
  exports: [FindClientIdService],
  providers: [
    permissions,
    FindClientIdService,
    UpdateClientService,
    LocalStrategy,
    JwtStrategy,
    JwtClientService,
    LocalClientService,
    JwtService,
    RefreshClientService,
  ],
})
export class ClientModule {}
