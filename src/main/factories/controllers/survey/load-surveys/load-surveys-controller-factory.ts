import { Controller } from '~/presentation/protocols';
import { makeLogControlleDecorator } from '~/main/factories/decorators/log-controller-decorator-factory';
import { makeDbLoadSurveys } from '~/main/factories/usescases/survey/load-surveys/db-load-surveys-factory';
import { LoadSurveysController } from '~/presentation/controllers/survey/load-surveys/load-surveys-controller';

export const makeLoadSuerveysController = (): Controller => makeLogControlleDecorator(
  new LoadSurveysController(
    makeDbLoadSurveys(),
  ),
);
