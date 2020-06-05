import { SurveyResultModel } from '~/domain/models';

export type SaveSurveyResultParams = {
  surveyId: string;
  accountId: string;
  answer: string;
  createdAt: Date;
};

export interface SaveSurveyResult {
  save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
