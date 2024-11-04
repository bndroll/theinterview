import { Hono } from 'hono';
import { findLines } from './repository/line.queries.ts';
import { pg } from '../../config/postgres.ts';
import type { HonoContext } from '../../config/hono.ts';
import { redis } from '../../config/redis.ts';
import { FindLineDto } from './dto/find-line.dto.ts';

export const findLinesCommand = async (): Promise<FindLineDto[]> => {
  const cachedLines = await redis.get('lines');
  if (cachedLines) {
    return JSON.parse(cachedLines);
  }

  const lines = await findLines.run(undefined, pg).then(r => r.map(item => new FindLineDto(item)));
  await redis.set('lines', JSON.stringify(lines), 'EX', 60 * 60);

  return lines;
};

export const lineRoute = new Hono()
  .get('/', async (c: HonoContext) => {
    const lines = await findLinesCommand();
    return c.json(lines);
  });
