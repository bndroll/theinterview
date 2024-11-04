/** Types generated for queries found in "src/core/line/repository/line.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindLines' parameters type */
export type IFindLinesParams = void;

/** 'FindLines' return type */
export interface IFindLinesResult {
  categories_count: string | null;
  id: number;
  questions_count: string | null;
  title: string;
}

/** 'FindLines' query type */
export interface IFindLinesQuery {
  params: IFindLinesParams;
  result: IFindLinesResult;
}

const findLinesIR: any = {"usedParamSet":{},"params":[],"statement":"select l.id, l.title, count(c.*) as categories_count, count(q.*) as questions_count from lines l\nleft join categories c on c.line_id = l.id\nleft join questions q on q.category_id = c.id\ngroup by l.id, l.title"};

/**
 * Query generated from SQL:
 * ```
 * select l.id, l.title, count(c.*) as categories_count, count(q.*) as questions_count from lines l
 * left join categories c on c.line_id = l.id
 * left join questions q on q.category_id = c.id
 * group by l.id, l.title
 * ```
 */
export const findLines = new PreparedQuery<IFindLinesParams,IFindLinesResult>(findLinesIR);


