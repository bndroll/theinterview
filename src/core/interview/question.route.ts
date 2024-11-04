import { Hono } from 'hono';
import type { HonoContext } from '../../config/hono.ts';
import { pg } from '../../config/postgres.ts';
import { FindQuestionDto } from '../question/dto/find-question.dto.ts';
import { findRandomQuestionsByCategories } from '../question/repository/question.queries.ts';
import { HTTPException } from 'hono/http-exception';

class FindQuestionsByCategoryIdCommandRequestDto {
  lineId: number = -1;
  categoryIds: number[] = [];
}

class GenerateInterviewDto {
  categoryIds: number[] = [];
}

export const generateInterviewCommand = async (dto: FindQuestionsByCategoryIdCommandRequestDto) => {
  return await findRandomQuestionsByCategories.run({
    lineId: dto.lineId,
    categoryIds: dto.categoryIds,
  }, pg).then(r => r.map(item => new FindQuestionDto(item)));
};


export const interviewRoute = new Hono()
  .post('/:lineId', async (c: HonoContext) => {
    const lineId = c.req.param('lineId');
    if (!lineId) {
      throw new HTTPException(404, {message: 'Line id not provided'});
    }

    const body = await c.req.json<GenerateInterviewDto>();

    const questions = await generateInterviewCommand({
      lineId: Number(lineId),
      categoryIds: body.categoryIds,
    });

    c.status(200);

    return c.json(questions);
  });
