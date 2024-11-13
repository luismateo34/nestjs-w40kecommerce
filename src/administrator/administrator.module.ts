import { Module } from '@nestjs/common';
import {
  Admin,
  AdminEntity,
} from 'src/administrator/infrastructure/admin.entity';
import { AuthModule } from 'src/administrator/infrastructure/framework/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [Admin],
  imports: [TypeOrmModule.forFeature([AdminEntity]), AuthModule],
})
export class AdministratorModule {}
