import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//-------------modules------------------------------------------------------------------
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
import { ClientModule } from 'src/client/infrastructure/framework/client.module';
import { SetConfigModule } from 'src/config/config.module';
import { ProductModule } from 'src/product/infrastructure/framework/product.module';
//------------------controllers----------------------------------------------------------
import { CreateController } from './controller/create/create.controller';
import { DeleteController } from './controller/delete/delete.controller';
import { FindController } from './controller/find/find.controller';
import { UpdateController } from './controller/update/update.controller';
//---------------------------------------------------------------------------------------
import { MethodModule } from 'src/administrator/infrastructure/framework/method/method.module';
import { PurchasefactoryModule } from './purchasefactory/purchasefactory.module';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@Module({
  imports: [
    AdminModule,
    ClientModule,
    SetConfigModule,
    MethodModule,
    PurchasefactoryModule,
    ProductModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    CreateController,
    DeleteController,
    FindController,
    UpdateController,
  ],
})
export class PurchaseModule {}
