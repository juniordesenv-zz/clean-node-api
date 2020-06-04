import { SaveSurveyResult, SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '~/domain/models/survey-result';
import { mockSurveyResultModel } from '~/domain/test';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};
