import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*usecase*/
import { CreateMethod } from 'src/client/application/usecase/create';
import { FindMethod } from 'src/client/application/usecase/find';
import { deleteMethod } from 'src/client/application/usecase/delete';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { Login } from 'src/administrator/application/usecase';
//------
import { ClientEntity } from 'src/client/infrastructure/framework/Client.entity';
import { AdminEntity } from 'src/administrator/infrastructure/framework/admin.entity';
//---
import { Client } from 'src/client/infrastructure/framework/database.client';
import { AdminDatabase } from 'src/administrator/infrastructure/framework/admin.database';
import { SetConfigModule } from 'src/config/config.module';
//-----
export const CreateMethodFactory = {
  provide: 'CreateMethod',
  useFactory: (repository: Client) => new CreateMethod(repository),
  inject: [Client],
};
export const FindMethodFactory = {
  provide: 'FindMethod',
  useFactory: (repository: Client) => new FindMethod(repository),
  inject: [Client],
};

export const DeleteMethodFactory = {
  provide: 'deleteMethod',
  useFactory: (repository: Client) => new deleteMethod(repository),
  inject: [Client],
};
export const UpdateMethodFactory = {
  provide: 'UpdateMethod',
  useFactory: (repository: Client) => new UpdateMethod(repository),
  inject: [Client],
};
export const LoginFactory = {
  provide: 'LOGIN_CLIENT',
  useFactory: (repository: AdminDatabase) => new Login(repository),
  inject: [AdminDatabase],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, AdminEntity]),
    SetConfigModule,
  ],
  providers: [
    CreateMethodFactory,
    FindMethodFactory,
    DeleteMethodFactory,
    UpdateMethodFactory,
    LoginFactory,
    Client,
    AdminDatabase,
  ],
  exports: [
    CreateMethodFactory,
    FindMethodFactory,
    DeleteMethodFactory,
    UpdateMethodFactory,
    LoginFactory,
  ],
})
export class FactoryclientModule {}
