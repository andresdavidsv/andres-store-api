import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from '../config';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD_123456789';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { dbName, dbUser, dbPassword, dbPort, dbHost } =
        //   configService.postgresql;
        return {
          type: 'postgres',
          url: configService.postgresqlUrl,
          // host: dbHost,
          // port: dbPort,
          // username: dbUser,
          // password: dbPassword,
          // database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { dbName, dbUser, dbPassword, dbPort, dbHost } =
        //   configService.postgresql;
        const client = new Client({
          connectionString: configService.postgresqlUrl,
          ssl: {
            rejectUnauthorized: false,
          },
          // user: dbUser,
          // host: dbHost,
          // database: dbName,
          // password: dbPassword,
          // port: dbPort,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
