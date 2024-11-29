import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PasswordDto } from 'src/administrator/application/validation/password';
import { UpadatePassword } from 'src/administrator/application/usecase';

@Injectable()
export class PassMethod {
  constructor(
    @Inject('UpadatePassword') private readonly updatePassword: UpadatePassword,
  ) {}
  async password(passwordDto: PasswordDto) {
    try {
      const { lastname, name, password } = passwordDto;
      await this.updatePassword.update_Pass(lastname, name, password);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(`error`, HttpStatus.ACCEPTED);
    }
  }
}
