import { Controller } from '../../../../presentation/protocols';
import { makeLoginValidation } from './loginValidationFactory';
import { LoginController } from '../../../../presentation/controllers/login/loginController';
import { makeDbAuthentication } from '../../usescases/authentication/dbAuthenticationFactory';
import { makeLogControlleDecorator } from '../../decorators/logControllerDecoratorFactory';

export const makeLoginController = (): Controller => makeLogControlleDecorator(
  new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  ),
);
