import { seeder } from 'nestjs-seeder';
import { AdminSeeder } from './inject/adminSeeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmoptions } from 'src/database/typeorm';
import { Delete } from 'src/administrator/application/usecase/delete';
import { AdminDatabase } from 'src/administrator/infrastructure/admin.database';
/*---*/
seeder({
  imports: [TypeOrmModule.forRoot({ ...TypeOrmoptions })],
  providers: [
    {
      provide: 'adminOrm',
      useClass: AdminDatabase,
    },
    {
      provide: 'Delete',
      useFactory: (repository: AdminDatabase) => new Delete(repository),
      inject: ['adminOrm'],
    },
  ],
}).run([AdminSeeder]);
