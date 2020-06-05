import request from 'supertest';
import { Collection } from 'mongodb';

import { sign } from 'jsonwebtoken';
import app from '~/main/config/app';
import env from '~/main/config/env';
import { MongoHelper } from '~/infra/db/mongodb/helpers/mongo-helper';

let surveyCollection: Collection;
let accountCollection: Collection;

const mockAccessToken = async (role?: string): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Junior Miranda',
    email: 'jr.miranda@outlook.com',
    password: '123',
    role,
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({
    _id: id,
  }, {
    $set: {
      accessToken,
    },
  });
  return accessToken;
};

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });


    test('Should return 200 on add survey with valid token', async () => {
      const accessToken = await mockAccessToken();

      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        createdAt: new Date(),
      });

      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('Authorization', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403);
    });


    test('Should return 200 on load survey with valid token', async () => {
      const accessToken = await mockAccessToken();

      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        createdAt: new Date(),
      });

      await request(app)
        .get(`/api/surveys/${res.ops[0]._id}/results`)
        .set('Authorization', accessToken)
        .expect(200);
    });
  });
});
