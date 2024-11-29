import { UpadatePhone } from 'src/administrator/application/usecase';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Phone } from 'src/administrator/application/validation/phone';

@Injectable()
export class PhoneMethod {
  constructor(
    @Inject('UpadatePhone') private readonly updatePhone: UpadatePhone,
  ) {}
  async phone(phoneDto: Phone) {
    try {
      await this.updatePhone.phone_update(
        phoneDto.lastname,
        phoneDto.name,
        phoneDto.phone,
      );
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
}
