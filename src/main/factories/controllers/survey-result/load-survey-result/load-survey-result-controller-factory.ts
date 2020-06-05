import { Controller } from '~/presentation/protocols';
import { makeLogControlleDecorator } from '~/main/factories/decorators/log-controller-decorator-factory';
import { makeDbLoadSurveyById } from '~/main/factories/usescases/survey/load-survey-by-id/db-load-survey-by-id-factory';
import { LoadSurveyResultController } from '~/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller';
import { makeDbLoadSurveyResult } from '~/main/factories/usescases/survey-result/load-survey-result/db-load-survey-result-factory';

export const makeLoadSurveyResultController = (): Controller => makeLogControlleDecorator(
  new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  ),
);
