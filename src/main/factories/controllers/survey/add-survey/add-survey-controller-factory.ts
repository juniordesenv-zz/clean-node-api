import { Controller } from '~/presentation/protocols';
import { makeLogControlleDecorator } from '~/main/factories/decorators/log-controller-decorator-factory';
import { AddSurveyController } from '~/presentation/controllers/survey/add-survey/add-survey-controller';
import { makeAddSurveyValidation } from '~/main/factories/controllers/survey/add-survey/add-survey-validation-factory';
import { makeDbAddSurvey } from '~/main/factories/usescases/survey/add-survey/db-add-survey-factory';

export const makeAddSuerveyController = (): Controller => makeLogControlleDecorator(
  new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  ),
);
