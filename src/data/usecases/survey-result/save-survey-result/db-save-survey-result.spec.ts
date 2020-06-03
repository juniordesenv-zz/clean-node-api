import MockDate from 'mockdate';
import { SurveyResultModel } from '~/domain/models/survey-result';
import { SaveSurveyResultRepository } from '~/data/protocols/db/surveyResult/save-survey-result-repository';
import { DbSaveSurveyResult } from '~/data/usecases/survey-result/save-survey-result/db-save-survey-result';
import { SaveSurveyResultModel } from '~/domain/usecases/survey-result/save-survey-result';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_question',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  createdAt: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  ...makeFakeSurveyResultData(),
});

const makeSaveSurveyResultRepository = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = makeFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(addSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const promise = sut.save(makeFakeSurveyResultData());
    expect(promise).rejects.toThrow();
  });

  test('Should return an survey on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(makeFakeSurveyResultData());
    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });
});
