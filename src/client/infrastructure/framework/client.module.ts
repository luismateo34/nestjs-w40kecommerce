import { Module } from '@nestjs/common';
import { Client } from 'src/client/infrastructure/database.client';
import { CreateMethod } from 'src/client/application/usecase/create';
import { FindMethod } from 'src/client/application/usecase/find';
import { deleteMethod } from 'src/client/application/usecase/delete';
import { UpdateMethod } from 'src/client/application/usecase/update';

@Module({
  providers: [
    {
      provide: 'database',
      useClass: Client,
    },
    {
      provide: 'CreateMethod',
      useFactory: (repository: Client) => new CreateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'FindMethod',
      useFactory: (repository: Client) => new FindMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'deleteMethod',
      useFactory: (repository: Client) => new deleteMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'UpdateMethod',
      useFactory: (repository: Client) => new UpdateMethod(repository),
      inject: ['database'],
    },
  ],
})
export class ClientModule {}
