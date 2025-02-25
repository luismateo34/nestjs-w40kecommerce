import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PasswordDto } from 'src/administrator/application/validation/password';
import { UpdatePassword } from 'src/administrator/application/usecase';

@Injectable()
export class PassMethod {
  constructor(
    @Inject('UpdatePassword') private readonly updatePassword: UpdatePassword,
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
