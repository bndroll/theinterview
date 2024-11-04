/** Types generated for queries found in "src/core/category/repository/category.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindCategoriesByLineId' parameters type */
export interface IFindCategoriesByLineIdParams {
  lineId?: number | null | void;
}

/** 'FindCategoriesByLineId' return type */
export interface IFindCategoriesByLineIdResult {
  id: number;
  line_id: number;
  questions_count: string | null;
  title: string;
}

/** 'FindCategoriesByLineId' query type */
export interface IFindCategoriesByLineIdQuery {
  params: IFindCategoriesByLineIdParams;
  result: IFindCategoriesByLineIdResult;
}

const findCategoriesByLineIdIR: any = {"usedParamSet":{"lineId":true},"params":[{"name":"lineId","required":false,"transform":{"type":"scalar"},"locs":[{"a":145,"b":151}]}],"statement":"select c.id, c.line_id, c.title, count(q.*) as questions_count from categories c\nleft join questions q on q.category_id = c.id\nwhere c.line_id = :lineId\ngroup by c.id, c.line_id, c.title"};

/**
 * Query generated from SQL:
 * ```
 * select c.id, c.line_id, c.title, count(q.*) as questions_count from categories c
 * left join questions q on q.category_id = c.id
 * where c.line_id = :lineId
 * group by c.id, c.line_id, c.title
 * ```
 */
export const findCategoriesByLineId = new PreparedQuery<IFindCategoriesByLineIdParams,IFindCategoriesByLineIdResult>(findCategoriesByLineIdIR);


