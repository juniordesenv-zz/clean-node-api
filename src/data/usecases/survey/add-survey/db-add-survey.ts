import { SurveyModel } from '~/domain/models';
import { AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository';
import { AddSurvey, AddSurveyParams } from '~/domain/usecases/survey/add-survey';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add(surveyData: AddSurveyParams): Promise<SurveyModel> {
    return this.addSurveyRepository.add(surveyData);
  }
}
