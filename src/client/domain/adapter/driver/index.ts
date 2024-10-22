/*--driven adapter--*/
import { Create, Delete, Find, Update } from '@/client/domain/adapter/driven';
/*--driver adapter--*/
import { CreateClientDriver } from './create';
import { Find as findDriver } from './find';
import { Update as updateDriver } from './update';
import { Delete as deleteDriver } from './delete';
/*-- exports--*/
export const createMethod = new CreateClientDriver(Create);
export const findMethod = new findDriver(Find);
export const updateMethod = new updateDriver(Update, Find);
export const deleteMethod = new deleteDriver(Find, Delete);
