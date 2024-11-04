import type { IFindLinesResult } from '../repository/line.queries.ts';

export class FindLineDto {
  id: number;
  title: string;
  categories_count: number;
  questions_count: number;

  constructor(dto: IFindLinesResult) {
    this.id = dto.id;
    this.title = dto.title;
    this.categories_count = dto.categories_count ? Number(dto.categories_count) : 0;
    this.questions_count = dto.questions_count ? Number(dto.questions_count) : 0;
  }
}
