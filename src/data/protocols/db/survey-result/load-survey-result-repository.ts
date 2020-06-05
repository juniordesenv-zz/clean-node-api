import { SurveyResultModel } from '~/domain/models';

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string): Promise<SurveyResultModel>
}
