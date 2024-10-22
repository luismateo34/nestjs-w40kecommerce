/*--driven adapter--*/
import {
  Create,
  Delete,
  Find,
  Setter,
  Update,
} from '@/product/domain/adapter/driven';
/*--driver adapter--*/
import { CreateProduct } from './create';
import { SetProduct } from './setter';
import { UpdateProduct } from './update';
import { DeleteProduct } from './delete';
import { FindProduct } from './find';
/*--exports--*/
export const CreateProductMethod = new CreateProduct(Create);
export const SetterMethod = new SetProduct(Setter, Find);
export const updateProductMethod = new UpdateProduct(Update, Find);
export const deleteProductMethod = new DeleteProduct(Delete, Find);
export const FindProductMethod = new FindProduct(Find);
