import { UpdateEmail } from 'src/administrator/application/usecase';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmailDto } from 'src/administrator/application/validation/email';
@Injectable()
export class EmailMethodUpdate {
  constructor(
    @Inject('UpdateEmail') private readonly updateEmail: UpdateEmail,
  ) {}
  async email(emailDto: EmailDto) {
    try {
      const { lastname, name, email } = emailDto;
      await this.updateEmail.EmailUpdate(lastname, name, email);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
}
