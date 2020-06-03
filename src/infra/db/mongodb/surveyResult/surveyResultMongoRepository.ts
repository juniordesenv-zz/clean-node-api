import { SaveSurveyResultRepository } from '~/data/protocols/db/survey/saveSurveyResultRepository';
import { SaveSurveyResultModel } from '~/domain/usecases';
import { SurveyResultModel } from '~/domain/models/survey-result';
import { MongoHelper } from '~/infra/db/mongodb/helpers/mongoHelper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
