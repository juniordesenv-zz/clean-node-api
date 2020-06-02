import { SignUpController } from '~/presentation/controllers/authentication/signup/signupController';
import { Controller } from '~/presentation/protocols';
import { makeLogControlleDecorator } from '~/main/factories/decorators/logControllerDecoratorFactory';
import { makeDbAddAccount } from '~/main/factories/usescases/account/addAccount/dbAddAccountFactory';
import { makeSignUpValidation } from '~/main/factories/controllers/login/singup/signupValidationFactory';
import { makeDbAuthentication } from '~/main/factories/usescases/account/authentication/dbAuthenticationFactory';


export const makeSignUpController = (): Controller => makeLogControlleDecorator(
  new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  ),
);
