import { resolve } from 'node:path';
import { DataSourceOptions, DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
ConfigModule.forRoot({
  envFilePath: `.env`,
});

const configService = new ConfigService();

export const TypeOrmoptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [resolve(__dirname + '/../**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname + '/../../migrations/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export const Database = new DataSource(TypeOrmoptions);
