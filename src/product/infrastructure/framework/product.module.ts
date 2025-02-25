import { Module } from '@nestjs/common';
import { SetConfigModule } from 'src/config/config.module';
/*---*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
/*--service-*/
import { FindbyIdService } from 'src/product/infrastructure/framework/services/findby-id/findby-id.service';
import { ProductfactoryModule } from './productfactory/productfactory.module';
/*----*/

@Module({
  imports: [AdminModule, ProductfactoryModule, SetConfigModule],
  exports: [FindbyIdService],
  providers: [FindbyIdService],
})
export class ProductModule {}
