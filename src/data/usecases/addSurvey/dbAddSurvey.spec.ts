import { DbAddSurvey } from './dbAddSurvey';
import { AddSurveyModel, AddSurveyRepository, SurveyModel } from './dbAddSurveyProtocols';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer ',
    },
  ],
});


const makeFakeSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer ',
    },
  ],
});

const makeAddSurveyRepository = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyModel()));
    }
  }
  return new AddSurveyRepositoryStub();
};

interface SutTypes {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeSut = () => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
