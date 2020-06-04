import { SurveyResultModel } from '~/domain/models/survey-result';
import { SaveSurveyResultRepository } from '~/data/protocols/db/survey-result/save-survey-result-repository';
import { SaveSurveyResult, SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {
  }

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(data);
  }
}
