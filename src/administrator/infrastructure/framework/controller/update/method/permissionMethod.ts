import { UpadatePermissions } from 'src/administrator/application/usecase';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Permission } from 'src/administrator/application/validation/permission';

@Injectable()
export class PermissonMethod {
  constructor(
    @Inject('UpadatePermissions')
    private readonly updatePermissions: UpadatePermissions,
  ) {}
  async permission(perminssionDto: Permission) {
    try {
      const { lastname, name, permissions } = perminssionDto;
      await this.updatePermissions.update_Permisions(
        permissions,
        lastname,
        name,
      );
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`${e.message}`, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException('error', HttpStatus.ACCEPTED);
    }
  }
}
