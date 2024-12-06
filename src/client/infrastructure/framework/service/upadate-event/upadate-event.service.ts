import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { UpdateClientService } from 'src/client/infrastructure/framework/service/update-client/update-client.service';
import { FindClientIdService } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';

@Injectable()
export class UpadateEventService {
  constructor(
    private readonly updateClientService: UpdateClientService,
    private readonly findClientIdService: FindClientIdService,
    private readonly permission: permissions,
  ) {}
  private async IsClient(@Req() req: Request) {
    const resp = await this.permission.adminAuth(req);
    let client: clientJwt;
    if (!resp) {
      client = await this.permission.clientPayload(req);
    }
    if (resp) {
      throw new Error('solo un cliente puede hacer esta accion');
    }
    return await this.findClientIdService.check_name_by_id(client.id);
  }
  /*---*/
  async Update_order_by_Client(
    @Req() req: Request,
    order: string[],
  ): Promise<void> {
    const { id } = await this.IsClient(req);
    if (id !== undefined) {
      const orderArr =
        await this.findClientIdService.find_Orderpurchase_by_id(id);
      await this.updateClientService.clientUpdate_Purchase(id, [
        ...orderArr,
        ...order,
      ]);
    }
  }
}
