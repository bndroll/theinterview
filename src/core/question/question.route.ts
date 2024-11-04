import { Hono } from 'hono';
import type { HonoContext } from '../../config/hono.ts';
import { HTTPException } from 'hono/http-exception';
import { redis } from '../../config/redis.ts';
import { pg } from '../../config/postgres.ts';
import { findQuestionsByCategoryId } from './repository/question.queries.ts';
import { FindQuestionDto } from './dto/find-question.dto.ts';

class FindQuestionsByCategoryIdCommandRequestDto {
  categoryId: number = -1;
  limit: number = 0;
  offset: number = 50;
}

export const findQuestionsByCategoryIdCommand = async (dto: FindQuestionsByCategoryIdCommandRequestDto) => {
  const cachedQuestions = await redis.get(`questions-${dto.categoryId}-${dto.offset}-${dto.limit}`);
  if (cachedQuestions) {
    return JSON.parse(cachedQuestions);
  }

  const questions = await findQuestionsByCategoryId.run({
    categoryId: dto.categoryId,
    limit: dto.limit,
    offset: dto.offset,
  }, pg).then(r => r.map(item => new FindQuestionDto(item)));
  await redis.set(`questions-${dto.categoryId}-${dto.offset}-${dto.limit}`, JSON.stringify(questions), 'EX', 60 * 60);

  return questions;
};


export const questionRoute = new Hono()
  .get('/:categoryId', async (c: HonoContext) => {
    const categoryId = c.req.param('categoryId');
    if (!categoryId) {
      throw new HTTPException(404, {message: 'Category id not provided'});
    }

    const size = parseInt(c.req.query('size') ?? '50');
    const page = parseInt(c.req.query('page') ?? '0');

    const questions = await findQuestionsByCategoryIdCommand({
      categoryId: Number(categoryId),
      limit: size,
      offset: page > 0 ? (page - 1) * size : 0,
    });
    return c.json(questions);
  });
