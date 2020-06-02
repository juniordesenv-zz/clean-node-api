import { AddSurveyRepository } from '../../../../data/protocols/db/survey/addSurveyRepository';
import { SurveyModel } from '../../../../domain/models';
import { MongoHelper } from '../helpers/mongoHelper';
import { AddSurveyModel } from '../../../../domain/usecases/addSurvey';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/loadSurveysRepository';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const result = await surveyCollection.insertOne(surveyData);
    return MongoHelper.map(result.ops[0]);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: SurveyModel[] = await surveyCollection.find().toArray();
    return surveys;
  }
}
