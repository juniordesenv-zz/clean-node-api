import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongoHelper';
import { SurveyMongoRepository } from './surveyMongoRepository';

let surveyCollection: Collection;
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository();

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut();
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        createdAt: new Date(),
      });

      const survey = await surveyCollection.findOne({ question: 'any_question' });
      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const sut = makeSut();
      await surveyCollection
        .insertMany([
          {
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
            question: 'other_question',
            answers: [
              {
                image: 'other_image',
                answer: 'other_answer',
              },
            ],
            createdAt: new Date(),
          },
        ]);
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(2);
      expect(surveys[0].question).toEqual('any_question');
      expect(surveys[1].question).toEqual('other_question');
    });


    test('Should load empty list', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(0);
    });
  });
});
