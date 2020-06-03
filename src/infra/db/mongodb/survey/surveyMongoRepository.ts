import { AddSurveyRepository } from '~/data/protocols/db/survey/addSurveyRepository';
import { SurveyModel } from '~/domain/models';
import { MongoHelper } from '~/infra/db/mongodb/helpers/mongoHelper';
import { AddSurveyModel } from '~/domain/usecases/addSurvey';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/loadSurveysRepository';
import { LoadSurveyById } from '~/domain/usecases';

export class SurveyMongoRepository implements
  AddSurveyRepository,
  LoadSurveysRepository,
  LoadSurveyById {
  async add(surveyData: AddSurveyModel): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const result = await surveyCollection.insertOne(surveyData);
    return MongoHelper.map(result.ops[0]);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    return MongoHelper.mapList(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: id });
    return survey && MongoHelper.map(survey);
  }
}
