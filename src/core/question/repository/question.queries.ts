/** Types generated for queries found in "src/core/question/repository/question.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindQuestionsByCategoryId' parameters type */
export interface IFindQuestionsByCategoryIdParams {
  categoryId?: number | null | void;
  limit?: NumberOrString | null | void;
  offset?: NumberOrString | null | void;
}

/** 'FindQuestionsByCategoryId' return type */
export interface IFindQuestionsByCategoryIdResult {
  category_id: number;
  id: number;
  text: string;
}

/** 'FindQuestionsByCategoryId' query type */
export interface IFindQuestionsByCategoryIdQuery {
  params: IFindQuestionsByCategoryIdParams;
  result: IFindQuestionsByCategoryIdResult;
}

const findQuestionsByCategoryIdIR: any = {"usedParamSet":{"categoryId":true,"limit":true,"offset":true},"params":[{"name":"categoryId","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":84}]},{"name":"limit","required":false,"transform":{"type":"scalar"},"locs":[{"a":92,"b":97}]},{"name":"offset","required":false,"transform":{"type":"scalar"},"locs":[{"a":106,"b":112}]}],"statement":"select q.id, q.category_id, q.text from questions q\nwhere q.category_id = :categoryId\nlimit :limit offset :offset"};

/**
 * Query generated from SQL:
 * ```
 * select q.id, q.category_id, q.text from questions q
 * where q.category_id = :categoryId
 * limit :limit offset :offset
 * ```
 */
export const findQuestionsByCategoryId = new PreparedQuery<IFindQuestionsByCategoryIdParams,IFindQuestionsByCategoryIdResult>(findQuestionsByCategoryIdIR);


/** 'FindRandomQuestionsByCategories' parameters type */
export interface IFindRandomQuestionsByCategoriesParams {
  categoryIds: readonly (number | null | void)[];
  lineId?: number | null | void;
}

/** 'FindRandomQuestionsByCategories' return type */
export interface IFindRandomQuestionsByCategoriesResult {
  category_id: number;
  id: number;
  text: string;
}

/** 'FindRandomQuestionsByCategories' query type */
export interface IFindRandomQuestionsByCategoriesQuery {
  params: IFindRandomQuestionsByCategoriesParams;
  result: IFindRandomQuestionsByCategoriesResult;
}

const findRandomQuestionsByCategoriesIR: any = {"usedParamSet":{"lineId":true,"categoryIds":true},"params":[{"name":"categoryIds","required":false,"transform":{"type":"array_spread"},"locs":[{"a":279,"b":290}]},{"name":"lineId","required":false,"transform":{"type":"scalar"},"locs":[{"a":259,"b":265}]}],"statement":"with random_questions as (\n    select\n        q.id,\n        q.category_id,\n        q.text,\n        row_number() over (partition by q.category_id order by random()) as rn\n    from questions q\n    join categories c on q.category_id = c.id\n    where c.line_id = :lineId and c.id in :categoryIds\n)\nselect\n    rq.id,\n    rq.category_id,\n    rq.text\nfrom random_questions rq\nwhere rq.rn <= 10\norder by rq.category_id, rq.rn"};

/**
 * Query generated from SQL:
 * ```
 * with random_questions as (
 *     select
 *         q.id,
 *         q.category_id,
 *         q.text,
 *         row_number() over (partition by q.category_id order by random()) as rn
 *     from questions q
 *     join categories c on q.category_id = c.id
 *     where c.line_id = :lineId and c.id in :categoryIds
 * )
 * select
 *     rq.id,
 *     rq.category_id,
 *     rq.text
 * from random_questions rq
 * where rq.rn <= 10
 * order by rq.category_id, rq.rn
 * ```
 */
export const findRandomQuestionsByCategories = new PreparedQuery<IFindRandomQuestionsByCategoriesParams,IFindRandomQuestionsByCategoriesResult>(findRandomQuestionsByCategoriesIR);


