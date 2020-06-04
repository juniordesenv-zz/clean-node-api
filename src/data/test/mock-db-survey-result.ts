// eslint-disable-next-line max-classes-per-file
import { SaveSurveyResultRepository } from '~/data/protocols/db/survey-result/save-survey-result-repository';
import { SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '~/domain/models/survey-result';
import { mockSurveyResultModel } from '~/domain/test';
import { LoadSurveyResultRepository } from '~/data/protocols/db/survey-result/load-survey-result-repository';

export const mockSaveSurveyResultRepository = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};


export const mockLoadSurveyResultRepository = () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
