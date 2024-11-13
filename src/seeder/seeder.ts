import { seeder } from 'nestjs-seeder';
import { AdminSeeder } from './inject/adminSeeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmoptions } from 'src/database/typeorm';

seeder({
  imports: [TypeOrmModule.forRoot({ ...TypeOrmoptions })],
}).run([AdminSeeder]);
