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

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
        return new Promise((resolve) => resolve(makeFakeSurveyModel()));
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
