import { Controller } from '~/presentation/protocols';
import { makeLogControlleDecorator } from '../../../decorators/logControllerDecoratorFactory';
import { LoadSurveysController } from '~/presentation/controllers/survey/loadSurveys/loadSurveysController';
import { makeDbLoadSurveys } from '~/main/factories/usescases/survey/loadSurveys/dbLoadSurveysFactory';

export const makeLoadSuerveysController = (): Controller => makeLogControlleDecorator(
  new LoadSurveysController(
    makeDbLoadSurveys(),
  ),
);
