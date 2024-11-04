import { Hono } from 'hono';
import { lineRoute } from './core/line/line.route.ts';
import { categoryRoute } from './core/category/category.route.ts';
import { questionRoute } from './core/question/question.route.ts';
import { logger } from 'hono/logger';
import { clogger } from './lang/logger/logger.ts';
import { cors } from 'hono/cors';
import { pg } from './config/postgres.ts';
import { healthRoute } from './core/health/health.route.ts';
import { interviewRoute } from './core/interview/question.route.ts';

export const boostrap = async (app: Hono) => {
  await pg.connect();

  app.use(logger(clogger));
  app.use('*', cors({origin: '*'}));

  app.route('/health', healthRoute);

  app.route('/line', lineRoute);
  app.route('/category', categoryRoute);
  app.route('/question', questionRoute);
  app.route('/interview', interviewRoute);
};
