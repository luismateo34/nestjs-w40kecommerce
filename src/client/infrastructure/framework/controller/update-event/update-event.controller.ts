import {
  Controller,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateEventService } from 'src/client/infrastructure/framework/service/upadate-event/update-event.service';
import { UpdateClientDto } from './dto/dto';

@Controller('update-event')
export class UpdateEventController {
  constructor(private readonly updateClientService: UpdateEventService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  @OnEvent('purchase_update', { async: true })
  async updateclientPurchase(updateclientdto: UpdateClientDto) {
    try {
      const { payload, req } = updateclientdto;
      this.updateClientService.Update_order_by_Client(req, payload);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
