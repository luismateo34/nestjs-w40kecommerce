import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetConfigModule } from 'src/config/config.module';
//----------controller-------------------------------------------------------------------
import { AuthController } from './controller/auth/auth.controller';
import { DeleteController } from './controller/delete/delete.controller';
import { CreateController } from './controller/create/create.controller';
import { UpdateController } from './controller/update/update.controller';
import { FindController } from 'src/administrator/infrastructure/framework/controller/find/find.controller';
//---------strategies--------------------------------------------------------------------
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
//---------------guards------------------------------------------------------------------
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { RoleGuard } from 'src/administrator/infrastructure/framework/guard/role/role.guard';
//---------------------databases---and--entities-----------------------------------------
import { AdminDatabase } from 'src/administrator/infrastructure/framework/admin.database';
import { AdminEntity } from 'src/administrator/infrastructure/framework/admin.entity';
//---------------usecases----------------------------------------------------------------
import { FactoryAdminModule } from './factory-admin/factory-admin.module';
//----------method-----------------------------------------------------------------------
import { MethodModule } from './method/method.module';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@Module({
  imports: [
    SetConfigModule,
    FactoryAdminModule,
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MethodModule,
  ],
  controllers: [
    AuthController,
    DeleteController,
    CreateController,
    UpdateController,
    FindController,
  ],
  providers: [JwtAuthGuard, AdminDatabase, JwtStrategy, RoleGuard],
  exports: [JwtAuthGuard, AdminDatabase, JwtStrategy, RoleGuard],
})
export class AdminModule {}
