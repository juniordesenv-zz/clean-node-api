import { SaveSurveyResultRepository } from '~/data/protocols/db/surveyResult/save-survey-result-repository';
import { SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '~/domain/models/survey-result';
import { mockSurveyResultModel } from '~/domain/test';

export const mockSaveSurveyResultRepository = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(mockSurveyResultModel()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
