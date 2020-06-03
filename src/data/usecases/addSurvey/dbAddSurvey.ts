import { AddSurveyRepository } from '~/data/protocols/db/survey/addSurveyRepository';
import { AddSurvey, AddSurveyModel } from '~/domain/usecases';
import { SurveyModel } from '~/domain/models';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
    return this.addSurveyRepository.add(surveyData);
  }
}
