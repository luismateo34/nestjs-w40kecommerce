import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { UpdateClientService } from 'src/client/infrastructure/framework/service/update-client/update-client.service';
import { FindClientIdService } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { purchase } from 'src/client/domain/type/purchase';
import { check } from 'src/client/infrastructure/framework/service/find-client-id/find-client-id.service';

@Injectable()
export class UpdateEventService {
  constructor(
    private readonly updateClientService: UpdateClientService,
    private readonly findClientIdService: FindClientIdService,
    private readonly permission: permissions,
  ) {}
  private async IsClient(@Req() req: Request): Promise<check> {
    const resp = await this.permission.adminAuth(req);
    if (resp) {
      throw new Error('solo un cliente puede hacer esta accion');
    }
    const client = await this.permission.clientPayload(req);
    return await this.findClientIdService.check_name_by_id(client.id);
  }
  /*---*/
  async Update_order_by_Client(
    @Req() req: Request,
    order: purchase,
  ): Promise<void> {
    try {
      const { id } = await this.IsClient(req);
      if (id !== undefined) {
        await this.updateClientService.clientUpdate_Purchase(id, order);
      }
    } catch (err) {
      if (err instanceof Error && err.message.length !== 0) {
        throw new HttpException(`${err.message}`, HttpStatus.FORBIDDEN);
      }
      throw new HttpException('erro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
