/*-- driven adapter--*/
import {
  Create,
  DeleteService,
  Find,
  Update,
  findPermision,
} from 'src/administrator/domain/adapter/driven';
/* -- driver adapter--*/
import { FindAdmin } from 'src/administrator/domain/adapter/driver/FindAdmin';
import { Delete } from 'src/administrator/domain/adapter/driver/deleteAdmin';
import { CreateAdministrator } from 'src/administrator/domain/adapter/driver/createAdmin';
import { Update as Updatedriver } from 'src/administrator/domain/adapter/driver/updateAdmin';
/* ---*/

export const find = new FindAdmin(Find);
export const deleteMethod = new Delete(DeleteService);
export const UpdateMethod = new Updatedriver(Update);
export const CreateMethod = new CreateAdministrator(Create, findPermision);
