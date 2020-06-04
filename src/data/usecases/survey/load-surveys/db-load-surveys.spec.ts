import MockDate from 'mockdate';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository';
import { DbLoadSurveys } from '~/data/usecases/survey/load-surveys/db-load-surveys';
import { mockSurveysModel, throwError } from '~/domain/test';
import { mockLoadSurveysRepository } from '~/data/test';


type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveysModel());
  });

  test('Should call LoadSurveysRepository and throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError);
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
