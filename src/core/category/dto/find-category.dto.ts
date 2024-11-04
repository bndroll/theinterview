import type { IFindCategoriesByLineIdResult } from '../repository/category.queries.ts';

export class FindCategoryDto {
  id: number;
  line_id: number;
  title: string;
  questions_count: number;

  constructor(dto: IFindCategoriesByLineIdResult) {
    this.id = dto.id;
    this.line_id = dto.line_id;
    this.title = dto.title;
    this.questions_count = dto.questions_count ? Number(dto.questions_count) : 0;
  }
}
