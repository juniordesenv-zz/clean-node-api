import { SurveyModel } from '~/domain/models';
import { AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';
import { AddSurveyModel } from '~/domain/usecases/survey/add-survey';
import { MongoHelper } from '~/infra/db/mongodb/helpers/mongo-helper';

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
