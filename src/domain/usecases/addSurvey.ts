import { SurveyAnswerModel, SurveyModel } from '../models';


export type AddSurveyModel = {
  question: string;
  answers: SurveyAnswerModel[];
  createdAt: Date;
};

export interface AddSurvey {
  add (survey: AddSurveyModel): Promise<SurveyModel>
}
