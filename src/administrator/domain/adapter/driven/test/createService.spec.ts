import { DrivenCreate } from '../createService';
import { ormMock } from './ormMock';
import { admin, permissions } from '../../../entity/entityAdminInterface';

const ObjAdmin: admin = {
  email: 'gatogordo@gmail.com',
  lastname: 'gordo',
  name: 'gato',
  password: 'gatogordo1234',
  phone: 123 - 345 - 6789,
  permissions: permissions.NOADMIN,
};
describe('drivencreate', () => {
  let Obj: DrivenCreate;
  const orm = new ormMock();
  beforeEach(() => {
    Obj = new DrivenCreate(orm);
  });
  describe('drivencreate', () => {
    it('should create a user', async () => {
      Obj.create_Admin(ObjAdmin);
      expect(orm.AdminObj).not.toBeNull();
    });
  });
});
