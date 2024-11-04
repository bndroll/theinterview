import { Hono } from 'hono';
import { boostrap } from './bootstrap.ts';
import { clogger } from './lang/logger/logger.ts';

const app = new Hono();

boostrap(app).then(() => {
  clogger('Application bootstrap on port:', Bun.env.PORT);
});

export default {
  ...app,
  port: Bun.env.PORT,
};
