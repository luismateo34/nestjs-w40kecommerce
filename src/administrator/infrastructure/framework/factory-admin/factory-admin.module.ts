import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/administrator/infrastructure/framework/admin.entity';
import { AdminDatabase } from 'src/administrator/infrastructure/framework/admin.database';
/*usecases*/
import {
  AdminByEmail,
  AdminByName,
  AllAdmin,
  Authorized,
  Delete,
  Login,
  Register,
  UpdateEmail,
  UpdatePassword,
  UpdatePermissions,
  UpdatePhone,
} from 'src/administrator/application/usecase';
import { SetConfigModule } from 'src/config/config.module';

//------
const Loginfactory = {
  provide: 'LOGIN',
  useFactory: (repository: AdminDatabase) => new Login(repository),
  inject: [AdminDatabase],
};
const AdminByNameFactory = {
  provide: 'adminByName',
  useFactory: (repository: AdminDatabase) => new AdminByName(repository),
  inject: [AdminDatabase],
};
const AdminByEmailFactory = {
  provide: 'adminByEmail',
  useFactory: (repository: AdminDatabase) => new AdminByEmail(repository),
  inject: [AdminDatabase],
};

const AuthorizedFactory = {
  provide: 'Authorized',
  useFactory: (repository: AdminDatabase) => new Authorized(repository),
  inject: [AdminDatabase],
};
const AllAdminFactory = {
  provide: 'AllAdmin',
  useFactory: (repository: AdminDatabase) => new AllAdmin(repository),
  inject: [AdminDatabase],
};

const DeleteFactory = {
  provide: 'Delete',
  useFactory: (repository: AdminDatabase) => new Delete(repository),
  inject: [AdminDatabase],
};

const RegisterFactory = {
  provide: 'Register',
  useFactory: (repository: AdminDatabase) => new Register(repository),
  inject: [AdminDatabase],
};

const UpdatePhoneFactory = {
  provide: 'UpdatePhone',
  useFactory: (repository: AdminDatabase) => new UpdatePhone(repository),
  inject: [AdminDatabase],
};
const UpdateEmailFactory = {
  provide: 'UpdateEmail',
  useFactory: (repository: AdminDatabase) => new UpdateEmail(repository),
  inject: [AdminDatabase],
};

const UpdatePermissionsFactory = {
  provide: 'UpdatePermissions',
  useFactory: (repository: AdminDatabase) => new UpdatePermissions(repository),
  inject: [AdminDatabase],
};

const UpdatePasswordFactory = {
  provide: 'UpdatePassword',
  useFactory: (repository: AdminDatabase) => new UpdatePassword(repository),
  inject: [AdminDatabase],
};

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), SetConfigModule],
  providers: [
    AdminDatabase,
    Loginfactory,
    AdminByEmailFactory,
    AdminByNameFactory,
    AuthorizedFactory,
    UpdatePhoneFactory,
    UpdatePermissionsFactory,
    UpdatePasswordFactory,
    UpdateEmailFactory,
    AllAdminFactory,
    DeleteFactory,
    RegisterFactory,
  ],
  exports: [
    Loginfactory,
    AdminByEmailFactory,
    AdminByNameFactory,
    AuthorizedFactory,
    UpdatePhoneFactory,
    UpdatePermissionsFactory,
    UpdatePasswordFactory,
    UpdateEmailFactory,
    AllAdminFactory,
    DeleteFactory,
    RegisterFactory,
  ],
})
export class FactoryAdminModule {}
