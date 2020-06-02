import { DbAddSurvey } from '~/data/usecases/addSurvey/dbAddSurvey';
import { SurveyMongoRepository } from '~/infra/db/mongodb/survey/surveyMongoRepository';
import { AddSurvey } from '~/domain/usecases';


export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
