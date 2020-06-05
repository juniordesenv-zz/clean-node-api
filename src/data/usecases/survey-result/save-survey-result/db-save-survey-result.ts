import { SurveyResultModel } from '~/domain/models';
import { SaveSurveyResultRepository } from '~/data/protocols/db/survey-result/save-survey-result-repository';
import { SaveSurveyResult, SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { LoadSurveyResultRepository } from '~/data/protocols/db/survey-result/load-survey-result-repository';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepositoryStub: LoadSurveyResultRepository,
  ) {
  }

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    return this.loadSurveyResultRepositoryStub.loadBySurveyId(data.surveyId);
  }
}
