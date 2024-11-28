import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*-usecase-*/
import { CreateMethod } from 'src/product/application/usecase/create';
import { SettingMethod } from 'src/product/application/usecase/setting';
import { findMethod } from 'src/product/application/usecase/find';
import { updateMethod } from 'src/product/application/usecase/update';
import { deleteMethod } from 'src/product/application/usecase/delete';
/*database*/
import { Product } from 'src/product/infrastructure/database.product';
/*entity*/
import { ProductEntity } from 'src/product/infrastructure/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: 'database',
      useClass: Product,
    },
    {
      provide: 'CreateMethod',
      useFactory: (repository: Product) => new CreateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'SettingMethod',
      useFactory: (repository: Product) => new SettingMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'updateMethod',
      useFactory: (repository: Product) => new updateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'deleteMethod',
      useFactory: (repository: Product) => new deleteMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'findMethod',
      useFactory: (repository: Product) => new findMethod(repository),
      inject: ['database'],
    },
  ],
})
export class ProductModule {}
