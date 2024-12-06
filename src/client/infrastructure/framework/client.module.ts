import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
/*database provider*/
import { Client } from 'src/client/infrastructure/database.client';
import { AdminDatabase } from 'src/administrator/infrastructure/admin.database';
/*usecase*/
import { CreateMethod } from 'src/client/application/usecase/create';
import { FindMethod } from 'src/client/application/usecase/find';
import { deleteMethod } from 'src/client/application/usecase/delete';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { Login } from 'src/administrator/application/usecase';
/*strategies*/
import { LocalStrategy } from 'src/client/infrastructure/framework/strategies/localStrategies';
import { JwtStrategy } from 'src/client/infrastructure/framework/strategies/JwtStrategies.client';
/*service*/
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { LocalClientService } from 'src/client/infrastructure/framework/service/local-client/local-client.service';
import { RefreshClientService } from 'src/client/infrastructure/framework/service/refresh-client/refresh-client.service';
import { FindClientIdService } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';
import { UpdateClientService } from 'src/client/infrastructure/framework/service/update-client/update-client.service';
/*Entity*/
import { ClientEntity } from 'src/client/infrastructure/Client.entity';
import { AdminEntity } from 'src/administrator/infrastructure/admin.entity';
/*--------*/
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
/*---*/

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([ClientEntity, AdminEntity]),
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
    RefreshClientService,
    {
      provide: 'database',
      useClass: Client,
    },
    {
      provide: 'adminOrm',
      useClass: AdminDatabase,
    },
    {
      provide: 'CreateMethod',
      useFactory: (repository: Client) => new CreateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'FindMethod',
      useFactory: (repository: Client) => new FindMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'deleteMethod',
      useFactory: (repository: Client) => new deleteMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'UpdateMethod',
      useFactory: (repository: Client) => new UpdateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'Login',
      useFactory: (repository: AdminDatabase) => new Login(repository),
      inject: ['adminOrm'],
    },
  ],
})
export class ClientModule {}
