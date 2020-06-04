import { SurveyModel } from '~/domain/models';
import { AddSurveyParams } from '~/domain/usecases/survey/add-survey';

export interface AddSurveyRepository {
  add (surveyData: AddSurveyParams): Promise<SurveyModel>
}
