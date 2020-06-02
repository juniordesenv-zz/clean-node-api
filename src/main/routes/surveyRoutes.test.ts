import request from 'supertest';
import { Collection } from 'mongodb';

import { sign } from 'jsonwebtoken';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongoHelper';
import env from '~/main/config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

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


  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
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
        })
        .expect(403);
    });


    test('Should return 200 on add survey with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Junior Miranda',
        email: 'jr.miranda@outlook.com',
        password: '123',
        role: 'admin',
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

      await request(app)
        .post('/api/surveys')
        .set('Authorization', accessToken)
        .send({
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
        })
        .expect(200);
    });
  });
});
