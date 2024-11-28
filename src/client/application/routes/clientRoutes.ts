export enum clientRoute {
  client = 'client',
}
/*----*/
export enum subroutes {
  auth = 'auth',
  find = 'find',
  delete = 'delete',
  create = 'create',
  update = 'update',
}
/*----*/
export enum authroutes {
  login = 'login',
  logout = 'logout',
  refresh = 'refresh',
}
/*---*/
export enum findroutes {
  orderPurchase = 'orderPurchase',
  clientAllData = 'clientAllData',
  productPurchase = 'productPurchase',
  id = 'id',
}
/*---*/
export enum updateroutes {
  email = 'email',
  password = 'password',
  name = 'name',
}
