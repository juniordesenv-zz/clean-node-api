import MockDate from 'mockdate';
import { AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository';
import { DbAddSurvey } from '~/data/usecases/survey/add-survey/db-add-survey';
import { throwError, mockAddSurveyParams, mockSurveyModel } from '~/domain/test';
import { mockAddSurveyRepository } from '~/data/test';


type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call AddSurveyRepository', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = mockAddSurveyParams();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });


  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError);

    const promise = sut.add(mockAddSurveyParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return an survey on success', async () => {
    const { sut } = makeSut();

    const survey = await sut.add(mockAddSurveyParams());
    expect(survey).toEqual(mockSurveyModel());
  });
});
