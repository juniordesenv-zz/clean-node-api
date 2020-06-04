import MockDate from 'mockdate';
import { ok, serverError } from '~/presentation/helpers/http/http-helper';
import { LoadSurveys } from '~/domain/usecases/survey/load-surveys';
import { LoadSurveysController } from '~/presentation/controllers/survey/load-surveys/load-surveys-controller';
import { mockSurveysModel, throwError } from '~/domain/test';
import { mockLoadSurverys } from '~/presentation/test';


type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurverys();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(mockSurveysModel()));
  });

  test('Should return 500 on throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
