import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/purchase/infrastructure/framework/database.purchase';
/*usecase*/
import { createMethod } from 'src/purchase/application/usecases/create';
import { FindMethod } from 'src/purchase/application/usecases/find';
import { deleteMethod } from 'src/purchase/application/usecases/delete';
import { updateMethod } from 'src/purchase/application/usecases/update';
import { OrderEntity } from 'src/purchase/infrastructure/framework/PurchaseOrder.entity';
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

const CreateMethodFactory = {
  provide: 'createMethod',
  useFactory: (repository: Order) => new createMethod(repository),
  inject: [Order],
};
const FindMethodFactory = {
  provide: 'FindMethod',
  useFactory: (repository: Order) => new FindMethod(repository),
  inject: [Order],
};
const DeleteMethodFactory = {
  provide: 'deleteMethod',
  useFactory: (repository: Order) => new deleteMethod(repository),
  inject: [Order],
};
const UpdateMethodFactory = {
  provide: 'updateMethod',
  useFactory: (repository: Order) => new updateMethod(repository),
  inject: [Order],
};

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    CreateMethodFactory,
    FindMethodFactory,
    DeleteMethodFactory,
    UpdateMethodFactory,
    Order,
  ],
  exports: [
    CreateMethodFactory,
    FindMethodFactory,
    DeleteMethodFactory,
    UpdateMethodFactory,
  ],
})
export class PurchasefactoryModule {}
