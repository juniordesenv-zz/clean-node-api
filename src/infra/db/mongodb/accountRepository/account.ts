import { AddAccountRepository } from '../../../../data/protocols/db/addAccountRepository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/loadAccountByEmailRepository';
import { AddAccountModel } from '../../../../domain/usecases';
import { AccountModel } from '../../../../domain/models';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }
}
