import { SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '~/domain/models/survey-result';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  createdAt: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  ...mockSaveSurveyResultParams(),
});
