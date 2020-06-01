import {
  AddSurvey, AddSurveyModel, AddSurveyRepository, SurveyModel,
} from './dbAddSurveyProtocols';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
    return this.addSurveyRepository.add(surveyData);
  }
}
