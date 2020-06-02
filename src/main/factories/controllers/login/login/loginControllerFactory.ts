import { Controller } from '~/presentation/protocols';
import { makeLoginValidation } from './loginValidationFactory';
import { LoginController } from '~/presentation/controllers/authentication/login/loginController';
import { makeDbAuthentication } from '~/main/factories/usescases/account/authentication/dbAuthenticationFactory';
import { makeLogControlleDecorator } from '~/main/factories/decorators/logControllerDecoratorFactory';

export const makeLoginController = (): Controller => makeLogControlleDecorator(
  new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  ),
);
