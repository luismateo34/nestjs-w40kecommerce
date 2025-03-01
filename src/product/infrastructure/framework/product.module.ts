import { Module } from '@nestjs/common';
import { SetConfigModule } from 'src/config/config.module';
import { JwtModule } from '@nestjs/jwt';
//-----------------------------------------------------------------------------------
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
//-----service-----------------------------------------------------------------------
import { ProductfactoryModule } from './productfactory/productfactory.module';
//--------------------------------------------------------------------------
import { FindbyIdService } from 'src/product/infrastructure/framework/services/findby-id/findby-id.service';
import { findyIdService } from 'src/product/infrastructure/framework/services/findby-id/findyid';
//------------controllers------------------------------------------------------------
import { CreateController } from './controller/create/create.controller';
import { DeleteController } from './controller/delete/delete.controller';
import { FindController } from './controller/find/find.controller';
import { SettingController } from './controller/setting/setting.controller';
import { UpdateController } from './controller/update/update.controller';
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
@Module({
  imports: [
    AdminModule,
    ProductfactoryModule,
    SetConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    CreateController,
    DeleteController,
    FindController,
    SettingController,
    UpdateController,
  ],
  providers: [FindbyIdService, findyIdService],
  exports:[ findyIdService]
})
export class ProductModule {}
