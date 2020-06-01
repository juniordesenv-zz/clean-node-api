import { Controller } from '../../../../presentation/protocols';
import { makeLogControlleDecorator } from '../../decorators/logControllerDecoratorFactory';
import { makeAddSurveyValidation } from './addSurveyValidationFactory';
import { makeDbAddSurvey } from '../../usescases/survey/addSurvey/dbAddAccountFactory';
import { AddSurveyController } from '../../../../presentation/controllers/survey/addSurvey/addSurveyController';

export const makeAddSuerveyController = (): Controller => makeLogControlleDecorator(
  new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  ),
);
