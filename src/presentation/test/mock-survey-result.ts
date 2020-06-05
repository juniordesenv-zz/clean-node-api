// eslint-disable-next-line max-classes-per-file
import { SaveSurveyResult, SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '~/domain/models';
import { mockSurveyResultModel } from '~/domain/test';
import { LoadSurveyResult } from '~/domain/usecases/survey-result/load-survey-result';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultStub();
};
