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
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/administrator/infrastructure/admin.entity';
import { AdminDatabase } from 'src/administrator/infrastructure/admin.database';
import {
  AdminByEmail,
  AdminByName,
  AllAdmin,
  Authorized,
  Delete,
  Login,
  Register,
  UpadateEmail,
  UpadatePassword,
  UpadatePermissions,
  UpadatePhone,
} from 'src/administrator/application/usecase';
import {
  CreateAdministrator,
  DrivenCreate,
  DrivenfindPermision,
} from 'src/administrator/domain/adapter/driver';
import { FindController } from 'src/administrator/infrastructure/framework/controller/find/find.controller';

@Module({
  controllers: [
    AuthController,
    DeleteController,
    CreateController,
    UpdateController,
    FindController,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([AdminEntity]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtMethod,
    JwtStrategy,
    {
      provide: 'adminOrm',
      useClass: AdminDatabase,
    },
    {
      provide: 'adminByName',
      useFactory: (repository: AdminDatabase) => new AdminByName(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'adminByEmail',
      useFactory: (repository: AdminDatabase) => new AdminByEmail(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'Authorized',
      useFactory: (repository: AdminDatabase) => new Authorized(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'AllAdmin',
      useFactory: (repository: AdminDatabase) => new AllAdmin(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'Delete',
      useFactory: (repository: AdminDatabase) => new Delete(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'Login',
      useFactory: (repository: AdminDatabase) => new Login(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'Register',
      useFactory: (repository: AdminDatabase) =>
        new Register(
          repository,
          new CreateAdministrator(
            new DrivenCreate(repository),
            new DrivenfindPermision(repository),
          ),
        ),
      inject: ['adminOrm'],
    },
    {
      provide: 'UpadatePhone',
      useFactory: (repository: AdminDatabase) => new UpadatePhone(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'UpadateEmail',
      useFactory: (repository: AdminDatabase) => new UpadateEmail(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'UpadatePermissions',
      useFactory: (repository: AdminDatabase) =>
        new UpadatePermissions(repository),
      inject: ['adminOrm'],
    },
    {
      provide: 'UpadatePassword',
      useFactory: (repository: AdminDatabase) =>
        new UpadatePassword(repository),
      inject: ['adminOrm'],
    },
  ],
  exports: [JwtAuthGuard, AdminDatabase],
})
export class AuthModule {}
