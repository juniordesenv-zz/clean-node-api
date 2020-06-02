import { SurveyModel } from '~/domain/models';
import { LoadSurveysController } from '~/presentation/controllers/survey/loadSurveys/loadSurveysController';

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load(): Promise<SurveyModel[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const sut = new LoadSurveysController(loadSurveysStub);
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled;
  });
});
