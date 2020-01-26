import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';
import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account';
import { Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';


export const makeSignUpController = (): Controller => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(signUpController);
};
