import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/infrastructure/framework/Product.entity';
import { CreateMethod } from 'src/product/application/usecase/create';
import { SettingMethod } from 'src/product/application/usecase/setting';
import { findMethod } from 'src/product/application/usecase/find';
import { updateMethod } from 'src/product/application/usecase/update';
import { deleteMethod } from 'src/product/application/usecase/delete';
/*database*/
import { Product } from 'src/product/infrastructure/framework/database.product';
//----
const CreateMethodFactory = {
  provide: 'CreateMethod',
  useFactory: (repository: Product) => new CreateMethod(repository),
  inject: [Product],
};
const SettingMethodFactory = {
  provide: 'SettingMethod',
  useFactory: (repository: Product) => new SettingMethod(repository),
  inject: [Product],
};
const UpdateMethodFactory = {
  provide: 'updateMethod',
  useFactory: (repository: Product) => new updateMethod(repository),
  inject: [Product],
};

const DeleteMethodFactory = {
  provide: 'deleteMethod',
  useFactory: (repository: Product) => new deleteMethod(repository),
  inject: [Product],
};

const FindMethodFactory = {
  provide: 'findMethod',
  useFactory: (repository: Product) => new findMethod(repository),
  inject: [Product],
};

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    CreateMethodFactory,
    SettingMethodFactory,
    UpdateMethodFactory,
    DeleteMethodFactory,
    FindMethodFactory,
    Product,
  ],
  exports: [
    CreateMethodFactory,
    SettingMethodFactory,
    UpdateMethodFactory,
    DeleteMethodFactory,
    FindMethodFactory,
  ],
})
export class ProductfactoryModule {}
