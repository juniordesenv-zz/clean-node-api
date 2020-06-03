import { SurveyModel } from '~/domain/models';


export type AddSurveyModel = Omit<SurveyModel, 'id'>;

export interface AddSurvey {
  add (survey: AddSurveyModel): Promise<SurveyModel>
}
