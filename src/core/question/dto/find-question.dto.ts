import type { IFindQuestionsByCategoryIdResult } from '../repository/question.queries.ts';

export class FindQuestionDto {
  id: number;
  category_id: number;
  text: string;

  constructor(dto: IFindQuestionsByCategoryIdResult) {
    this.id = dto.id;
    this.category_id = dto.category_id;
    this.text = dto.text;
  }
}
