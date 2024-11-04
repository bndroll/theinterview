import { Client } from 'pg';

export const pg = new Client({
  host: Bun.env.POSTGRES_HOST,
  port: Bun.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});
