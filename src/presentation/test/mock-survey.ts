// eslint-disable-next-line max-classes-per-file
import { AddSurvey, AddSurveyParams } from '~/domain/usecases/survey/add-survey';
import { SurveyModel } from '~/domain/models';
import { mockSurveyModel, mockSurveysModel } from '~/domain/test';
import { LoadSurveys } from '~/domain/usecases/survey/load-surveys';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(data: AddSurveyParams): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(mockSurveyModel()));
    }
  }
  return new AddSurveyStub();
};


export const mockLoadSurverys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise((resolve) => resolve(mockSurveysModel()));
    }
  }
  return new LoadSurveysStub();
};


export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdStub();
};
