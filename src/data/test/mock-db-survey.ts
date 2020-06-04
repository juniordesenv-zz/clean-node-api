// eslint-disable-next-line max-classes-per-file
import { AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository';
import { AddSurveyParams } from '~/domain/usecases/survey/add-survey';
import { SurveyModel } from '~/domain/models';
import { mockSurveyModel, mockSurveysModel } from '~/domain/test';
import { LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository';

export const mockAddSurveyRepository = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(surveyData: AddSurveyParams): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(mockSurveyModel()));
    }
  }
  return new AddSurveyRepositoryStub();
};


export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyByIdRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(mockSurveyModel()));
    }
  }
  return new LoadSurveysRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return new Promise((resolve) => resolve(mockSurveysModel()));
    }
  }
  return new LoadSurveysRepositoryStub();
};
