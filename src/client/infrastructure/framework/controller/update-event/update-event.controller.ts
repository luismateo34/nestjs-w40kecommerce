import {
  Controller,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpadateEventService } from 'src/client/infrastructure/framework/service/upadate-event/upadate-event.service';
import { UpdateClientDto } from './dto/dto';

@Controller('update-event')
export class UpdateEventController {
  constructor(private readonly updateClientService: UpadateEventService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  @OnEvent('purchase_update', { async: true })
  async updateclientPurchase(updateclientdto: UpdateClientDto) {
    try {
      const { purchaseId, payload } = updateclientdto;
      this.updateClientService.Update_order_by_Client(payload, [purchaseId]);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
