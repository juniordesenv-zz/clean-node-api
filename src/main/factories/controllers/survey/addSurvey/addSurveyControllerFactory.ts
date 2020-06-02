import { makeAddSurveyValidation } from './addSurveyValidationFactory';
import { makeLogControlleDecorator } from '~/main/factories/decorators/logControllerDecoratorFactory';
import { Controller } from '~/presentation/protocols';
import { AddSurveyController } from '~/presentation/controllers/survey/addSurvey/addSurveyController';
import { makeDbAddSurvey } from '~/main/factories/usescases/survey/addSurvey/dbAddSurvyFactory';

export const makeAddSuerveyController = (): Controller => makeLogControlleDecorator(
  new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  ),
);
