/*--import driven--*/
import {
  createCash as create,
  FindCashmethod,
  updateCashmethod,
} from '@/cashflow/domain/adapter/driven';
//
/*-- driver import---*/
import { CreateCash } from './create';
import { Find } from './find';
import { Update } from './update';
/*--exports--*/
//
export const CreateMethod = new CreateCash(create);
export const FindMethod = new Find(FindCashmethod);
export const UpdateMethod = new Update(updateCashmethod);
