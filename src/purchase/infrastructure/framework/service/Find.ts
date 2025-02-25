import { Injectable } from '@nestjs/common';
import { FindbyIdService } from 'src/product/infrastructure/framework/services/findby-id/findby-id.service';
import { createmethodDto } from 'src/purchase/application/validate/order';

@Injectable()
export class findyIdService {
  constructor(private findById: FindbyIdService) {}
  async arrProductFn(Order: createmethodDto) {
    return await Promise.all(
      Order.productsId.map(async (el) => {
        const fn = async (id: string) => await this.findById.findById(id);
        const resp = await fn(el.id);
        const obj = {
          quantity: el.quantity,
          product: resp,
        };
        return obj;
      }),
    );
  }
}
