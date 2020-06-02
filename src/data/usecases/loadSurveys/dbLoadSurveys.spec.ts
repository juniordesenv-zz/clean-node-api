import { LoadSurveysRepository } from '~/data/protocols/db/survey/loadSurveysRepository';
import { SurveyModel } from '~/domain/models';
import { DbLoadSurveys } from '~/data/usecases/loadSurveys/dbLoadSurveys';


const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    createdAt: new Date(),
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    createdAt: new Date(),
  },
];


describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll(): Promise<SurveyModel[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });
});
