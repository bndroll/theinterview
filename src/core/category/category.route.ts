import { Hono } from 'hono';
import type { HonoContext } from '../../config/hono.ts';
import { redis } from '../../config/redis.ts';
import { findCategoriesByLineId } from './repository/category.queries.ts';
import { pg } from '../../config/postgres.ts';
import { HTTPException } from 'hono/http-exception';
import { FindCategoryDto } from './dto/find-category.dto.ts';

export const findCategoriesByLineIdCommand = async (lineId: number) => {
  const cachedCategories = await redis.get(`categories-${lineId}`);
  if (cachedCategories) {
    return JSON.parse(cachedCategories);
  }

  const categories = await findCategoriesByLineId.run({lineId: lineId}, pg).then(r => r.map(item => new FindCategoryDto(item)));
  if (categories.length === 0) {
    throw new HTTPException(404, {message: 'Categories not found'});
  }

  await redis.set(`categories-${lineId}`, JSON.stringify(categories), 'EX', 60 * 60);

  return categories;
};

export const categoryRoute = new Hono()
  .get('/:lineId', async (c: HonoContext) => {
    const lineId = c.req.param('lineId');
    if (!lineId) {
      throw new HTTPException(404, {message: 'Line id not provided'});
    }

    const categories = await findCategoriesByLineIdCommand(Number(lineId));
    return c.json(categories);
  });
