import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SetConfigModule } from 'src/config/config.module';
import { JwtService } from '@nestjs/jwt';
/*strategies*/
import { LocalStrategy } from 'src/client/infrastructure/framework/strategies/localStrategies';
import { JwtStrategy } from 'src/client/infrastructure/framework/strategies/JwtStrategies.client';
//------service-------------------------------------------------------------------------------------
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { LocalClientService } from 'src/client/infrastructure/framework/service/local-client/local-client.service';
import { RefreshClientService } from 'src/client/infrastructure/framework/service/refresh-client/refresh-client.service';
import { FindClientIdService } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';
import { UpdateEventService } from 'src/client/infrastructure/framework/service/upadate-event/update-event.service';
import { UpdateClientService } from 'src/client/infrastructure/framework/service/update-client/update-client.service';
//-----------------method------------------------------------------------------------------------------------------------
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { OrderpurchaseMethod } from 'src/client/infrastructure/framework/controller/find/method/orderPurchaseMethod';
import { ClientAllDataMehtod } from 'src/client/infrastructure/framework/controller/find/method/clientAllDataMethod';
import { Admincheq } from 'src/client/infrastructure/framework/controller/find/method/aux/admincheq';
import { OrderAux } from 'src/client/infrastructure/framework/controller/find/method/aux/orderAux';
import { admincheck } from 'src/client/infrastructure/framework/controller/update/aux/admincheck';
//--------------------------modules---------------------------------------------------------------------------------------
import { FactoryclientModule } from './factoryclient/factoryclient.module';
import { FactoryAdminModule } from 'src/administrator/infrastructure/framework/factory-admin/factory-admin.module';
//---------------------controller--------------------------------------------------------------------------------------------
import { CreateController } from 'src/client/infrastructure/framework/controller/create/create.controller';
import { LoginController } from 'src/client/infrastructure/framework/controller/login/login.controller';
import { UpdateController } from 'src/client/infrastructure/framework/controller/update/update.controller';
import { UpdateEventController } from 'src/client/infrastructure/framework/controller/update-event/update-event.controller';
import { DeleteController } from 'src/client/infrastructure/framework/controller/delete/delete.controller';
import { FindController } from 'src/client/infrastructure/framework/controller/find/find.controller';
//-----------------------------------------------------------------------------------------------------------------

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
  controllers: [
    CreateController,
    LoginController,
    UpdateController,
    UpdateEventController,
    DeleteController,
    FindController,
  ],
  providers: [
    UpdateEventService,
    admincheck,
    OrderpurchaseMethod,
    ClientAllDataMehtod,
    Admincheq,
    OrderAux,
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
  exports: [FindClientIdService],
})
export class ClientModule {}
