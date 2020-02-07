import { SignUpController } from '../../../presentation/controllers/signup/signupController';
import { DbAddAccount } from '../../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/bcryptAdapter/bcryptAdapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/accountMongoRepository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/logMongoRepository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/logControllerDecorator';
import { makeSignUpValidation } from './signupValidationFactory';


export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const validationComposite = makeSignUpValidation();
  const signUpController = new SignUpController(
    dbAddAccount,
    validationComposite,
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
