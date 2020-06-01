import { AddSurveyModel } from '../../../../domain/usecases/addSurvey';
import { SurveyModel } from '../../../../domain/models';

export interface AddSurveyRepository {
  add (surveyData: AddSurveyModel): Promise<SurveyModel>
}
