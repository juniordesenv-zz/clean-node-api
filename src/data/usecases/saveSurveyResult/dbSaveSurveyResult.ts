import { SaveSurveyResultRepository } from '~/data/protocols/db/survey/saveSurveyResultRepository';
import { SaveSurveyResult, SaveSurveyResultModel } from '~/domain/usecases';
import { SurveyResultModel } from '~/domain/models/survey-result';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {
  }

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(data);
  }
}
