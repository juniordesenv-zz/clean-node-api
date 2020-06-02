import { SurveyMongoRepository } from '~/infra/db/mongodb/survey/surveyMongoRepository';
import { LoadSurveys } from '~/domain/usecases/loadSurveys';
import { DbLoadSurveys } from '~/data/usecases/loadSurveys/dbLoadSurveys';


export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
