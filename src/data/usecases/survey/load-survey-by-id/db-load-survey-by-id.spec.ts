import MockDate from 'mockdate';
import { LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository';
import { DbLoadSurveyById } from '~/data/usecases/survey/load-survey-by-id/db-load-survey-by-id';
import { throwError, mockSurveyModel } from '~/domain/test';
import { mockLoadSurveyByIdRepository } from '~/data/test';


type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById('any_id');
    expect(surveys).toEqual(mockSurveyModel());
  });

  test('Should call LoadSurveysRepository and throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
