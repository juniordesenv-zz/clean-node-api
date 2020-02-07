import { AddAccountRepository } from '../../../../data/protocols/db/account/addAccountRepository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/loadAccountByEmailRepository';
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/updateAccessTokenRepository';
import { AddAccountModel } from '../../../../domain/usecases';
import { AccountModel } from '../../../../domain/models';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements AddAccountRepository,
            LoadAccountByEmailRepository,
            UpdateAccessTokenRepository {
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({
      _id: id,
    }, {
      $set: {
        accessToken: token,
      },
    });
  }
}