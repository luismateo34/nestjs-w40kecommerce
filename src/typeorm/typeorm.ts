import { resolve } from 'node:path';
import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
dotenv.config();

export const TypeOrmoptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [resolve(__dirname + '/../**/*.entity{.ts,.js}')],
  //entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [resolve(__dirname + '/../../migrations/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export const Database = new DataSource(TypeOrmoptions);
