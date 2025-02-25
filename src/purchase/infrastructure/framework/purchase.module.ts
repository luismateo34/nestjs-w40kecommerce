import { Module } from '@nestjs/common';
import { SetConfigModule } from 'src/config/config.module';
/*-module-*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
/*----*/
import { ClientModule } from 'src/client/infrastructure/framework/client.module';
import { ProductModule } from 'src/product/infrastructure/framework/product.module';

@Module({
  imports: [AdminModule, ClientModule, ProductModule, SetConfigModule],
})
export class PurchaseModule {}
