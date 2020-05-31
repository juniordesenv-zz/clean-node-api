import { DbAddAccount } from '../../../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../../../infra/criptography/bcryptAdapter/bcryptAdapter';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/accountMongoRepository';


export const makeDbAddAccount = (): DbAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository);
};
