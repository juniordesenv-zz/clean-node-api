import { SignUpController } from '~/presentation/controllers/authentication/signup/signupController';
import { Controller } from '~/presentation/protocols';
import { makeSignUpValidation } from './signupValidationFactory';
import { makeDbAuthentication } from '../../../usescases/account/authentication/dbAuthenticationFactory';
import { makeDbAddAccount } from '../../../usescases/account/addAccount/dbAddAccountFactory';
import { makeLogControlleDecorator } from '../../../decorators/logControllerDecoratorFactory';


export const makeSignUpController = (): Controller => makeLogControlleDecorator(
  new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  ),
);
