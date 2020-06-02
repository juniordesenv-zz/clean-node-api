import { Controller } from '~/presentation/protocols';
import { LoadSurveysController } from '~/presentation/controllers/survey/loadSurveys/loadSurveysController';
import { makeDbLoadSurveys } from '~/main/factories/usescases/survey/loadSurveys/dbLoadSurveysFactory';
import { makeLogControlleDecorator } from '~/main/factories/decorators/logControllerDecoratorFactory';

export const makeLoadSuerveysController = (): Controller => makeLogControlleDecorator(
  new LoadSurveysController(
    makeDbLoadSurveys(),
  ),
);
