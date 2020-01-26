import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository';
import { AddAccountModel } from '../../../../domain/usecases';
import { AccountModel } from '../../../../domain/models';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    return MongoHelper.map(account);
  }
}
