import { Controller } from '../../../../../presentation/protocols';
import { makeLoginValidation } from './loginValidationFactory';
import { LoginController } from '../../../../../presentation/controllers/authentication/login/loginController';
import { makeDbAuthentication } from '../../../usescases/account/authentication/dbAuthenticationFactory';
import { makeLogControlleDecorator } from '../../../decorators/logControllerDecoratorFactory';

export const makeLoginController = (): Controller => makeLogControlleDecorator(
  new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  ),
);
