/*--driven adapter--*/
import { Create, Delete, Find, Update } from '@/purchase/domain/adapter/driven';
/*--driver adapter--*/
import { CreateOrderImpl } from './create';
import { Find as findDriver } from './find';
import { UpdateOrderImpl } from './update';
import { Delete as DeleteDriver } from './delete';
/*--exports--*/
export const CreateOrder = new CreateOrderImpl(Create);
export const FindOrder = new findDriver(Find);
export const UpdateOrder = new UpdateOrderImpl(Update, Find);
export const DeleteOrder = new DeleteDriver(Find, Delete);
