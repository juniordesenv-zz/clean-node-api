import { SurveyAnswerModel, SurveyModel } from '../models';


export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswerModel[];
  createdAt: Date;
}

export interface AddSurvey {
  add (survey: AddSurveyModel): Promise<SurveyModel>
}
