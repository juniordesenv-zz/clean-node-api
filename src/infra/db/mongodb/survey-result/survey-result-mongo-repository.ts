import { SurveyResultModel } from '~/domain/models/survey-result';
import { SaveSurveyResultRepository } from '~/data/protocols/db/surveyResult/save-survey-result-repository';
import { SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result';
import { MongoHelper } from '~/infra/db/mongodb/helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId,
    }, {
      $set: {
        answer: data.answer,
        createdAt: data.createdAt,
      },
    }, {
      upsert: true,
      returnOriginal: false,
    });
    return res.value && MongoHelper.map(res.value);
  }
}
