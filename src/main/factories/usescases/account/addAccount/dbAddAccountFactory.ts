import { DbAddAccount } from '../../../../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../../../../infra/criptography/bcryptAdapter/bcryptAdapter';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/accountMongoRepository';
import { AddAccount } from '../../../../../domain/usecases';


export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
