import { Injectable, Inject } from '@nestjs/common';
import { findMethod } from 'src/product/application/usecase/find';
@Injectable()
export class FindbyIdService {
  constructor(@Inject('findMethod') private findMethod: findMethod) {}
  async findById(id: string) {
    const resp = await this.findMethod.find_Product_All_Id(id);
    if (resp.id === undefined) {
      throw new Error(' no existe el producto ');
    }
    return resp;
  }
}
