import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgresql: {
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPassword: process.env.POSTGRES_PASSWORD,
      dbPort: parseInt(process.env.POSTGRES_PORT, 10),
      dbHost: process.env.POSTGRES_HOST,
    },
    mysql: {
      dbName: process.env.MYSQL_DB,
      dbUser: process.env.MYSQL_USER,
      dbPassword: process.env.MYSQL_ROOT_PASSWORD,
      dbPort: parseInt(process.env.MYSQL_PORT, 10),
      dbHost: process.env.MYSQL_HOST,
    },
    apiKey: process.env.API_KEY,
  };
});
